import {
  SubmissionsType,
  SubmitType,
  SubmissionAnswerType,
} from "@/types/submit-types"

export function resolveAnswerValue(answer: SubmissionAnswerType) {
  if (answer?.valueText !== null) return answer?.valueText
  if (answer?.valueNumber !== null) return answer?.valueNumber
  if (answer?.valueBoolean !== null) return answer?.valueBoolean
  if (answer?.valueJson !== null) return answer?.valueJson
  return null
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
