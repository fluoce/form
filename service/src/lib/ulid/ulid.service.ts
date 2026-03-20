import { Injectable } from '@nestjs/common';
import { FormIdPrefix, FormPageIdPrefix, WorkspaceIdPrefix, WorkspaceMemberIdPrefix } from 'src/types/id.types';
import { ulid, decodeTime } from 'ulid';

@Injectable()
export class UlidService {

  isValidUlid(value: string): boolean {
    try {
      decodeTime(value)
      return true
    } catch (error) {
      return false
    }
  }

  generateWorkspaceId(prefix: WorkspaceIdPrefix): string {
    return `${prefix}_${ulid()}`;
  }

  generateWorkspaceMemberId(prefix: WorkspaceMemberIdPrefix): string {
    return `${prefix}_${ulid()}`;
  }

  generateFormId(prefix: FormIdPrefix): string {
    return `${prefix}_${ulid()}`
  }

  generateFormPageId(prefix: FormPageIdPrefix): string {
    return `${prefix}_${ulid()}`
  }
}
