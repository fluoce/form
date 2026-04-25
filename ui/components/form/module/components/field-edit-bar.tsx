"use client"

import { PrimarySpinner } from "@/components/shared/loader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useField } from "@/hooks/use-field"
import { useForm } from "@/hooks/use-form"
import { useAppSelector } from "@/provider/store"
import { BadgeInfo, Cog, GripVertical, Plus } from "lucide-react"

export function FieldEditBar() {
  const { fieldId } = useAppSelector((state) => state.fieldId)

  const { data: formData, isPending: formIsPending } = useForm()

  const { data, isPending } = useField({ fieldId: fieldId! })

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
                  <FieldLabel htmlFor="field-label">Form Title</FieldLabel>
                  <Input
                    value={formData?.data?.form?.title}
                    type="text"
                    placeholder="Title . . ."
                    onChange={() => {}}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="field-helptext">
                    Form Description
                  </FieldLabel>
                  <Textarea
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
      ) : fieldId ? (
        isPending ? (
          <div className="flex h-full w-full items-center justify-center">
            <PrimarySpinner />
          </div>
        ) : data?.data?.formField ? (
          <div className="custom-scroll h-full overflow-y-auto">
            <div className="flex flex-col gap-8 px-2">
              <FieldSet>
                <FieldGroup>
                  <span className="flex items-center gap-2 pt-2 text-sm font-medium text-muted-foreground">
                    <BadgeInfo size={18} /> Field basic
                  </span>
                  <Field className="w-fit">
                    <FieldLabel htmlFor="field-type">Type</FieldLabel>
                    <Badge variant="secondary">
                      {data?.data?.formField?.config?.type}
                    </Badge>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="field-label">
                      Label or Quation
                    </FieldLabel>
                    <Input
                      type="text"
                      placeholder="Label . . ."
                      value={data?.data?.formField?.config?.label ?? ""}
                      onChange={() => {}}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="field-helptext">Help text</FieldLabel>
                    <Textarea
                      placeholder="Help text . . ."
                      value={data?.data?.formField?.config?.helpText ?? ""}
                      onChange={(e) => {}}
                      className="scrollbar-hide max-h-24"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="field-placeholder">
                      Placeholder
                    </FieldLabel>
                    <Input
                      type="text"
                      placeholder="Placeholder . . ."
                      value={data?.data?.formField?.config?.placeholder ?? ""}
                      onChange={(e) => {}}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="field-required">Required</FieldLabel>
                    <Switch
                      className="ml-1"
                      defaultChecked={!!data?.data?.formField?.config?.required}
                    />
                  </Field>
                  {["checkbox", "radio", "dropdown"].includes(
                    data?.data?.formField?.config?.type ?? ""
                  ) && (
                    <Field>
                      <FieldLabel htmlFor="field-options">Options</FieldLabel>
                      {/* @ts-ignore */}
                      {data?.data?.formField?.config?.options?.map((o) => (
                        <div key={o?.value} className="flex items-center gap-1">
                          <GripVertical className="cursor-grab" size={20} />
                          <Input
                            type="text"
                            value={o?.label}
                            onChange={(e) => {}}
                          />
                        </div>
                      ))}
                      <AddOption />
                    </Field>
                  )}
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                <FieldGroup>
                  <span className="flex items-center gap-2 pt-2 text-sm font-medium text-muted-foreground">
                    <Cog size={18} /> Field validations
                  </span>
                  {(() => {
                    const type = data?.data?.formField?.config?.type
                    //@ts-ignore
                    const validation = data?.data?.formField?.config?.validation
                    switch (type) {
                      case "text":
                        return (
                          <>
                            <Field>
                              <FieldLabel>Min Length</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Min length"
                                value={validation?.minLength ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Max Length</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Max length"
                                value={validation?.maxLength ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                          </>
                        )
                      case "textarea":
                        return (
                          <>
                            <Field>
                              <FieldLabel>Min Length</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Min length"
                                value={validation?.minLength ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Max Length</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Max length"
                                value={validation?.maxLength ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                          </>
                        )
                      case "number":
                        return (
                          <>
                            <Field>
                              <FieldLabel>Min</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Min"
                                value={validation?.min ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Max</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Max"
                                value={validation?.max ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Step</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Step"
                                value={validation?.step ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                          </>
                        )
                      case "phone":
                        return (
                          <>
                            <Field>
                              <FieldLabel>Default Country Code</FieldLabel>
                              <Input
                                type="text"
                                placeholder="us / in"
                                value={validation?.defaultCountryCode ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Allow Country Change</FieldLabel>
                              <Switch
                                className="ml-1"
                                defaultChecked={
                                  !!validation?.allowCountryChange
                                }
                              />
                            </Field>
                          </>
                        )
                      case "url":
                        return (
                          <>
                            <Field>
                              <FieldLabel>Allowed Protocols</FieldLabel>
                              <Input
                                type="text"
                                placeholder="e.g. https, http"
                                value={
                                  Array.isArray(validation?.protocols)
                                    ? validation.protocols.join(", ")
                                    : ""
                                }
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Allowed Domains</FieldLabel>
                              <Input
                                type="text"
                                placeholder="e.g. example.com"
                                value={
                                  Array.isArray(validation?.allowedDomains)
                                    ? validation.allowedDomains.join(", ")
                                    : ""
                                }
                                onChange={() => {}}
                              />
                            </Field>
                          </>
                        )
                      case "date":
                        return (
                          <>
                            <Field>
                              <FieldLabel>Min Date</FieldLabel>
                              <Input
                                type="date"
                                placeholder="Min Date"
                                value={validation?.minDate ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Max Date</FieldLabel>
                              <Input
                                type="date"
                                placeholder="Max Date"
                                value={validation?.maxDate ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                          </>
                        )
                      case "dropdown":
                        return (
                          <>
                            <Field>
                              <FieldLabel>Multiple</FieldLabel>
                              <Switch
                                className="ml-1"
                                defaultChecked={validation?.multiple}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Min Selected</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Min Selected"
                                value={validation?.minSelected ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Max Selected</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Max Selected"
                                value={validation?.maxSelected ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Searchable</FieldLabel>
                              <Switch
                                className="ml-1"
                                defaultChecked={validation?.searchable}
                              />
                            </Field>
                          </>
                        )
                      case "checkbox":
                        return (
                          <>
                            <Field>
                              <FieldLabel>Min Selected</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Min Selected"
                                value={validation?.minSelected ?? ""}
                                onChange={() => {}}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Max Selected</FieldLabel>
                              <Input
                                type="number"
                                placeholder="Max Selected"
                                value={validation?.maxSelected ?? ""}
                                onChange={() => {}}
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
                  })()}
                </FieldGroup>
              </FieldSet>
            </div>
          </div>
        ) : null
      ) : (
        <span className="flex items-center gap-2 p-1 text-sm font-medium text-muted-foreground">
          <BadgeInfo size={18} className="text-blue-500" /> select field to
          edit.
        </span>
      )}
    </div>
  )
}

function AddOption() {
  return (
    <div className="flex items-center gap-2">
      <Input type="text" placeholder="Add more . . ." onChange={(e) => {}} />
      <Button disabled variant="secondary" size="icon-sm">
        <Plus />
      </Button>
    </div>
  )
}
