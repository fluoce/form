import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FormService } from './form.service';
import { WorkspaceGuard } from '../workspace/workspace.guard';
import { User } from 'src/decorator/user.decorator';
import { CreateFormDto, UpdateFormDto } from 'src/types/form.types';
import type { FormType } from 'src/types/form.types';
import type { UserPayload } from 'src/types/payload.types';
import { Workspace } from 'src/decorator/workspace.decorator';
import type { WorkspaceType } from 'src/types/workspace.types';
import { Form } from 'src/decorator/form.decorator';
import { FormGuard } from './form.guard';
import { Public } from 'src/decorator/public.decorator';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @UseGuards(WorkspaceGuard)
  @Post(':workspaceId')
  async createForm(
    @User() user: UserPayload,
    @Workspace() workspace: WorkspaceType,
    @Body() data: CreateFormDto,
  ) {
    return await this.formService.createForm(user.sub, workspace.id, data);
  }

  @UseGuards(FormGuard)
  @Patch(':formId')
  async updateForm(
    @User() user: UserPayload,
    @Form() form: FormType,
    @Body() data: UpdateFormDto,
  ) {
    return await this.formService.updateForm(user.sub, form.id, data);
  }

  @UseGuards(FormGuard)
  @Delete(':formId')
  async deleteForm(@User() user: UserPayload, @Form() form: FormType) {
    return await this.formService.deleteForm(user.sub, form.id);
  }

  @UseGuards(FormGuard)
  @Get(':formId')
  async getForm(@User() user: UserPayload, @Form() form: FormType) {
    return await this.formService.getForm(user.sub, form.id);
  }

  @UseGuards(WorkspaceGuard)
  @Get('trash/:workspaceId')
  async getTrashForms(
    @User() user: UserPayload,
    @Workspace() workspace: WorkspaceType,
  ) {
    return await this.formService.getTrashForm(user.sub, workspace.id);
  }

  @UseGuards(WorkspaceGuard)
  @Get('all/:workspaceId')
  async getForms(
    @User() user: UserPayload,
    @Workspace() workspace: WorkspaceType,
  ) {
    return await this.formService.getForms(user.sub, workspace.id);
  }

  @UseGuards(FormGuard)
  @Get('preview/:formId')
  async previewForm(@Form() form: FormType) {
    return await this.formService.getFullForm(form.shareId);
  }

  @UseGuards(WorkspaceGuard)
  @UseGuards(FormGuard)
  @Post(':workspaceId/publish/:formId')
  async publishForm(
    @Workspace() workspace: WorkspaceType,
    @User() user: UserPayload,
    @Param('formId') formId: string,
  ) {
    return await this.formService.publishForm(user.sub, workspace, formId);
  }

  @Public()
  @Get('public/:shareId')
  async getFullForm(@Param('shareId') shareId: string) {
    return await this.formService.getFullForm(shareId);
  }
}
