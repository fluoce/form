import { SubmitType } from "@/types/submit-types"

export function normalizeSubmissions({
  submissions,
}: {
  submissions: SubmitType[]
}) {
  if (!submissions || submissions.length) {
    return null
  }
}
