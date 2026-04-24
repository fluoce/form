import { useFieldCreate } from "@/hooks/use-field"
import { FIELD_DATA } from "../data/field"

export function Fields() {
  const { mutateAsync } = useFieldCreate()

  return FIELD_DATA?.map((f) => (
    <div
      onClick={() =>
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
        })
      }
      key={f?.name}
      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-accent"
    >
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
  ))
}
