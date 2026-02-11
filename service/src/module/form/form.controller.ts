import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { WorkspaceGuard } from '../workspace/workspace.guard';
import { User } from 'src/decorator/user.decorator';
import { CreateFormDto, UpdateFormDto } from 'src/types/form.types';
import type { FormType } from "src/types/form.types"
import type { UserPayload } from 'src/types/payload.types';
import { Workspace } from 'src/decorator/workspace.decorator';
import type { WorkspaceType } from 'src/types/workspace.types';
import { Form } from 'src/decorator/form.decorator';
import { FormGuard } from './form.guard';

@Controller('/form')
export class FormController {

    constructor(private readonly formService: FormService) { }

    @UseGuards(WorkspaceGuard)
    @Post(':workspaceId')
    async createForm(
        @User() user: UserPayload,
        @Workspace() workspace: WorkspaceType,
        @Body() data: CreateFormDto
    ) {
        const userId = user.sub;
        const workspaceID = workspace.id;
        return await this.formService.createForm(userId, workspaceID, data);
    }


    @UseGuards(FormGuard)
    @Patch(':formId')
    async updateForm(
        @User() user: UserPayload,
        @Form() form: FormType,
        @Body() data: UpdateFormDto
    ) {
        const userId = user.sub;
        const formId = form.id
        return await this.formService.updateForm(userId, formId, data)
    }

    @UseGuards(FormGuard)
    @Delete(':formId')
    async deleteForm(
        @User() user: UserPayload,
        @Form() form: FormType,
    ) {
        const userId = user.sub;
        const formId = form.id
        return await this.formService.deleteForm(userId, formId)
    }

    @UseGuards(FormGuard)
    @Get(':formId')
    async getForm(
        @User() user: UserPayload,
        @Form() form: FormType,
    ) {
        const userId = user.sub;
        const formId = form.id
        return await this.formService.getForm(userId, formId)
    }

    @UseGuards(WorkspaceGuard)
    @Get('trash/:workspaceId')
    async getTrashForms(
        @User() user: UserPayload,
        @Workspace() workspace: WorkspaceType,
    ) {
        const userId = user.sub;
        const workspaceId = workspace.id;
        return await this.formService.getTrashForm(userId, workspaceId)
    }

    @UseGuards(WorkspaceGuard)
    @Get('all/:workspaceId')
    async getForms(
        @User() user: UserPayload,
        @Workspace() workspace: WorkspaceType,
    ) {
        const userId = user.sub
        const workspaceID = workspace.id;
        return await this.formService.getForms(userId, workspaceID);
    }

}
