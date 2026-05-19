"use client"

import { useEffect, useState } from "react"
import { Asterisk, CalendarDays } from "lucide-react"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormFieldType } from "@/types/form-types"
import { Option } from "@/types/formfield-config-types"
import { Controller } from "react-hook-form"
import type {
  FieldValues,
  UseFormRegister,
  Control,
  UseFormSetValue,
} from "react-hook-form"
import { COUNTRY } from "@/components/form/module/data/country"
import { Kbd } from "@/components/ui/kbd"
import { format } from "date-fns"

export function Fields({
  field,
  register,
  control,
  name,
  id,
  setValue,
}: {
  field: FormFieldType
  register: UseFormRegister<FieldValues>
  control: Control<FieldValues>
  name: string
  id: string
  setValue: UseFormSetValue<FieldValues>
}) {
  const config = field?.config || {}

  const requiredMessage = (name: string) => {
    return `${name} is required`
  }

  switch (config?.type) {
    case "text":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <Input
            id={config?.label}
            className="bg-background dark:bg-background"
            type="text"
            placeholder={config?.placeholder || undefined}
            {...register(id, {
              required: {
                message: requiredMessage(name),
                value: Boolean(config?.required),
              },
              minLength: {
                value: Number(config?.validation?.minLength),
                message: `${name} must be at least ${config?.validation?.minLength} characters long`,
              },
              maxLength: {
                value: Number(config?.validation?.maxLength ?? 100),
                message: `${name} must be at most ${config?.validation?.maxLength ?? 100} characters long`,
              },
            })}
          />
        </Field>
      )
    case "textarea":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <Textarea
            id={config?.label}
            className="max-h-60 bg-background dark:bg-background"
            placeholder={config?.placeholder || undefined}
            {...register(id, {
              required: {
                message: requiredMessage(name),
                value: Boolean(config?.required),
              },
              minLength: {
                value: Number(config?.validation?.minLength),
                message: `${name} must be at least ${config?.validation?.minLength} characters long`,
              },
              maxLength: {
                value: Number(config?.validation?.maxLength ?? 1000),
                message: `${name} must be at most ${config?.validation?.maxLength ?? 1000} characters long`,
              },
            })}
          />
        </Field>
      )
    case "email":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <Input
            id={config?.label}
            className="bg-background dark:bg-background"
            placeholder={config?.placeholder || undefined}
            {...register(id, {
              required: {
                value: Boolean(config?.required),
                message: requiredMessage(name),
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: `${name} must be email`,
              },
            })}
          />
        </Field>
      )
    case "number":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <Input
            id={config?.label}
            className="bg-background dark:bg-background"
            placeholder={config?.placeholder || undefined}
            type="number"
            {...register(id, {
              required: {
                value: Boolean(config?.required),
                message: requiredMessage(name),
              },
              valueAsNumber: true,
              min: config?.validation?.min
                ? {
                    value: Number(config?.validation?.min),
                    message: `${name} must be at least ${config?.validation?.min}`,
                  }
                : undefined,
              max: config?.validation?.max
                ? {
                    value: Number(config?.validation?.max),
                    message: `${name} must be at most ${config?.validation?.max}`,
                  }
                : undefined,
            })}
          />
        </Field>
      )
    case "phone":
      const [country, setCountry] = useState(
        config?.validation?.defaultCountryCode || COUNTRY?.at(0)?.value
      )
      useEffect(() => {
        setValue(`${id}_country`, country)
      }, [country])

      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <div className="flex items-center gap-2">
            <Select
              disabled={!config?.validation?.allowCountryChange}
              value={country}
              onValueChange={setCountry}
            >
              <SelectTrigger className="bg-background">
                <SelectValue>{country}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {COUNTRY?.map((c) => (
                  <SelectItem
                    className="cursor-pointer rounded-none border-b p-2"
                    key={c?.value}
                    value={c?.value}
                  >
                    {c?.label} <Kbd>{c?.value}</Kbd>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id={config?.label}
              className="bg-background dark:bg-background"
              placeholder={config?.placeholder || undefined}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
              }}
              {...register(id, {
                required: {
                  value: Boolean(config?.required),
                  message: requiredMessage(name),
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone number must contain only digits",
                },
                validate: (value) => {
                  const selectedCountry = COUNTRY?.find(
                    (c) => c?.value == country
                  )
                  const requiredLength = selectedCountry?.numberLength || 0
                  if (!value) return true
                  if (String(value).length !== requiredLength) {
                    return `Phone number must be ${requiredLength} digits for country ${selectedCountry?.label}`
                  }
                  return true
                },
              })}
            />
          </div>
        </Field>
      )
    case "url":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <Input
            id={config?.label}
            className="bg-background dark:bg-background"
            placeholder={config?.placeholder || undefined}
            {...register(id, {
              required: {
                value: Boolean(config?.required),
                message: requiredMessage(name),
              },
              validate: (value) => {
                if (!value) return true
                try {
                  const url = new URL(value)
                  const allowedProtocols = config?.validation?.protocols ?? []
                  if (
                    Array.isArray(allowedProtocols) &&
                    allowedProtocols.length > 0
                  ) {
                    const protocolValid = allowedProtocols.some(
                      (proto: string) =>
                        url.protocol.replace(":", "") === proto.replace(":", "")
                    )
                    if (!protocolValid) {
                      return `URL must use one of the following protocols: ${allowedProtocols.join(", ")}`
                    }
                  }
                  const allowedDomains =
                    config?.validation?.allowedDomains ?? []
                  if (
                    Array.isArray(allowedDomains) &&
                    allowedDomains.length > 0
                  ) {
                    const hostname = url.hostname.replace(/^www\./, "")
                    const allowed = allowedDomains.some(
                      (domain: string) =>
                        hostname === domain.replace(/^www\./, "")
                    )
                    if (!allowed) {
                      return `URL domain must be one of: ${allowedDomains.join(", ")}`
                    }
                  }
                } catch {
                  return "Enter a valid URL"
                }
                return true
              },
            })}
          />
        </Field>
      )
    case "date":
      return (
        <Controller
          name={id}
          control={control}
          rules={{
            required: {
              value: Boolean(config?.required),
              message: requiredMessage(name),
            },
            validate: (value) => {
              const minDate = config?.validation?.minDate || undefined
              const maxDate = config?.validation?.maxDate || undefined
              const userDate = format(value, "yyyy-MM-dd")
              if (minDate && maxDate && userDate) {
                const start = minDate < maxDate ? minDate : maxDate
                const end = minDate > maxDate ? minDate : maxDate
                if (userDate < start || userDate > end) {
                  return `Date must be between ${format(start, "dd-MM-yyyy")} and ${format(end, "dd-MM-yyyy")}`
                }
              }
              return true
            },
          }}
          render={({ field: controllerField }) => (
            <DatePickerSimple
              field={field}
              value={controllerField.value}
              onChange={controllerField.onChange}
            />
          )}
        />
      )
    case "dropdown":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <Controller
            name={id}
            control={control}
            rules={{
              required: {
                value: Boolean(config?.required),
                message: requiredMessage(name),
              },
            }}
            render={({ field: controllerField }) => (
              <Select
                value={controllerField.value || ""}
                onValueChange={controllerField.onChange}
              >
                <SelectTrigger className="cursor-pointer bg-background dark:bg-background">
                  <SelectValue placeholder={config?.placeholder || "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {config?.options?.map((o, idx) => (
                    <SelectItem
                      className="cursor-pointer rounded-none border-b p-2"
                      key={idx}
                      value={o?.value || ""}
                    >
                      {o?.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      )
    case "radio":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <Controller
            name={id}
            control={control}
            rules={{
              required: {
                value: Boolean(config?.required),
                message: requiredMessage(name),
              },
            }}
            render={({ field: controllerField }) => (
              <RadioGroup
                className="mt-2"
                value={controllerField.value ?? ""}
                onValueChange={(value) => controllerField.onChange(value)}
              >
                {config?.options?.map((o: Option, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <RadioGroupItem
                      className="cursor-pointer bg-background dark:bg-background"
                      value={o?.value || ""}
                    />
                    <FieldLabel htmlFor={o?.label}>{o?.label}</FieldLabel>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </Field>
      )
    case "checkbox":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <Controller
            name={id}
            control={control}
            defaultValue={[]}
            rules={{
              required: {
                value: Boolean(config?.required),
                message: requiredMessage(name),
              },
            }}
            render={({ field: controllerField }) => (
              <div className="mt-2 flex flex-col gap-2">
                {config?.options?.map((o: any) => {
                  const checked = Array.isArray(controllerField.value)
                    ? controllerField.value.includes(o?.value)
                    : false
                  return (
                    <Field orientation="horizontal" key={o?.value || o?.label}>
                      <Checkbox
                        id={config?.label}
                        className="cursor-pointer bg-background dark:bg-background"
                        value={o?.value}
                        checked={checked}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            controllerField.onChange([
                              ...(controllerField.value || []),
                              o?.value,
                            ])
                          } else {
                            controllerField.onChange(
                              (controllerField.value || []).filter(
                                (v: any) => v !== o?.value
                              )
                            )
                          }
                        }}
                      />
                      <FieldLabel htmlFor={o?.label}>{o?.label}</FieldLabel>
                    </Field>
                  )
                })}
              </div>
            )}
          />
        </Field>
      )
    default:
      return null
  }
}

function DatePickerSimple({
  field,
  value,
  onChange,
}: {
  field: FormFieldType
  value?: Date | string
  onChange?: (date: Date | string | undefined) => void
}) {
  const config = field?.config || {}
  const [open, setOpen] = useState(false)
  const parsedDate =
    typeof value === "string" ? (value ? new Date(value) : undefined) : value

  return (
    <Field>
      <div>
        <Label label={config?.label} required={config?.required} />
        <Helptext helpText={config?.helpText} />
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-start bg-background font-normal dark:bg-background"
          >
            <CalendarDays />
            {parsedDate ? (
              format(parsedDate, "dd-MM-yyyy")
            ) : (
              <span className="text-muted-foreground">
                {config?.placeholder || "Select Date"}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={parsedDate ? new Date(parsedDate) : undefined}
            defaultMonth={parsedDate ? new Date(parsedDate) : undefined}
            captionLayout="dropdown"
            onSelect={(date: any) => {
              if (onChange) {
                onChange(date)
              }
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

function Label({ label, required }: { label?: string; required?: boolean }) {
  return (
    <FieldLabel htmlFor={label} className="flex items-start gap-2">
      {label || "Label or Question"}
      {required && <Asterisk size={12} className="text-primary" />}
    </FieldLabel>
  )
}

function Helptext({ helpText }: { helpText?: string }) {
  if (!helpText) return null
  return <FieldDescription>{helpText}</FieldDescription>
}
