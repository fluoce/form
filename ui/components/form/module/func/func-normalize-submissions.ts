import {
  SubmissionsType,
  SubmitType,
  SubmissionAnswerType,
} from "@/types/submit-types"

export function resolveAnswerValue(answer: SubmissionAnswerType) {
  if (answer?.valueText !== null) return answer?.valueText || "-"
  if (answer?.valueNumber !== null) return answer?.valueNumber || "-"
  if (answer?.valueBoolean !== null) return answer?.valueBoolean || "-"
  if (answer?.valueJson !== null) return answer?.valueJson || "-"
  return "-"
}

export type NormalizedSubmissionRow = {
  id: string
  status: SubmitType["status"]
  device: SubmitType["device"]
  createdAt: SubmitType["createdAt"]
  completedAt: SubmitType["completedAt"]
  answeredCount: number
  [fieldId: string]: unknown
}

export function funcNormalizeSubmissions(
  data: SubmissionsType
): NormalizedSubmissionRow[] {
  return data?.submissions?.map((sub) => {
    const answerMap = Object.fromEntries(
      sub?.submissionAnswer?.map((ans) => [
        ans?.fieldId,
        resolveAnswerValue(ans),
      ])
    )

    return {
      id: sub?.id,
      status: sub?.status,
      device: sub?.device,
      createdAt: sub?.createdAt,
      completedAt: sub?.completedAt,
      answeredCount: sub?.submissionAnswer?.length,
      ...answerMap,
    }
  })
}

export function funcNormalizeSubmissionsForCard(data: SubmissionsType) {
  return data?.submissions?.map((sub) => {
    const questions = sub?.submissionAnswer?.map((answer) => {
      const field = data?.formFields.find((f) => f?.id === answer?.fieldId)
      return {
        id: answer.id,
        question: field?.config?.label ?? "Unknown Question",
        answer: resolveAnswerValue(answer),
        type: field?.config?.type ?? "text",
      }
    })

    return {
      id: sub.id,
      status: sub.status,
      device: sub?.device,
      createdAt: sub.createdAt,
      completedAt: sub?.completedAt,
      answeredCount: sub?.submissionAnswer?.length,
      questions,
    }
  })
}
