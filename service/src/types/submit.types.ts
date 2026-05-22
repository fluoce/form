import { IsObject, IsString } from 'class-validator';

export class SubmitDto {
  @IsString()
  formId: string;

  @IsString()
  pageId: string;

  @IsString()
  submissionId: string;

  @IsObject()
  answers: Record<string, any>;
}
