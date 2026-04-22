import {
  CreateFormFieldDto,
  UpdateFormFieldDto,
} from "./formfield-config-types"

export type FormTabType = "general" | "edit" | "result" | "share"

export type FormStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"

export interface FormType {
  id: string
  workspaceId: string
  userId: string
  name: string
  slug: string
  formPage: FormPageType[]
  description?: string
  title?: string
  status: FormStatus
  theme: FormThemeType
  createdAt?: string
  updatedAt?: string
}

export type FormCreateType = {
  name: string
}

export type FormThemeType =
  | "DEFAULT"
  | "AMBER"
  | "BLUE"
  | "CYAN"
  | "EMERALD"
  | "FUCHSIA"
  | "GREEN"
  | "INDIGO"
  | "LIME"
  | "ORANGE"
  | "PINK"
  | "PURPLE"
  | "RED"
  | "ROSE"
  | "SKY"
  | "TEAL"
  | "VIOLET"
  | "YELLOW"

export type FormUpdateType = {
  name?: string
  status?: FormStatus
  theme?: FormThemeType
  title?: string
  description?: string
}

export interface FormPageType {
  id: string
  formId: string
  name?: string | null
  position: string
  createdAt?: string
  updatedAt?: string
  formField: FormFieldType[]
}

export type FormPageCreateType = {
  name: string
}

export type FormPageUpdateType = {
  formId: string
  formPageId: string
  name?: string
  prevPageId?: string | undefined
  nextPageId?: string | undefined
}

export interface FormFieldType {
  id: string
  formId: string
  formPageId: string
  config: any
  position: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type FormFieldCreateType = {
  body: CreateFormFieldDto
  formId: string
  formPageId: string
}

export type FormFieldUpdateType = {
  body: UpdateFormFieldDto
  formId: string
  formPageId: string
  formFieldId: string
}
