import { FormThemeType } from "@/types/form-types"

type ThemeDataType = {
  name: string
  theme: FormThemeType
  color: string
}

export const THEME_DATA: ThemeDataType[] = [
  {
    name: "Default",
    color: "#fff",
    theme: "DEFAULT",
  },
  {
    name: "Amber",
    color: "#BB4D00",
    theme: "AMBER",
  },
  {
    name: "Blue",
    color: "#1447E6",
    theme: "BLUE",
  },
  {
    name: "Cyan",
    color: "#007595",
    theme: "CYAN",
  },
  {
    name: "Emerald",
    color: "#007A55",
    theme: "EMERALD",
  },
  {
    name: "Fuchsia",
    color: "#A800B7",
    theme: "FUCHSIA",
  },
  {
    name: "Green",
    color: "#497D00",
    theme: "GREEN",
  },
  {
    name: "Indigo",
    color: "#432DD7",
    theme: "INDIGO",
  },
  {
    name: "Lime",
    color: "#7CCF00",
    theme: "LIME",
  },
  {
    name: "Orange",
    color: "#CA3500",
    theme: "ORANGE",
  },
  {
    name: "Pink",
    color: "#C6005C",
    theme: "PINK",
  },
  {
    name: "Purple",
    color: "#8200DB",
    theme: "PURPLE",
  },
  {
    name: "Red",
    color: "#C10007",
    theme: "RED",
  },
  {
    name: "Rose",
    color: "#C60036",
    theme: "ROSE",
  },
  {
    name: "Sky",
    color: "#0069A8",
    theme: "SKY",
  },
  {
    name: "Teal",
    color: "#00786F",
    theme: "TEAL",
  },
  {
    name: "Violet",
    color: "#7008E7",
    theme: "VIOLET",
  },
  {
    name: "Yellow",
    color: "#FDC700",
    theme: "YELLOW",
  },
]
