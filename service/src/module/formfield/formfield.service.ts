import { Injectable } from '@nestjs/common';
import { FormfieldcoreService } from 'src/core/formfieldcore/formfieldcore.service';

@Injectable()
export class FormfieldService {
  constructor(private readonly formfieldcoreService: FormfieldcoreService) {}
}
