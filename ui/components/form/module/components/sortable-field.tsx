import { Spinner } from "@/components/ui/spinner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, X } from "lucide-react"
import { FieldRenderer } from "./field-renderer"
import { useAppDispatch, useAppSelector } from "@/provider/store"
import { useFieldDelete } from "@/hooks/use-field"
import { setFieldId } from "@/provider/store/slice/field-id-slice"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FormFieldType } from "@/types/form-types"
import { useSortable } from "@dnd-kit/react/sortable"

export function SortAbleField({
  field,
  idx,
}: {
  field: FormFieldType
  idx: number
}) {
  const dispatch = useAppDispatch()

  const { mutateAsync, isPending } = useFieldDelete()

  const { fieldId } = useAppSelector((state) => state?.fieldId)

  const { ref } = useSortable({
    id: field?.id,
    index: idx,
    group: "fields",
  })

  return (
    <div
      ref={ref}
      key={field?.id}
      onPointerDown={() => {
        dispatch(setFieldId(field?.id))
      }}
      className={cn(
        "smooth relative cursor-pointer rounded-lg border bg-primary/10 p-6",
        fieldId == field?.id && "border-stone-500"
      )}
    >
      <FieldRenderer field={field} />
      {fieldId == field?.id ? (
        <div className="absolute top-1 right-1 flex gap-1">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isPending} variant="destructive" size="icon-xs">
                {isPending ? <Spinner /> : <Trash2 />}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Field: Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Deleting this field will also remove any data associated with
                  it. If you want to keep this data, please export it first
                  before proceeding.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isPending}
                  variant="destructive"
                  onClick={() =>
                    mutateAsync({
                      fieldId: field?.id,
                    })
                  }
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              dispatch(setFieldId(null))
            }}
            size="icon-xs"
            variant="outline"
          >
            <X />
          </Button>
        </div>
      ) : null}
    </div>
  )
}
