import {
  Heading,
  TextAlignStart,
  Minus,
  ChartNoAxesGantt,
  AtSign,
  Hash,
  Phone,
  Link,
  CalendarDays,
  ChevronDown,
  Circle,
  Square,
  SquareUser,
  Tv,
  ThumbsUp,
  LucideIcon,
} from "lucide-react";
import { FieldType as FT } from "@/types/formfield";

type ThemeClass =
  | "AMBER"
  | "BLUE"
  | "CYAN"
  | "EMERALD"
  | "FUCHSIA"
  | "GREEN"
  | "INDIGO"
  | "LIME"
  | "ORANGE"
  | "PINK"
  | "PURPLE"
  | "RED"
  | "ROSE"
  | "SKY"
  | "TEAL"
  | "VIOLET"
  | "YELLOW";

export type ThemeFieldType = {
  name: string;
  color: string;
  class: ThemeClass;
};

export type FieldType = {
  name: string;
  icon: LucideIcon;
  iconColor?: string;
  bg?: string;
  type?: FT;
};

export const BASE_DATA: FieldType[] = [
  {
    name: "Form Title",
    icon: Heading,
    iconColor: "text-violet-500",
    bg: "bg-violet-500/2",
  },
  {
    name: "Form Description",
    icon: TextAlignStart,
    iconColor: "text-teal-500",
    bg: "bg-teal-500/2",
  },
];

export const FIELD_DATA: FieldType[] = [
  {
    name: "Short Text",
    icon: Minus,
    iconColor: "text-amber-500",
    bg: "bg-amber-500/2",
    type: "text",
  },
  {
    name: "Long Text",
    icon: ChartNoAxesGantt,
    iconColor: "text-blue-500",
    bg: "bg-blue-500/2",
    type: "textarea",
  },
  {
    name: "Email",
    icon: AtSign,
    iconColor: "text-cyan-500",
    bg: "bg-cyan-500/2",
    type: "email",
  },
  {
    name: "Number",
    icon: Hash,
    iconColor: "text-emerald-500",
    bg: "bg-emerald-500/2",
    type: "number",
  },
  {
    name: "Phone Number",
    icon: Phone,
    iconColor: "text-fuchsia-500",
    bg: "bg-fuchsia-500/2",
    type: "phone",
  },
  {
    name: "Url",
    icon: Link,
    iconColor: "text-green-500",
    bg: "bg-green-500/2",
    type: "url",
  },
  {
    name: "Date",
    icon: CalendarDays,
    iconColor: "text-indigo-500",
    bg: "bg-indigo-500/2",
    type: "date",
  },
  {
    name: "Dropdown",
    icon: ChevronDown,
    iconColor: "text-lime-500",
    bg: "bg-lime-500/2",
    type: "dropdown",
  },
  {
    name: "Radio",
    icon: Circle,
    iconColor: "text-orange-500",
    bg: "bg-orange-500/2",
    type: "radio",
  },
  {
    name: "Checkbox",
    icon: Square,
    iconColor: "text-pink-500",
    bg: "bg-pink-500/2",
    type: "checkbox",
  },
];

export const PRESET_DATA: FieldType[] = [
  {
    name: "Contact Info",
    icon: SquareUser,
    iconColor: "text-purple-500",
    bg: "bg-purple-500/2",
  },
  {
    name: "Welcome Screen",
    icon: Tv,
    iconColor: "text-rose-500",
    bg: "bg-rose-500/2",
  },
  {
    name: "Thanks (End screen)",
    icon: ThumbsUp,
    iconColor: "text-sky-500",
    bg: "bg-sky-500/2",
  },
];

export const THEME_DATA: ThemeFieldType[] = [
  {
    name: "Amber",
    color: "#BB4D00",
    class: "AMBER",
  },
  {
    name: "Blue",
    color: "#1447E6",
    class: "BLUE",
  },
  {
    name: "Cyan",
    color: "#007595",
    class: "CYAN",
  },
  {
    name: "Emerald",
    color: "#007A55",
    class: "EMERALD",
  },
  {
    name: "Fuchsia",
    color: "#A800B7",
    class: "FUCHSIA",
  },
  {
    name: "Green",
    color: "#497D00",
    class: "GREEN",
  },
  {
    name: "Indigo",
    color: "#432DD7",
    class: "INDIGO",
  },
  {
    name: "Lime",
    color: "#7CCF00",
    class: "LIME",
  },
  {
    name: "Orange",
    color: "#CA3500",
    class: "ORANGE",
  },
  {
    name: "Pink",
    color: "#C6005C",
    class: "PINK",
  },
  {
    name: "Purple",
    color: "#8200DB",
    class: "PURPLE",
  },
  {
    name: "Red",
    color: "#C10007",
    class: "RED",
  },
  {
    name: "Rose",
    color: "#C60036",
    class: "ROSE",
  },
  {
    name: "Sky",
    color: "#0069A8",
    class: "SKY",
  },
  {
    name: "Teal",
    color: "#00786F",
    class: "TEAL",
  },
  {
    name: "Violet",
    color: "#7008E7",
    class: "VIOLET",
  },
  {
    name: "Yellow",
    color: "#FDC700",
    class: "YELLOW",
  },
];
