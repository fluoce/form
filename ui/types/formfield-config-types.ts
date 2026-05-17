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
  | "checkbox"

export const COUNTRY_CODE = ["us", "in"] as const

export type CountryCode = (typeof COUNTRY_CODE)[number]

export interface Option {
  label: string
  value: string
  prevFieldId?: string | null
  nextFieldId?: string | null
}

export interface FieldBaseConfig {
  type: FieldType
  label: string
  helpText?: string
  required?: boolean
  placeholder?: string
}

// Text
export interface TextValidation {
  minLength?: number
  maxLength?: number
}

export interface TextField extends FieldBaseConfig {
  type: "text"
  validation?: TextValidation
}

// Textarea
export interface TextareaValidation {
  minLength?: number
  maxLength?: number
}
export interface TextareaField extends FieldBaseConfig {
  type: "textarea"
  validation?: TextareaValidation
}

// Number
export interface NumberValidation {
  min?: number
  max?: number
  step?: number
}

export interface NumberField extends FieldBaseConfig {
  type: "number"
  validation?: NumberValidation
}

// email
export interface EmailField extends FieldBaseConfig {
  type: "email"
  validation?: NumberValidation
}

// Phone
export interface PhoneValidation {
  defaultCountryCode?: CountryCode
  allowCountryChange?: boolean
  allowedCountry?: CountryCode[]
}

export interface PhoneField extends FieldBaseConfig {
  type: "phone"
  validation?: PhoneValidation
}

// Url
export interface UrlValidation {
  protocols?: string[]
  allowedDomains?: string[]
}

export interface UrlField extends FieldBaseConfig {
  type: "url"
  validation?: UrlValidation
}

// Date
export interface DateValidation {
  minDate?: string
  maxDate?: string
}
export interface DateField extends FieldBaseConfig {
  type: "date"
  validation?: DateValidation
}

// Dropdown
export interface DropdownValidation {
  multiple?: boolean
  minSelected?: number
  maxSelected?: number
  searchable?: boolean
}

export interface DropdownField extends FieldBaseConfig {
  type: "dropdown"
  options: Option[]
  validation?: DropdownValidation
}

// Radio
export interface RadioField extends FieldBaseConfig {
  type: "radio"
  options: Option[]
}

// Checkbox
export interface CheckboxValidation {
  minSelected?: number
  maxSelected?: number
}
export interface CheckboxField extends FieldBaseConfig {
  type: "checkbox"
  options: Option[]
  validation?: CheckboxValidation
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
  | CheckboxField

export interface CreateFormFieldDto {
  prevFieldId?: string | null
  nextFieldId?: string | null
  config: FormFieldConfig
}

export interface UpdateFormFieldDto {
  prevFieldId?: string | null
  nextFieldId?: string | null
  config?: FormFieldConfig
}
