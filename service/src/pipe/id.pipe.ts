import {
    PipeTransform,
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { FormIdPrefix, FormPageIdPrefix, WorkspaceIdPrefix, WorkspaceMemberIdPrefix } from 'src/types/id.types';

type IdPrefix = WorkspaceIdPrefix | WorkspaceMemberIdPrefix | FormIdPrefix | FormPageIdPrefix;

@Injectable()
export class idPipe implements PipeTransform {

    constructor(
        private readonly allowedPrefixes: IdPrefix[],
        private readonly ulidService: UlidService
    ) { }

    transform(value: string) {
        if (!value) {
            throw new BadRequestException('ID is required');
        }

        const [prefix, ulid] = value.split('_');

        if (!prefix || !ulid) {
            throw new BadRequestException('Invalid ID format');
        }

        if (!this.allowedPrefixes.includes(prefix as IdPrefix)) {
            throw new BadRequestException(`Invalid ID prefix`);
        }

        if (!this.ulidService.isValidUlid(ulid)) {
            throw new BadRequestException('Invalid ID');
        }

        return value;
    }
}
