import { Decimal } from '@prisma/client/runtime/client';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

const formPageMessage = 'Form page name must be at most 30 characters';

export class CreateFormPageDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @MaxLength(30, {
    message: formPageMessage,
  })
  name?: string;
}

export class UpdateFormPageDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @MaxLength(30, {
    message: formPageMessage,
  })
  name?: string;

  @IsOptional()
  @IsNumber()
  position?: number;
}

export interface FormPageType {
  id: string;
  formId: string;
  name?: string | null;
  position: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
