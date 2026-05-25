import { FieldBaseConfig } from "./formfield-config-types"

export type SubmitAnswerType = {
  formId: string
  pageId: string
  submissionId: string
  answers: Record<string, any>
  done?: boolean
  start?: boolean
}

export type SubmissionAnswerType = {
  id: string
  submitId: string
  fieldId: string
  valueText: string | null
  valueNumber: number | null
  valueBoolean: boolean | null
  valueJson: any | null
  createdAt: Date | string
  updatedAt: Date | string
}

export type DeviceType =
  | "desktop"
  | "embedded"
  | "mobile"
  | "smarttv"
  | "tablet"
  | "wearable"
  | "xr"

export type SubmitType = {
  id: string
  formId: string
  status: "COMPLETED" | "PARTIAL"
  createdAt: Date | string
  updatedAt: Date | string
  completedAt: Date | string | null
  ipAddress: string | null
  device: string | DeviceType | null
  os: string | null
  browser: string | null
  submissionAnswer: SubmissionAnswerType[]
}

export type SubmitOverviewType = {
  submissionCounts: {
    total: number
    completed: number
    partial: number
  }
  deviceCounts: {
    desktop: number
    mobile: number
    tablet: number
    other: number
  }
}

export type SubmissionsType = {
  formFields: {
    id: string
    config: FieldBaseConfig
  }[]
  submissions: SubmitType[]
}
