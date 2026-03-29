import {
  IsString,
  IsObject,
  IsOptional,
  IsIn,
  IsNotEmptyObject,
} from 'class-validator';

const FIELD_TYPES: FieldType[] = [
  'text',
  'textarea',
  'number',
  'email',
  'phone',
  'url',
  'date',
  'dropdown',
  'radio',
  'checkbox',
];

export class CreateFormFieldDto {
  @IsIn(FIELD_TYPES)
  type: FieldType;

  @IsOptional()
  @IsString()
  prevFieldId?: string | null;

  @IsOptional()
  @IsString()
  nextFieldId?: string | null;

  @IsNotEmptyObject()
  @IsObject()
  config: Omit<FormFieldType, 'type'>;
}

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'phone'
  | 'url'
  | 'date'
  | 'dropdown'
  | 'radio'
  | 'checkbox';

export interface FieldBaseConfig {
  type: FieldType;
  label: string;
  helpText?: string;
  required: boolean;
  placeholder?: string;
}

// text
export interface TextField extends FieldBaseConfig {
  type: 'text';
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
}

// textarea
export interface TextareaField extends FieldBaseConfig {
  type: 'textarea';
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
}

// number
export interface NumberField extends FieldBaseConfig {
  type: 'number';
  validation?: {
    min?: number;
    max?: number;
    step?: number;
  };
}

// email
export interface EmailField extends FieldBaseConfig {
  type: 'email';
  // no needed
}

// phone
export interface PhoneField extends FieldBaseConfig {
  type: 'phone';
  countryCode?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
}

// url
export interface UrlField extends FieldBaseConfig {
  type: 'url';
  validation?: {
    protocols?: string[];
  };
}

// date
export interface DateField extends FieldBaseConfig {
  type: 'date';
  validation?: {
    // ISO string
    minDate?: string;
    maxDate?: string;
  };
}

// option helper
type Option = {
  label: string;
  value: string;
  position: string;
};

// dropdown
export interface DropdownField extends FieldBaseConfig {
  type: 'dropdown';
  options: Option[];
  validation?: {
    multiple?: boolean;
    minSelected?: number;
    maxSelected?: number;
  };
}

// radio
export interface RadioField extends FieldBaseConfig {
  type: 'radio';
  options: Option[];
}

// checkbox
export interface CheckboxField extends FieldBaseConfig {
  type: 'checkbox';
  options: Option[];
  validation?: {
    minSelected?: number;
    maxSelected?: number;
  };
}

export type FormFieldType =
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
