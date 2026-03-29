import { BadRequestException } from '@nestjs/common';
import {
  FormFieldIdPrefix,
  FormIdPrefix,
  FormPageIdPrefix,
  WorkspaceIdPrefix,
} from 'src/types/id.types';

export function validateId(
  id: string,
  prefix:
    | WorkspaceIdPrefix
    | FormIdPrefix
    | FormPageIdPrefix
    | FormFieldIdPrefix,
  isValidUlid: (ulid: string) => boolean,
) {
  const idPrefix = id.split('_')[0];
  const ulid = id.split('_')[1];
  if (idPrefix !== prefix || !isValidUlid(ulid)) {
    throw new BadRequestException('Id is wrong');
  }
}
