import { Heading, TextAlignStart } from "lucide-react"
import { ReactElement } from "react"

type BaseDataType = {
  name: string
  type: "title" | "description"
  color: string
  icon: ReactElement
}

export const BASE_DATA: BaseDataType[] = [
  {
    name: "Form Title",
    type: "title",
    color: "#7008E7",
    icon: <Heading size={16} />,
  },
  {
    name: "Form Description",
    type: "description",
    color: "#00786F",
    icon: <TextAlignStart size={16} />,
  },
]
