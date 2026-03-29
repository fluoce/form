import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

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
  @IsString()
  prevPageId?: string | null;

  @IsOptional()
  @IsString()
  nextPageId?: string | null;
}

export interface FormPageType {
  id: string;
  formId: string;
  name?: string | null;
  position: string;
  createdAt: Date;
  updatedAt: Date;
}
