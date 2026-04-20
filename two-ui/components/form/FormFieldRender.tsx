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
import { FormFieldSlice } from "@/types/slice";

export function FieldRenderer({ field }: { field: FormFieldSlice }) {
  const config = field?.config || {};

  switch (config?.type) {
    case "text":
      return (
        <Field>
          <Label label={config?.label} required={config?.required} />
          <Helptext helpText={config?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            type="text"
            placeholder={config?.placeholder || undefined}
            minLength={config?.validation?.minLength || 0}
            maxLength={config?.validation?.maxLength || 199}
            required={config?.required}
          />
        </Field>
      );
    case "textarea":
      return (
        <Field>
          <Label label={config?.label} required={config?.required} />
          <Helptext helpText={config?.helpText} />
          <Textarea
            className="bg-background dark:bg-background max-h-60"
            placeholder={config?.placeholder || undefined}
            required={config?.required}
            minLength={config?.validation?.minLength || 0}
            maxLength={config?.validation?.maxLength || 999}
          />
        </Field>
      );
    case "email":
      return (
        <Field>
          <Label label={config?.label} required={config?.required} />
          <Helptext helpText={config?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            placeholder={config?.placeholder || undefined}
            type="email"
            required={config?.required}
          />
        </Field>
      );
    case "number":
      return (
        <Field>
          <Label label={config?.label} required={config?.required} />
          <Helptext helpText={config?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            placeholder={config?.placeholder || undefined}
            required={config?.required}
            type="number"
            min={config?.validation?.min || undefined}
            max={config?.validation?.max || undefined}
            step={config?.validation?.step || undefined}
          />
        </Field>
      );
    case "phone":
      return (
        <Field>
          <Label label={config?.label} required={config?.required} />
          <Helptext helpText={config?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            placeholder={config?.placeholder || undefined}
            required={config?.required}
            type="number"
          />
        </Field>
      );
    case "url":
      return (
        <Field>
          <Label label={config?.label} required={config?.required} />
          <Helptext helpText={config?.helpText} />
          <Input
            className="bg-background dark:bg-background"
            placeholder={config?.placeholder || undefined}
            type="url"
          />
        </Field>
      );
    case "date":
      return <DatePickerSimple field={field} />;

    case "dropdown":
      return (
        <Field>
          <Label label={config?.label} required={config?.required} />
          <Helptext helpText={config?.helpText} />
          <Select>
            <SelectTrigger className="bg-background dark:bg-background cursor-pointer">
              <SelectValue placeholder={config?.placeholder || "Select"} />
            </SelectTrigger>
            <SelectContent>
              {config?.options?.map((o: any) => (
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
          <Label label={config?.label} required={config?.required} />
          <Helptext helpText={config?.helpText} />
          <RadioGroup>
            {config?.options?.map((o: any) => (
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
          <Label label={config?.label} required={config?.required} />
          <Helptext helpText={config?.helpText} />
          {config?.options?.map((o: any) => (
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

function Label({ label, required }: { label?: string; required?: boolean }) {
  return (
    <FieldLabel htmlFor={label}>
      {label || "Label or Question"}{" "}
      {required && <Asterisk size={12} className="text-primary" />}
    </FieldLabel>
  );
}

function Helptext({ helpText }: { helpText?: string }) {
  if (!helpText) return null;
  return <FieldDescription>{helpText}</FieldDescription>;
}

// Adjust to support the new expected field shape
function DatePickerSimple({ field }: { field: FormFieldSlice }) {
  const config = field?.config || {};
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Field>
      <FieldLabel htmlFor={config?.label}>{config?.label}</FieldLabel>
      <Helptext helpText={config?.helpText} />
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
