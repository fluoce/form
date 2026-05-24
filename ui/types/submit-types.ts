import { FieldBaseConfig } from "./formfield-config-types"

export type SubmitAnswerType = {
  formId: string
  pageId: string
  submissionId: string
  answers: Record<string, any>
  done?: boolean
}

export type SubmissionAnswerType = {
  id: string
  submitId: string
  fieldId: string
  formField: {
    id: string
    config: FieldBaseConfig
  }
  valueText: string | null
  valueNumber: number | null
  valueBoolean: boolean | null
  valueJson: any | null
  createdAt: string
  updatedAt: string
}

export type SubmitType = {
  id: string
  formId: string
  status: "COMPLETED" | "PARTIAL"
  createdAt: string
  updatedAt: string
  completedAt: string | null
  ipAddress: string | null
  userAgent: string | null
  submissionAnswer: SubmissionAnswerType[]
}
