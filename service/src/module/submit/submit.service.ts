import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormpagecoreService } from 'src/core/formpagecore/formpagecore.service';
import { SubmitcoreService } from 'src/core/submitcore/submitcore.service';
import { ResponseDataType } from 'src/types/response.type';
import { SubmitDto } from 'src/types/submit.types';
import { UserAgentType } from 'src/types/types';

@Injectable()
export class SubmitService {
  constructor(
    private readonly submitCoreService: SubmitcoreService,
    private readonly formPageCoreService: FormpagecoreService,
  ) {}

  async addSubmit(
    data: SubmitDto,
    meta: {
      ipAddress: string;
      userAgent: UserAgentType;
    },
  ): Promise<ResponseDataType> {
    const formPage = await this.formPageCoreService.getFormPage(
      data.formId,
      data.pageId,
    );

    if (!formPage) {
      throw new NotFoundException('form or formpage not found');
    }

    const isSubmissionDone = await this.submitCoreService.addSubmissionAnswer(
      data,
      meta,
    );

    if (!isSubmissionDone) {
      throw new InternalServerErrorException('Failed to save submission');
    }

    return {
      message: 'submittion added successfullly',
    };
  }

  async getSubmitOverview(formId: string): Promise<ResponseDataType> {
    const overview = await this.submitCoreService.getSubmitOverview(formId);

    if (!overview) {
      throw new InternalServerErrorException(
        'Unable to retrieve the submission overview at this time. Please try again later.',
      );
    }

    return {
      message: 'Submission overview fetched successfully',
      overview,
    };
  }

  async getSubmits(formId: string): Promise<ResponseDataType> {
    const submissions = await this.submitCoreService.getSubmissions(formId);

    if (!submissions) {
      throw new NotFoundException('Submissions not found');
    }

    return {
      message: 'submissions fetched successfully',
      submissions,
    };
  }
}
