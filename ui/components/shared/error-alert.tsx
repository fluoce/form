import { InfoIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { ReactElement } from "react"

export function ErrorAlert({
  error,
  icon = <InfoIcon />,
  description,
}: {
  error: string
  description?: string
  icon?: ReactElement
}) {
  return (
    <Alert variant="destructive">
      {icon}
      <AlertTitle>{error}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}
