"use client";

import { useState } from "react";
import { Asterisk, CalendarDays } from "lucide-react";
import { Field, FieldLabel, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import type { FormFieldType } from "@/types/formfield";

export function FieldRenderer({ field }: { field: FormFieldType }) {
  switch (field.type) {
    case "text":
      return (
        <Field>
          <Label label={field?.label} required={field?.required} />
          <Helptext helpText={field?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            type="text"
            placeholder={field?.placeholder || undefined}
            minLength={field?.validation?.minLength || 0}
            maxLength={field?.validation?.maxLength || 199}
            required={field?.required}
          />
        </Field>
      );

    case "textarea":
      return (
        <Field>
          <Label label={field?.label} required={field?.required} />
          <Helptext helpText={field?.helpText} />
          <Textarea
            className="bg-background dark:bg-background max-h-60"
            placeholder={field?.placeholder || undefined}
            required={field?.required}
            minLength={field?.validation?.minLength || 0}
            maxLength={field?.validation?.maxLength || 999}
          />
        </Field>
      );
    case "email":
      return (
        <Field>
          <Label label={field?.label} required={field?.required} />
          <Helptext helpText={field?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            placeholder={field?.placeholder || undefined}
            type="email"
            required={field?.required}
          />
        </Field>
      );
    case "number":
      return (
        <Field>
          <Label label={field?.label} required={field?.required} />
          <Helptext helpText={field?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            placeholder={field?.placeholder || undefined}
            required={field?.required}
            type="number"
            min={field?.validation?.min || undefined}
            max={field?.validation?.max || undefined}
            step={field?.validation?.step || undefined}
          />
        </Field>
      );

    case "phone":
      return (
        <Field>
          <Label label={field?.label} required={field?.required} />
          <Helptext helpText={field?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            placeholder={field?.placeholder || undefined}
            required={field?.required}
            type="number"
          />
        </Field>
      );
    case "url":
      return (
        <Field>
          <Label label={field?.label} required={field?.required} />
          <Helptext helpText={field?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            placeholder={field?.placeholder || undefined}
            type="url"
          />
        </Field>
      );
    case "date":
      return <DatePickerSimple field={field} />;

    case "dropdown":
      return (
        <Field>
          <Label label={field?.label} required={field?.required} />
          <Helptext helpText={field?.helpText} />
          <Select>
            <SelectTrigger className="bg-background dark:bg-background cursor-pointer">
              <SelectValue placeholder={field?.placeholder || "Select"} />
            </SelectTrigger>
            <SelectContent>
              {field?.options?.map((o) => (
                <SelectItem key={o?.value || o?.label} value={o?.value || ""}>
                  {o?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      );
    case "radio":
      return (
        <Field>
          <Label label={field?.label} required={field?.required} />
          <Helptext helpText={field?.helpText} />
          <RadioGroup>
            {field?.options?.map((o) => (
              <div
                key={o?.value || o?.label}
                className="flex items-center gap-3"
              >
                <RadioGroupItem
                  className="bg-background dark:bg-background cursor-pointer"
                  value={o?.value || ""}
                />
                <FieldLabel htmlFor={o?.label}>{o?.label}</FieldLabel>
              </div>
            ))}
          </RadioGroup>
        </Field>
      );
    case "checkbox":
      return (
        <Field>
          <Label label={field?.label} required={field?.required} />
          <Helptext helpText={field?.helpText} />
          {field?.options?.map((o) => (
            <Field orientation="horizontal" key={o?.value || o?.label}>
              <Checkbox
                className="bg-background dark:bg-background cursor-pointer"
                value={o?.value}
              />
              <FieldLabel htmlFor={o?.label}>{o?.label}</FieldLabel>
            </Field>
          ))}
        </Field>
      );

    default:
      return null;
  }
}

function Label({ label, required }: { label: string; required?: boolean }) {
  return (
    <FieldLabel htmlFor={label}>
      {label || "Label or Question"}{" "}
      {required && <Asterisk size={16} className="text-primary" />}
    </FieldLabel>
  );
}

function Helptext({ helpText }: { helpText?: string }) {
  if (!helpText) return null;
  return <FieldDescription>{helpText}</FieldDescription>;
}

function DatePickerSimple({ field }: { field: FormFieldType }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Field>
      <FieldLabel htmlFor={field?.label}>{field?.label}</FieldLabel>
      <Helptext helpText={field?.helpText} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="bg-background dark:bg-background justify-start font-normal"
          >
            <CalendarDays />{" "}
            {date ? date.toISOString().slice(0, 10) : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
