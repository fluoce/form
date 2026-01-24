import { Injectable } from '@nestjs/common';
import { idPipe } from './id.pipe';
import { UlidService } from 'src/lib/ulid/ulid.service';

@Injectable()
export class WorkspaceIdPipe extends idPipe {
    constructor(ulidService: UlidService) {
        super(['ws'], ulidService);
    }
}
