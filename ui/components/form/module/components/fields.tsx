import { useFieldCreate } from "@/hooks/use-field"
import { FIELD_DATA } from "../data/field"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"

export function Fields() {
  const { mutateAsync } = useFieldCreate()

  const [isPending, setIsPending] = useState("")

  return FIELD_DATA?.map((f) => (
    <div
      onClick={() => {
        setIsPending(f?.name)
        mutateAsync({
          body: {
            config: (() => {
              switch (f?.type) {
                case "text":
                  return {
                    type: "text",
                    label: f?.name,
                  }
                case "textarea":
                  return {
                    type: "textarea",
                    label: f?.name,
                  }
                case "number":
                  return {
                    type: "number",
                    label: f?.name,
                  }
                case "email":
                  return {
                    type: "email",
                    label: f?.name,
                  }
                case "phone":
                  return {
                    type: "phone",
                    label: f?.name,
                    validation: {
                      allowCountryChange: true,
                    },
                  }
                case "url":
                  return {
                    type: "url",
                    label: f?.name,
                  }
                case "date":
                  return {
                    type: "date",
                    label: f?.name,
                  }
                case "dropdown":
                  return {
                    type: "dropdown",
                    label: f?.name,
                    options: [
                      {
                        label: "Option 1",
                        value: "option-1",
                      },
                    ],
                  }
                case "radio":
                  return {
                    type: "radio",
                    label: f?.name,
                    options: [
                      {
                        label: "option 1",
                        value: "option-1",
                      },
                    ],
                  }
                case "checkbox":
                  return {
                    type: "checkbox",
                    label: f?.name,
                    options: [
                      {
                        label: "option 1",
                        value: "option-1",
                      },
                    ],
                  }
                default:
                  return {
                    type: "text",
                    label: f?.name,
                  }
              }
            })(),
          },
        }).finally(() => setIsPending(""))
      }}
      key={f?.name}
      className="flex cursor-pointer items-center justify-between gap-2 rounded-lg p-2 hover:bg-accent"
    >
      <div className="flex items-center gap-2">
        <span
          className="rounded-md p-1.5"
          style={{
            backgroundColor: `${f?.color}25`,
          }}
        >
          {f?.icon}
        </span>
        <span className="text-sm">{f?.name}</span>
      </div>
      {isPending == f?.name && <Spinner />}
    </div>
  ))
}
