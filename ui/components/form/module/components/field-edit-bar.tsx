"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@/hooks/use-form"
import { useAppDispatch, useAppSelector } from "@/provider/store"
import { updatePageField } from "@/provider/store/slice/page-fields-slice"
import { BadgeInfo, Cog, Pencil, Trash2 } from "lucide-react"
import { AddOption } from "./add-option"
import { Option } from "@/types/formfield-config-types"
import { normalizeString } from "@/utils/normalize-string"
import { useUpdateField } from "@/hooks/use-update-field"
import { UpdateFormTitleDescription } from "./update-form-title-description"
import { FieldValidationsEditBar } from "./field-validations-edit-bar"

export function FieldEditBar() {
  const { updateField } = useUpdateField()

  const dispatch = useAppDispatch()

  const { fieldId } = useAppSelector((state) => state.fieldId)

  const { data: formData } = useForm()

  const fields = useAppSelector((state) => state.pageFields.fields)

  const field = fields?.find((f) => f?.id == fieldId)

  return (
    <div className="h-full w-80 shrink-0 rounded-lg bg-muted p-2 [&_input]:bg-background dark:[&_input]:bg-background [&_textarea]:bg-background dark:[&_textarea]:bg-background">
      {fieldId == "base" ? (
        <div className="custom-scroll h-full overflow-y-auto">
          <div className="flex flex-col gap-8 px-2">
            <FieldSet>
              <FieldGroup>
                <span className="flex items-center gap-2 pt-2 text-sm font-medium text-muted-foreground">
                  <BadgeInfo size={18} /> Form Heading & Description
                </span>
                <Field className="w-fit">
                  <FieldLabel htmlFor="field-type">Type</FieldLabel>
                  <Badge variant="secondary">base</Badge>
                </Field>
                <Field>
                  <div className="flex w-full items-center justify-between gap-2">
                    <FieldLabel htmlFor="form-title">Form Title</FieldLabel>
                    <UpdateFormTitleDescription form={formData?.data?.form!}>
                      <Button variant="secondary" size="icon-sm">
                        <Pencil />
                      </Button>
                    </UpdateFormTitleDescription>
                  </div>
                  <Input
                    disabled
                    id="form-title"
                    value={formData?.data?.form?.title}
                    type="text"
                    placeholder="Title . . ."
                    onChange={(e) => {}}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="form-description">
                    Form Description
                  </FieldLabel>
                  <Textarea
                    disabled
                    id="form-description"
                    value={formData?.data?.form?.description}
                    placeholder="Description . . ."
                    onChange={(e) => {}}
                    className="scrollbar-hide max-h-24"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </div>
      ) : field ? (
        field ? (
          <div className="custom-scroll h-full overflow-y-auto">
            <div className="flex flex-col gap-8 px-2">
              <FieldSet>
                <FieldGroup>
                  <span className="flex items-center gap-2 pt-2 text-sm font-medium text-muted-foreground">
                    <BadgeInfo size={18} /> Field basic
                  </span>
                  <Field className="w-fit">
                    <FieldLabel htmlFor="field-type">Type</FieldLabel>
                    <Badge variant="secondary">{field?.config?.type}</Badge>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="field-label">
                      Label or Quation
                    </FieldLabel>
                    <Input
                      id="field-label"
                      type="text"
                      placeholder="Label . . ."
                      value={field?.config?.label ?? ""}
                      onChange={(e) => {
                        dispatch(
                          updatePageField({
                            fieldId: field?.id,
                            data: {
                              config: {
                                ...field?.config,
                                label: e?.target?.value,
                              },
                            },
                          })
                        )
                      }}
                      onBlur={(e) => {
                        updateField(field?.id, {
                          config: {
                            ...field?.config,
                            label: (e.target as HTMLInputElement).value,
                          },
                        })
                      }}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="field-helptext">Help text</FieldLabel>
                    <Textarea
                      id="field-helptext"
                      placeholder="Help text . . ."
                      value={field?.config?.helpText ?? ""}
                      onChange={(e) => {
                        dispatch(
                          updatePageField({
                            fieldId: field?.id,
                            data: {
                              config: {
                                ...field?.config,
                                helpText: e?.target?.value,
                              },
                            },
                          })
                        )
                      }}
                      className="scrollbar-hide max-h-24"
                      onBlur={(e) => {
                        updateField(field?.id, {
                          config: {
                            ...field?.config,
                            helpText: (e.target as HTMLTextAreaElement).value,
                          },
                        })
                      }}
                    />
                  </Field>
                  {!(
                    field?.config?.type == "radio" ||
                    field?.config?.type == "checkbox"
                  ) && (
                    <Field>
                      <FieldLabel htmlFor="field-placeholder">
                        Placeholder
                      </FieldLabel>
                      <Input
                        id="field-placeholder"
                        type="text"
                        placeholder="Placeholder . . ."
                        value={field?.config?.placeholder ?? ""}
                        onChange={(e) => {
                          dispatch(
                            updatePageField({
                              fieldId: field?.id,
                              data: {
                                config: {
                                  ...field?.config,
                                  placeholder: e?.target?.value,
                                },
                              },
                            })
                          )
                        }}
                        onBlur={(e) => {
                          updateField(field?.id, {
                            config: {
                              ...field?.config,
                              placeholder: (e.target as HTMLInputElement).value,
                            },
                          })
                        }}
                      />
                    </Field>
                  )}
                  <Field>
                    <FieldLabel htmlFor="field-required">Required</FieldLabel>
                    <Switch
                      className="ml-1"
                      checked={!!field?.config?.required}
                      onCheckedChange={(checked) => {
                        updateField(field?.id, {
                          config: {
                            ...field?.config,
                            required: checked,
                          },
                        })
                      }}
                    />
                  </Field>
                  {["checkbox", "radio", "dropdown"].includes(
                    field?.config?.type ?? ""
                  ) && (
                    <Field>
                      <FieldLabel htmlFor="field-options">Options</FieldLabel>
                      {/* @ts-ignore */}
                      {field?.config?.options?.map((o, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <Input
                            id={`field-option-${idx}`}
                            type="text"
                            value={o?.label ?? `Option ${idx}`}
                            placeholder="Enter option . . ."
                            onChange={(e) => {
                              dispatch(
                                updatePageField({
                                  fieldId: field?.id,
                                  data: {
                                    config: {
                                      ...field?.config,
                                      //@ts-ignore
                                      options: field?.config?.options?.map(
                                        (opt: Option, optIdx: number) => {
                                          if (optIdx == idx) {
                                            return {
                                              label:
                                                e?.target?.value ??
                                                `Option ${idx}`,
                                              value: normalizeString(
                                                e?.target?.value,
                                                idx
                                              ),
                                            }
                                          }
                                          return opt
                                        }
                                      ),
                                    },
                                  },
                                })
                              )
                            }}
                            onBlur={(e) => {
                              updateField(field?.id, {
                                config: {
                                  ...field?.config,
                                  //@ts-ignore
                                  options: field?.config?.options?.map(
                                    (opt: Option, optIdx: number) => {
                                      if (optIdx == idx) {
                                        return {
                                          label:
                                            (e?.target as HTMLInputElement)
                                              ?.value || `Option ${idx}`,
                                          value: normalizeString(
                                            (e?.target as HTMLInputElement)
                                              ?.value,
                                            idx
                                          ),
                                        }
                                      }
                                      return opt
                                    }
                                  ),
                                },
                              })
                            }}
                          />
                          <Button
                            onClick={() =>
                              updateField(field?.id, {
                                config: {
                                  ...field?.config,
                                  //@ts-ignore
                                  options: field?.config?.options?.filter(
                                    (o: Option, optIdx: number) =>
                                      optIdx !== idx
                                  ),
                                },
                              })
                            }
                            variant="destructive"
                            size="icon-sm"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      ))}
                      <AddOption field={field} />
                    </Field>
                  )}
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                <FieldGroup>
                  <span className="flex items-center gap-2 pt-2 text-sm font-medium text-muted-foreground">
                    <Cog size={18} /> Field validations
                  </span>
                  <FieldValidationsEditBar field={field} />
                </FieldGroup>
              </FieldSet>
            </div>
          </div>
        ) : null
      ) : (
        <span className="flex items-center gap-2 p-1 text-sm font-medium text-muted-foreground">
          <BadgeInfo size={18} className="shrink-0 text-blue-500" /> Select
          field to edit.
        </span>
      )}
    </div>
  )
}
