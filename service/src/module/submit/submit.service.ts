import { Injectable, NotFoundException } from '@nestjs/common';
import { FormcoreService } from 'src/core/formcore/formcore.service';
import { FormpagecoreService } from 'src/core/formpagecore/formpagecore.service';
import { SubmitcoreService } from 'src/core/submitcore/submitcore.service';
import { ResponseDataType } from 'src/types/response.type';
import { SubmitDto } from 'src/types/submit.types';

@Injectable()
export class SubmitService {
  constructor(
    private readonly submitCoreService: SubmitcoreService,
    private readonly formCoreSerivce: FormcoreService,
    private readonly formPageCoreService: FormpagecoreService,
  ) {}

  async addSubmit(data: SubmitDto): Promise<ResponseDataType> {
    const formPage = await this.formPageCoreService.getFormPage(
      data.formId,
      data.pageId,
    );

    if (!formPage) {
      throw new NotFoundException('form or formpage not found');
    }

    let submitData: {
      fieldId: string;
      answer: any;
    }[] = [];

    for (const [fieldId, answer] of Object.entries(data.answers)) {
      submitData.push({
        fieldId,
        answer,
      });
    }

    return {
      message: 'submittion added successfullly',
      submitData,
      submissionId: data.submissionId,
      pageId: data.pageId,
      formId: data.formId,
    };
  }
}
