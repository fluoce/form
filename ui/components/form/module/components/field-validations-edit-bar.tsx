import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { FormFieldType } from "@/types/form-types"

export function FieldValidationsEditBar({ field }: { field: FormFieldType }) {
  const type = field?.config?.type
  //@ts-ignore
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
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-max-length">Max Length</FieldLabel>
            <Input
              id="validation-max-length"
              type="number"
              placeholder="Max length"
              value={validation?.maxLength ?? ""}
              onChange={() => {}}
              onBlur={() => {}}
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
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-max-length">Max Length</FieldLabel>
            <Input
              id="validation-max-length"
              type="number"
              placeholder="Max length"
              value={validation?.maxLength ?? ""}
              onChange={() => {}}
              onBlur={() => {}}
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
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-max">Max</FieldLabel>
            <Input
              id="validation-max"
              type="number"
              placeholder="Max"
              value={validation?.max ?? ""}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-step">Step</FieldLabel>
            <Input
              id="validation-step"
              type="number"
              placeholder="Step"
              value={validation?.step ?? ""}
              onChange={() => {}}
              onBlur={() => {}}
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
            <Input
              id="validation-default-country-code"
              type="text"
              placeholder="us / in"
              value={validation?.defaultCountryCode ?? ""}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
          <Field>
            <FieldLabel>Allow Country Change</FieldLabel>
            <Switch
              className="ml-1"
              defaultChecked={!!validation?.allowCountryChange}
              onChange={() => {}}
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
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-allowed-domains">
              Allowed Domains
            </FieldLabel>
            <Input
              id="validation-allowed-domains"
              type="text"
              placeholder="e.g. example.com"
              value={
                Array.isArray(validation?.allowedDomains)
                  ? validation.allowedDomains.join(", ")
                  : ""
              }
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
        </>
      )
    case "date":
      return (
        <>
          <Field>
            <FieldLabel htmlFor="validation-min-date">Min Date</FieldLabel>
            <Input
              id="validation-min-date"
              type="date"
              placeholder="Min Date"
              value={validation?.minDate ?? ""}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-max-date">Max Date</FieldLabel>
            <Input
              id="validation-max-date"
              type="date"
              placeholder="Max Date"
              value={validation?.maxDate ?? ""}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
        </>
      )
    case "dropdown":
      return (
        <>
          <Field>
            <FieldLabel>Multiple</FieldLabel>
            <Switch className="ml-1" defaultChecked={validation?.multiple} />
          </Field>
          <Field>
            <FieldLabel htmlFor="validation-min-selected">
              Min Selected
            </FieldLabel>
            <Input
              id="validation-min-selected"
              type="number"
              placeholder="Min Selected"
              value={validation?.minSelected ?? ""}
              onChange={() => {}}
              onBlur={() => {}}
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
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Field>
          <Field>
            <FieldLabel>Searchable</FieldLabel>
            <Switch
              className="ml-1"
              defaultChecked={validation?.searchable}
              onChange={() => {}}
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
              onChange={() => {}}
              onBlur={() => {}}
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
              onChange={() => {}}
              onBlur={() => {}}
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
