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
import { JsonValue } from '@prisma/client/runtime/client';

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

export const FIELD_TYPES: FieldType[] = [
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

export const COUNTRY_CODE: string[] = [
  'af',
  'al',
  'dz',
  'ad',
  'ao',
  'ag',
  'ar',
  'am',
  'au',
  'at',
  'az',
  'bs',
  'bh',
  'bd',
  'bb',
  'by',
  'be',
  'bz',
  'bj',
  'bt',
  'bo',
  'ba',
  'bw',
  'br',
  'bn',
  'bg',
  'bf',
  'bi',
  'cv',
  'kh',
  'cm',
  'ca',
  'cf',
  'td',
  'cl',
  'cn',
  'co',
  'km',
  'cg',
  'cd',
  'cr',
  'hr',
  'cu',
  'cy',
  'cz',
  'dk',
  'dj',
  'dm',
  'do',
  'ec',
  'eg',
  'sv',
  'gq',
  'er',
  'ee',
  'sz',
  'et',
  'fj',
  'fi',
  'fr',
  'ga',
  'gm',
  'ge',
  'de',
  'gh',
  'gr',
  'gd',
  'gt',
  'gn',
  'gw',
  'gy',
  'ht',
  'hn',
  'hu',
  'is',
  'in',
  'id',
  'ir',
  'iq',
  'ie',
  'il',
  'it',
  'jm',
  'jp',
  'jo',
  'kz',
  'ke',
  'ki',
  'kp',
  'kr',
  'xk',
  'kw',
  'kg',
  'la',
  'lv',
  'lb',
  'ls',
  'lr',
  'ly',
  'li',
  'lt',
  'lu',
  'mg',
  'mw',
  'my',
  'mv',
  'ml',
  'mt',
  'mh',
  'mr',
  'mu',
  'mx',
  'fm',
  'md',
  'mc',
  'mn',
  'me',
  'ma',
  'mz',
  'mm',
  'na',
  'nr',
  'np',
  'nl',
  'nz',
  'ni',
  'ne',
  'ng',
  'mk',
  'no',
  'om',
  'pk',
  'pw',
  'ps',
  'pa',
  'pg',
  'py',
  'pe',
  'ph',
  'pl',
  'pt',
  'qa',
  'ro',
  'ru',
  'rw',
  'kn',
  'lc',
  'vc',
  'ws',
  'sm',
  'st',
  'sa',
  'sn',
  'rs',
  'sc',
  'sl',
  'sg',
  'sk',
  'si',
  'sb',
  'so',
  'za',
  'ss',
  'es',
  'lk',
  'sd',
  'sr',
  'se',
  'ch',
  'sy',
  'tw',
  'tj',
  'tz',
  'th',
  'tl',
  'tg',
  'to',
  'tt',
  'tn',
  'tr',
  'tm',
  'tv',
  'ug',
  'ua',
  'ae',
  'gb',
  'us',
  'uy',
  'uz',
  'vu',
  'va',
  've',
  'vn',
  'ye',
  'zm',
  'zw',
  '',
];

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
  @Min(1)
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

export class UpdateFormFieldDto {
  @IsOptional()
  @IsString()
  prevFieldId?: string | null;

  @IsOptional()
  @IsString()
  nextFieldId?: string | null;

  @IsOptional()
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
  config: JsonValue;
  position: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FieldBaseConfigType = {
  type: string;
  label: string;
  helpText?: string;
  required: boolean;
  placeholder?: string;
};
