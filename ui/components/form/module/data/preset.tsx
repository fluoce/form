import { FormPagePresetType } from "@/types/form-types"
import {
  ChevronLast,
  GalleryHorizontalEnd,
  MapPinHouse,
  SquareUserRound,
} from "lucide-react"
import { ReactElement } from "react"

type PresetDataType = {
  name: string
  type: FormPagePresetType
  icon: ReactElement
  color: string
}

export const PRESET_DATA: PresetDataType[] = [
  // {
  //   name: "Welcome Screen",
  //   type: "welcome",
  //   icon: <GalleryHorizontalEnd size={16} />,
  //   color: "#8200DB",
  // },
  // {
  //   name: "Thanks (end screen)",
  //   type: "thanks",
  //   icon: <ChevronLast size={16} />,
  //   color: "#C10007",
  // },
  {
    name: "Contact",
    type: "contact",
    icon: <SquareUserRound size={16} />,
    color: "#C60036",
  },
  {
    name: "Address",
    type: "address",
    icon: <MapPinHouse size={16} />,
    color: "#0069A8",
  },
]
