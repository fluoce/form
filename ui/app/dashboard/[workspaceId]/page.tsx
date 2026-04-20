"use client"

import { PageSpinner } from "@/components/shared/loader"
import { PageHeader } from "@/components/shared/page-header"
import { Wrapper } from "@/components/shared/wrapper"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { useWorkspaces } from "@/hooks/use-workspace"
import { EllipsisVertical, Palette, Pencil, Plus } from "lucide-react"
import Link from "next/link"
import { routes } from "@/const/routes"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useForms, useFormUpdate } from "@/hooks/use-form"
import { formThemes } from "@/const"
import { CreateUpdateForm } from "@/components/form/create-update-form"

const Dashboard = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>()

  const { data, isLoading } = useWorkspaces()

  const { data: formData, isLoading: formIsLoading } = useForms()

  const { mutateAsync, isPending } = useFormUpdate()

  const selectedWorkspace = data?.data?.workspaces.find(
    (w) => w.id == workspaceId
  )

  if (isLoading || formIsLoading) {
    return <PageSpinner />
  }

  return (
    <Wrapper>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <PageHeader
            title={`${selectedWorkspace?.name}'s Forms`}
            description={` All forms for the workspace "${selectedWorkspace?.name}".`}
          >
            <CreateUpdateForm>
              <Button variant="secondary">
                <Plus /> Form
              </Button>
            </CreateUpdateForm>
          </PageHeader>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {formData?.data?.forms?.map((f) => (
              <Link
                href={routes.form.byId({
                  workspaceId: f?.workspaceId,
                  formId: f?.id,
                })}
                key={f?.id}
                className={cn(
                  f?.theme,
                  "flex cursor-pointer flex-col gap-2 rounded-xl border p-4",
                  "bg-primary text-primary-foreground hover:opacity-80"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="line-clamp-1"> {f?.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        size="icon-sm"
                        variant="ghost"
                        tabIndex={-1}
                        type="button"
                        aria-label="Workspace options"
                      >
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-60"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      <DropdownMenuGroup className="flex flex-col gap-1">
                        <DropdownMenuLabel className="truncate">
                          {f?.name}
                        </DropdownMenuLabel>
                        <CreateUpdateForm form={f}>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault()
                            }}
                          >
                            <Pencil /> Rename
                          </DropdownMenuItem>
                        </CreateUpdateForm>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Palette /> Theme
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            {formThemes?.map((t) => (
                              <DropdownMenuItem
                                key={t}
                                onSelect={() => {
                                  mutateAsync({
                                    body: {
                                      theme: t,
                                    },
                                    id: f?.id,
                                  })
                                }}
                              >
                                <span
                                  className={cn(
                                    "h-4 w-4 rounded-xl border bg-primary",
                                    t
                                  )}
                                ></span>
                                {t}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Dashboard
