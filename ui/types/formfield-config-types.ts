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

export const COUNTRY_CODE: string[] = [
  "af",
  "al",
  "dz",
  "ad",
  "ao",
  "ag",
  "ar",
  "am",
  "au",
  "at",
  "az",
  "bs",
  "bh",
  "bd",
  "bb",
  "by",
  "be",
  "bz",
  "bj",
  "bt",
  "bo",
  "ba",
  "bw",
  "br",
  "bn",
  "bg",
  "bf",
  "bi",
  "cv",
  "kh",
  "cm",
  "ca",
  "cf",
  "td",
  "cl",
  "cn",
  "co",
  "km",
  "cg",
  "cd",
  "cr",
  "hr",
  "cu",
  "cy",
  "cz",
  "dk",
  "dj",
  "dm",
  "do",
  "ec",
  "eg",
  "sv",
  "gq",
  "er",
  "ee",
  "sz",
  "et",
  "fj",
  "fi",
  "fr",
  "ga",
  "gm",
  "ge",
  "de",
  "gh",
  "gr",
  "gd",
  "gt",
  "gn",
  "gw",
  "gy",
  "ht",
  "hn",
  "hu",
  "is",
  "in",
  "id",
  "ir",
  "iq",
  "ie",
  "il",
  "it",
  "jm",
  "jp",
  "jo",
  "kz",
  "ke",
  "ki",
  "kp",
  "kr",
  "xk",
  "kw",
  "kg",
  "la",
  "lv",
  "lb",
  "ls",
  "lr",
  "ly",
  "li",
  "lt",
  "lu",
  "mg",
  "mw",
  "my",
  "mv",
  "ml",
  "mt",
  "mh",
  "mr",
  "mu",
  "mx",
  "fm",
  "md",
  "mc",
  "mn",
  "me",
  "ma",
  "mz",
  "mm",
  "na",
  "nr",
  "np",
  "nl",
  "nz",
  "ni",
  "ne",
  "ng",
  "mk",
  "no",
  "om",
  "pk",
  "pw",
  "ps",
  "pa",
  "pg",
  "py",
  "pe",
  "ph",
  "pl",
  "pt",
  "qa",
  "ro",
  "ru",
  "rw",
  "kn",
  "lc",
  "vc",
  "ws",
  "sm",
  "st",
  "sa",
  "sn",
  "rs",
  "sc",
  "sl",
  "sg",
  "sk",
  "si",
  "sb",
  "so",
  "za",
  "ss",
  "es",
  "lk",
  "sd",
  "sr",
  "se",
  "ch",
  "sy",
  "tw",
  "tj",
  "tz",
  "th",
  "tl",
  "tg",
  "to",
  "tt",
  "tn",
  "tr",
  "tm",
  "tv",
  "ug",
  "ua",
  "ae",
  "gb",
  "us",
  "uy",
  "uz",
  "vu",
  "va",
  "ve",
  "vn",
  "ye",
  "zm",
  "zw",
  "",
]

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
