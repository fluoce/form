"use client"

import { useState } from "react"
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

export function FieldRenderer({ field }: { field: FormFieldType }) {
  const config = field?.config || {}

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
            minLength={config?.validation?.minLength || 0}
            maxLength={config?.validation?.maxLength || 199}
            required={config?.required}
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
            required={config?.required}
            minLength={config?.validation?.minLength || 0}
            maxLength={config?.validation?.maxLength || 999}
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
            type="email"
            required={config?.required}
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
            required={config?.required}
            type="number"
            min={config?.validation?.min || undefined}
            max={config?.validation?.max || undefined}
            step={config?.validation?.step || undefined}
          />
        </Field>
      )
    case "phone":
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
            required={config?.required}
            type="number"
          />
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
            type="url"
          />
        </Field>
      )
    case "date":
      return <DatePickerSimple field={field} />

    case "dropdown":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <Select>
            <SelectTrigger className="cursor-pointer bg-background dark:bg-background">
              <SelectValue placeholder={config?.placeholder || "Select"} />
            </SelectTrigger>
            <SelectContent>
              {config?.options?.map((o, idx) => (
                <SelectItem key={idx} value={o?.value || ""}>
                  {o?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )
    case "radio":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <RadioGroup className="mt-2">
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
        </Field>
      )
    case "checkbox":
      return (
        <Field>
          <div>
            <Label label={config?.label} required={config?.required} />
            <Helptext helpText={config?.helpText} />
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {config?.options?.map((o: any) => (
              <Field orientation="horizontal" key={o?.value || o?.label}>
                <Checkbox
                  id={config?.label}
                  className="cursor-pointer bg-background dark:bg-background"
                  value={o?.value}
                />
                <FieldLabel htmlFor={o?.label}>{o?.label}</FieldLabel>
              </Field>
            ))}
          </div>
        </Field>
      )
    default:
      return null
  }
}

function DatePickerSimple({ field }: { field: FormFieldType }) {
  const config = field?.config || {}
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

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
            <CalendarDays />{" "}
            {date ? (
              date.toISOString().slice(0, 10)
            ) : (
              <span className="text-muted-foreground">
                {config?.placeholder ?? "Select Date"}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date: any) => {
              setDate(date)
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
