import { FormStatus, FormTheme } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

const formNameMessage = 'Form name must be between 2 and 30 characters';

const formTitleMessage = 'Form title must be between 2 and 100 characters';

const formDescriptionMessage =
  'Form description must be between 2 and 200 characters';

export class CreateFormDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: formNameMessage,
  })
  @MaxLength(30, {
    message: formNameMessage,
  })
  name: string;
}

export class UpdateFormDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: formNameMessage,
  })
  @MaxLength(30, {
    message: formNameMessage,
  })
  name?: string;

  @IsOptional()
  @IsEnum(FormStatus)
  status?: FormStatus;

  @IsOptional()
  @IsEnum(FormTheme)
  @IsString()
  theme?: FormTheme;

  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: formTitleMessage,
  })
  @MaxLength(100, {
    message: formTitleMessage,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: formDescriptionMessage,
  })
  @MaxLength(200, {
    message: formDescriptionMessage,
  })
  description?: string;
}

export interface FormType {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  status: FormStatus;
  createdAt: Date;
  updatedAt: Date;
}
