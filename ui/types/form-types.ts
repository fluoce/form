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

export interface FormPageType {
  id: string
  formId: string
  name?: string | null
  position: string
  createdAt?: string
  updatedAt?: string
  formField: FormFieldType[]
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
  status?: string
  theme?: FormThemeType
  title?: string
  description?: string
}
