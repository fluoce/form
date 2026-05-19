import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useUpdateField } from "@/hooks/use-update-field"
import { useAppDispatch } from "@/provider/store"
import { updatePageField } from "@/provider/store/slice/page-fields-slice"
import { FormFieldType } from "@/types/form-types"
import { toast } from "sonner"
import { COUNTRY } from "../data/country"
import { Kbd } from "@/components/ui/kbd"

export function FieldValidationsEditBar({ field }: { field: FormFieldType }) {
  const { updateField } = useUpdateField()
  const dispatch = useAppDispatch()
  const type = field?.config?.type
  // @ts-ignore
  const validation = field?.config?.validation

  switch (type) {
    case "text":
      return (
        <>
          <Field>
            <FieldLabel htmlFor="validation-min-length">Min Length</FieldLabel>
            <Input
              id="validation-min-length"
              type="number"
              placeholder="Min length"
              value={validation?.minLength ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          minLength: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      minLength: Number(e?.target?.value),
                    },
                  },
                })
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-max-length">
              Max Length <span className="text-muted-foreground">1 - 100</span>
            </FieldLabel>
            <Input
              id="validation-max-length"
              type="number"
              placeholder="Max length"
              value={validation?.maxLength ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          maxLength: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                if (Number(e?.target?.value) > 100) {
                  toast.info(
                    "Text input can only have a maximum length of 100 characters."
                  )
                }
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      maxLength:
                        Number(e?.target?.value) <= 0
                          ? 100
                          : Math.min(Number(e?.target?.value), 100),
                    },
                  },
                })
              }}
            />
          </Field>
        </>
      )
    case "textarea":
      return (
        <>
          <Field>
            <FieldLabel htmlFor="validation-min-length">Min Length</FieldLabel>
            <Input
              id="validation-min-length"
              type="number"
              placeholder="Min length"
              value={validation?.minLength ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          minLength: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      minLength: Number(e?.target?.value),
                    },
                  },
                })
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-max-length">
              Max Length <span className="text-muted-foreground">1 - 1000</span>
            </FieldLabel>
            <Input
              id="validation-max-length"
              type="number"
              placeholder="Max length"
              value={validation?.maxLength ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          maxLength: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                if (Number(e?.target?.value) > 1000) {
                  toast.info(
                    "Text area input can only have a maximum length of 1000 characters."
                  )
                }
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      maxLength:
                        Number(e?.target?.value) <= 0
                          ? 1000
                          : Math.min(Number(e?.target?.value), 1000),
                    },
                  },
                })
              }}
            />
          </Field>
        </>
      )
    case "number":
      return (
        <>
          <Field>
            <FieldLabel htmlFor="validation-min">Min</FieldLabel>
            <Input
              id="validation-min"
              type="number"
              placeholder="Min"
              value={validation?.min ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          min: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      min: Number(e?.target?.value),
                    },
                  },
                })
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-max">Max</FieldLabel>
            <Input
              id="validation-max"
              type="number"
              placeholder="Max"
              value={validation?.max ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          max: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      max: Number(e?.target?.value),
                    },
                  },
                })
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-step">Step</FieldLabel>
            <Input
              id="validation-step"
              type="number"
              placeholder="Step"
              value={validation?.step ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          step: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      step: Number(e?.target?.value),
                    },
                  },
                })
              }}
            />
          </Field>
        </>
      )
    case "phone":
      return (
        <>
          <Field>
            <FieldLabel htmlFor="validation-default-country-code">
              Default Country Code
            </FieldLabel>
            <Select
              defaultValue={validation?.defaultCountryCode ?? ""}
              onValueChange={(value) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          defaultCountryCode: value,
                        },
                      },
                    },
                  })
                )
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      defaultCountryCode: value,
                    },
                  },
                })
              }}
            >
              <SelectTrigger className="bg-background!">
                <SelectValue placeholder="select default country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY?.map((c) => (
                  <SelectItem
                    className="rounded-none border-b p-2"
                    key={c?.value}
                    value={c?.value}
                  >
                    {c?.label} <Kbd>{c?.value}</Kbd>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Allow Country Change</FieldLabel>
            <Switch
              className="ml-1"
              checked={!!validation?.allowCountryChange}
              onCheckedChange={(checked) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      allowCountryChange: checked,
                    },
                  },
                })
              }}
            />
          </Field>
        </>
      )
    case "url":
      return (
        <>
          <Field>
            <FieldLabel htmlFor="validation-allowed-protocols">
              Allowed Protocols
            </FieldLabel>
            <Input
              id="validation-allowed-protocols"
              type="text"
              placeholder="e.g. https, http"
              value={
                Array.isArray(validation?.protocols)
                  ? validation.protocols.join(", ")
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          protocols: [e?.target?.value],
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      protocols: e?.target?.value
                        .split(",")
                        .map((p: string) => p.trim())
                        .filter((p: string) => p.length > 0),
                    },
                  },
                })
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-allowed-domains">
              Allowed Domains
            </FieldLabel>
            <Input
              id="validation-allowed-domains"
              type="text"
              placeholder="e.g. example.com, new.com"
              value={
                Array.isArray(validation?.allowedDomains)
                  ? validation.allowedDomains.join(", ")
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          allowedDomains: [e?.target?.value],
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      allowedDomains: e?.target?.value
                        .split(",")
                        .map((d: string) => d.trim())
                        .filter((d: string) => d.length > 0),
                    },
                  },
                })
              }}
            />
          </Field>
        </>
      )
    case "date":
      return (
        <>
          <Field>
            <FieldLabel htmlFor="validation-min-date">Date Range</FieldLabel>
            <Input
              id="validation-min-date"
              type="date"
              placeholder="Min Date"
              value={validation?.minDate ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          minDate: e?.target?.value,
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                if (!e?.target?.value) return
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      minDate: e?.target?.value,
                    },
                  },
                })
              }}
            />
            <Input
              id="validation-max-date"
              type="date"
              placeholder="Max Date"
              value={validation?.maxDate ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          maxDate: e?.target?.value,
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                if (!e?.target?.value) return
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      maxDate: e?.target?.value,
                    },
                  },
                })
              }}
            />
          </Field>
        </>
      )
    case "dropdown":
      return (
        <>
          {/* <Field>
            <FieldLabel>Multiple</FieldLabel>
            <Switch
              className="ml-1"
              checked={!!validation?.multiple}
              onCheckedChange={(checked) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      multiple: checked,
                    },
                  },
                })
              }}
            />
          </Field> */}
          <Field>
            <FieldLabel htmlFor="validation-min-selected">
              Min Selected
            </FieldLabel>
            <Input
              id="validation-min-selected"
              type="number"
              placeholder="Min Selected"
              value={validation?.minSelected ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          minSelected: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      minSelected: Number(e?.target?.value) || 1,
                    },
                  },
                })
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-max-selected">
              Max Selected
            </FieldLabel>
            <Input
              id="validation-max-selected"
              type="number"
              placeholder="Max Selected"
              value={validation?.maxSelected ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          maxSelected: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                if (
                  Number(e?.target?.value) <
                  (field?.config as any)?.validation?.minSelected
                ) {
                  toast.info(
                    "Max Selected must be greater or equal to Min Selected"
                  )
                }
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      maxSelected:
                        Number(e?.target?.value) <
                        (field?.config as any)?.validation?.minSelected
                          ? (field?.config as any)?.validation?.minSelected
                          : Number(e?.target?.value),
                    },
                  },
                })
              }}
            />
          </Field>
          <Field>
            <FieldLabel>Searchable</FieldLabel>
            <Switch
              className="ml-1"
              checked={!!validation?.searchable}
              onCheckedChange={(checked) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      searchable: checked,
                    },
                  },
                })
              }}
            />
          </Field>
        </>
      )
    case "checkbox":
      return (
        <>
          <Field>
            <FieldLabel htmlFor="validation-min-selected">
              Min Selected
            </FieldLabel>
            <Input
              id="validation-min-selected"
              type="number"
              placeholder="Min Selected"
              value={validation?.minSelected ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          minSelected: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      minSelected: Number(e?.target?.value) || 1,
                    },
                  },
                })
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-max-selected">
              Max Selected
            </FieldLabel>
            <Input
              id="validation-max-selected"
              type="number"
              placeholder="Max Selected"
              value={validation?.maxSelected ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePageField({
                    fieldId: field?.id,
                    data: {
                      config: {
                        ...field.config,
                        //@ts-ignore
                        validation: {
                          ...validation,
                          maxSelected: Number(e?.target?.value),
                        },
                      },
                    },
                  })
                )
              }}
              onBlur={(e) => {
                if (
                  Number(e?.target?.value) <
                  (field?.config as any)?.validation?.minSelected
                ) {
                  toast.info(
                    "Max Selected must be greater or equal to Min Selected"
                  )
                }
                updateField(field?.id, {
                  config: {
                    ...field.config,
                    //@ts-ignore
                    validation: {
                      ...validation,
                      maxSelected:
                        Number(e?.target?.value) <
                        (field?.config as any)?.validation?.minSelected
                          ? (field?.config as any)?.validation?.minSelected
                          : Number(e?.target?.value),
                    },
                  },
                })
              }}
            />
          </Field>
        </>
      )
    default:
      return (
        <span className="text-xs text-muted-foreground">
          No extra validations available for this field type.
        </span>
      )
  }
}
