import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Folder } from "lucide-react"
import { ReactElement } from "react"

type CEmptyPropsType = {
  icon?: ReactElement,
  title?: string,
  description?: string,
  btns?: ReactElement,
  linkBtn?: ReactElement
}

export function CEmpty({ icon, title, description, btns, linkBtn }: CEmptyPropsType) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {icon || <Folder />}
        </EmptyMedia>
        <EmptyTitle>{title || "No things Yet"}</EmptyTitle>
        <EmptyDescription>
          {description || "You haven't created any things yet. Get started by creating your first thing."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        {btns}
      </EmptyContent>
      {linkBtn}
    </Empty>
  )
}

