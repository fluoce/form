export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "phone"
  | "url"
  | "date"
  | "dropdown"
  | "radio"
  | "checkbox";

export const COUNTRY_CODE = ["us", "in"] as const;

export type CountryCode = (typeof COUNTRY_CODE)[number];

export interface Option {
  label: string;
  value: string;
  prevFieldId?: string | null;
  nextFieldId?: string | null;
}

export interface FieldBaseConfig {
  type: FieldType;
  label: string;
  helpText?: string;
  required?: boolean;
  placeholder?: string;
}

// Text validation
export interface TextValidation {
  minLength?: number;
  maxLength?: number;
}
// Text config
export interface TextField extends FieldBaseConfig {
  type: "text";
  validation?: TextValidation;
}

// Textarea
export interface TextareaValidation {
  minLength?: number;
  maxLength?: number;
}
export interface TextareaField extends FieldBaseConfig {
  type: "textarea";
  validation?: TextareaValidation;
}

export interface NumberValidation {
  min?: number;
  max?: number;
  step?: number;
}
export interface NumberField extends FieldBaseConfig {
  type: "number";
  validation?: NumberValidation;
}

export interface EmailField extends FieldBaseConfig {
  type: "email";
}

export interface PhoneValidation {
  defaultCountryCode?: CountryCode;
  allowCountryChange?: boolean;
  allowedCountry?: CountryCode[];
}
export interface PhoneField extends FieldBaseConfig {
  type: "phone";
  validation?: PhoneValidation;
}

export interface UrlValidation {
  protocols?: string[];
  allowedDomains?: string[];
}
export interface UrlField extends FieldBaseConfig {
  type: "url";
  validation?: UrlValidation;
}

// Date validation
export interface DateValidation {
  minDate?: string;
  maxDate?: string;
}
export interface DateField extends FieldBaseConfig {
  type: "date";
  validation?: DateValidation;
}

// Dropdown validation
export interface DropdownValidation {
  multiple?: boolean;
  minSelected?: number;
  maxSelected?: number;
  searchable?: boolean;
}
export interface DropdownField extends FieldBaseConfig {
  type: "dropdown";
  options: Option[];
  validation?: DropdownValidation;
}

export interface RadioField extends FieldBaseConfig {
  type: "radio";
  options: Option[];
}

export interface CheckboxValidation {
  minSelected?: number;
  maxSelected?: number;
}
export interface CheckboxField extends FieldBaseConfig {
  type: "checkbox";
  options: Option[];
  validation?: CheckboxValidation;
}

export type FormFieldConfig =
  | TextField
  | TextareaField
  | NumberField
  | EmailField
  | PhoneField
  | UrlField
  | DateField
  | DropdownField
  | RadioField
  | CheckboxField;

interface CreateFormFieldDto {
  prevFieldId?: string | null;
  nextFieldId?: string | null;
  config: FormFieldConfig;
}

interface UpdateFormFieldDto {
  prevFieldId?: string | null;
  nextFieldId?: string | null;
  config?: FormFieldConfig;
}

export type CreateFormFieldType = {
  body: CreateFormFieldDto;
  formId: string;
  formPageId: string;
};

export type UpdateFormFieldType = {
  body: UpdateFormFieldDto;
  formId: string;
  formPageId: string;
  formFieldId: string;
};

export type CommonFormFieldType = {
  formId: string;
  formPageId: string;
  formFieldId: string;
};
