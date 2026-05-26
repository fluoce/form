import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { JsonValue } from '@prisma/client/runtime/client';

export class SubmitDto {
  @IsString()
  formId: string;

  @IsString()
  pageId: string;

  @IsString()
  submissionId: string;

  @IsObject()
  answers: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsOptional()
  @IsBoolean()
  start?: boolean;
}

export class SubmitDeleteDto {
  @IsNotEmpty()
  @IsArray()
  submitIds: string[];
}

export type SubmissionAnswerType = {
  id: string;
  submitId: string;
  fieldId: string;
  valueText: string | null;
  valueNumber: number | null;
  valueBoolean: boolean | null;
  valueJson: JsonValue | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type DeviceType =
  | 'desktop'
  | 'embedded'
  | 'mobile'
  | 'smarttv'
  | 'tablet'
  | 'wearable'
  | 'xr';

export type SubmitType = {
  id: string;
  formId: string;
  status: 'COMPLETED' | 'PARTIAL';
  createdAt: Date | string;
  updatedAt: Date | string;
  completedAt: Date | string | null;
  ipAddress: string | null;
  device: string | DeviceType | null;
  os: string | null;
  browser: string | null;
  submissionAnswer: SubmissionAnswerType[];
};

export type SubmissionsType = {
  formFields: {
    id: string;
    config: JsonValue;
  }[];
  submissions: SubmitType[];
};
