import {
  IsString,
  IsObject,
  IsOptional,
  IsIn,
  IsNotEmptyObject,
  IsNotEmpty,
  IsBoolean,
  ValidateNested,
  IsNumber,
  Min,
  Max,
  IsArray,
  IsDateString,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export const FIELD_TYPES = [
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

export const COUNTRY_CODE: string[] = ['us', 'in'];

export class OptionDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  @IsString()
  prevFieldId?: string | null;

  @IsOptional()
  @IsString()
  nextFieldId?: string | null;
}

// base config
export class FieldBaseConfigDto {
  @IsIn(FIELD_TYPES)
  type: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsOptional()
  @IsString()
  helpText?: string;

  @IsBoolean()
  required: boolean = false;

  @IsOptional()
  @IsString()
  placeholder?: string;
}

// text config
export class TextValidationDto {
  @IsNumber()
  @Min(0)
  minLength?: number = 0;

  @IsNumber()
  @Min(1)
  @Max(100)
  maxLength?: number = 100;
}

export class TextConfigDto extends FieldBaseConfigDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TextValidationDto)
  validation?: TextValidationDto;
}

// textarea config
export class TextareaValidationDto {
  @IsNumber()
  @Min(0)
  minLength?: number = 0;

  @IsNumber()
  @Min(1)
  @Max(1000)
  maxLength?: number = 1000;
}

export class TextareaConfigDto extends FieldBaseConfigDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TextareaValidationDto)
  validation?: TextareaValidationDto;
}

// number config
export class NumberValidationDto {
  @IsOptional()
  @IsNumber()
  min?: number;

  @IsOptional()
  @IsNumber()
  max?: number;

  @IsOptional()
  @IsNumber()
  step?: number;
}

export class NumberConfigDto extends FieldBaseConfigDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => NumberValidationDto)
  validation?: NumberValidationDto;
}

// phone config
export class PhoneValidationDto {
  @IsOptional()
  @IsIn(COUNTRY_CODE)
  defaultCountryCode?: string;

  @IsBoolean()
  allowCountryChange?: boolean = true;

  @IsOptional()
  @IsArray()
  @IsIn(COUNTRY_CODE, { each: true })
  allowedCountry?: string[];
}

export class PhoneConfigDto extends FieldBaseConfigDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PhoneValidationDto)
  validation?: PhoneValidationDto;
}

// url config
export class UrlValidationDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  protocols?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedDomains?: string[];
}

export class UrlConfigDto extends FieldBaseConfigDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UrlValidationDto)
  validation?: UrlValidationDto;
}

// date config
export class DateValidationDto {
  @IsOptional()
  @IsDateString()
  minDate?: string;

  @IsOptional()
  @IsDateString()
  maxDate?: string;
}

export class DateConfigDto extends FieldBaseConfigDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => DateValidationDto)
  validation?: DateValidationDto;
}

// dropdown config
export class DropdownValidationDto {
  @IsBoolean()
  multiple?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minSelected?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxSelected?: number;

  @IsOptional()
  @IsBoolean()
  searchable?: boolean;
}

export class DropdownConfigDto extends FieldBaseConfigDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DropdownValidationDto)
  validation?: DropdownValidationDto;
}

// radio config
export class RadioConfigDto extends FieldBaseConfigDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];
}

// checkbox config

// dropdown config
export class CheckboxValidationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  minSelected?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxSelected?: number;
}

export class CheckboxConfigDto extends FieldBaseConfigDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CheckboxValidationDto)
  validation?: CheckboxValidationDto;
}

//@ts-ignore
const configTypeMap: Record<FieldType, any> = {
  text: TextConfigDto,
  textarea: TextareaConfigDto,
  number: NumberConfigDto,
  phone: PhoneConfigDto,
  url: UrlConfigDto,
  date: DateConfigDto,
  dropdown: DropdownConfigDto,
  radio: RadioConfigDto,
  checkbox: CheckboxConfigDto,
  email: FieldBaseConfigDto,
};

export class CreateFormFieldDto {
  @IsOptional()
  @IsString()
  prevFieldId?: string | null;

  @IsOptional()
  @IsString()
  nextFieldId?: string | null;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type((e) => {
    const type = e?.object?.config?.type;
    return configTypeMap[type] || FieldBaseConfigDto;
  })
  config: FieldBaseConfigDto;
}

export interface FormFieldType {
  id: string;
  formId: string;
  formPageId: string;
  config: any;
  position: string;
  createdAt: Date;
  updatedAt: Date;
}
