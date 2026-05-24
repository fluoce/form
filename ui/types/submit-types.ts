export type SubmitAnswerType = {
  formId: string
  pageId: string
  submissionId: string
  answers: Record<string, any>
  done?: boolean
}
