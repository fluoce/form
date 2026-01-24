import { Injectable } from '@nestjs/common';
import { idPipe } from './id.pipe';
import { UlidService } from 'src/lib/ulid/ulid.service';

@Injectable()
export class WorkspaceMemberIdPipe extends idPipe {
    constructor(ulidService: UlidService) {
        super(['wsmb'], ulidService);
    }
}
