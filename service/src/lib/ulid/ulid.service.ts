import { Injectable } from '@nestjs/common';
import {
  FormFieldIdPrefix,
  FormIdPrefix,
  FormPageIdPrefix,
  WorkspaceIdPrefix,
  WorkspaceMemberIdPrefix,
} from 'src/types/id.types';
import { ulid, decodeTime } from 'ulid';

@Injectable()
export class UlidService {
  isValidUlid(value: string): boolean {
    try {
      decodeTime(value);
      return true;
    } catch (error) {
      return false;
    }
  }

  generateWorkspaceId(prefix: WorkspaceIdPrefix): string {
    return `${prefix}_${ulid()}`;
  }

  generateWorkspaceMemberId(prefix: WorkspaceMemberIdPrefix): string {
    return `${prefix}_${ulid()}`;
  }

  generateFormId(prefix: FormIdPrefix): string {
    return `${prefix}_${ulid()}`;
  }

  generateFormPageId(prefix: FormPageIdPrefix): string {
    return `${prefix}_${ulid()}`;
  }

  generateFormFieldId(prefix: FormFieldIdPrefix): string {
    return `${prefix}_${ulid()}`;
  }

  generateFormShareId(): string {
    return ulid();
  }
}
