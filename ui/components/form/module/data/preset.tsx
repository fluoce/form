import {
  ChevronLast,
  GalleryHorizontalEnd,
  MapPinHouse,
  SquareUserRound,
} from "lucide-react"
import { ReactElement } from "react"

type PresetType = "welcom" | "end" | "contact" | "address"

type PresetDataType = {
  name: string
  type: PresetType
  icon: ReactElement
  color: string
}

export const PRESET_DATA: PresetDataType[] = [
  {
    name: "Welcom Screen",
    type: "welcom",
    icon: <GalleryHorizontalEnd size={16} />,
    color: "#8200DB",
  },
  {
    name: "Thanks (end screen)",
    type: "end",
    icon: <ChevronLast size={16} />,
    color: "#C10007",
  },
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
