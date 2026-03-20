import { Injectable } from '@nestjs/common';
import { idPipe } from './id.pipe';
import { UlidService } from 'src/lib/ulid/ulid.service';

@Injectable()
export class FormPageIdPipe extends idPipe {
    constructor(ulidService: UlidService) {
        super(['fp'], ulidService);
    }
}
