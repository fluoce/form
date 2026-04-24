import { FieldType } from "@/types/formfield-config-types"
import { ReactElement } from "react"
import {
  Minus,
  AlignLeft,
  Binary,
  Mail,
  Phone,
  Link,
  CalendarDays,
  ChevronDown,
  Square,
  Circle,
} from "lucide-react"

type FieldDataType = {
  name: string
  type: FieldType
  color: string
  icon: ReactElement
}

export const FIELD_DATA: FieldDataType[] = [
  {
    name: "Short Text",
    type: "text",
    color: "#BB4D00",
    icon: <Minus size={16} />,
  },
  {
    name: "Long Text",
    type: "textarea",
    color: "#1447E6",
    icon: <AlignLeft size={16} />,
  },
  {
    name: "Number",
    type: "number",
    color: "#007595",
    icon: <Binary size={16} />,
  },
  {
    name: "Email",
    type: "email",
    color: "#007A55",
    icon: <Mail size={16} />,
  },
  {
    name: "Phone",
    type: "phone",
    color: "#BB4D00",
    icon: <Phone size={16} />,
  },
  {
    name: "URL",
    type: "url",
    color: "#008235",
    icon: <Link size={16} />,
  },
  {
    name: "Date",
    type: "date",
    color: "#432DD7",
    icon: <CalendarDays size={16} />,
  },
  {
    name: "Dropdown",
    type: "dropdown",
    color: "#9AE600",
    icon: <ChevronDown size={16} />,
  },
  {
    name: "Radio",
    type: "radio",
    color: "#CA3500",
    icon: <Circle size={16} />,
  },
  {
    name: "Checkbox",
    type: "checkbox",
    color: "#C6005C",
    icon: <Square size={16} />,
  },
]
