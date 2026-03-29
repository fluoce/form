import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UlidService } from 'src/lib/ulid/ulid.service';

@Injectable()
export class FormfieldcoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ulidService: UlidService,
  ) {}

  // async createField() {
  //   return await this.prisma.formField.create({
  //     data: {
  //       id: this.ulidService.generateFormFieldId('ff'),
  //     },
  //   });
  // }
}
