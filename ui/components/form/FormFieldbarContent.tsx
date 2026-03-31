import React, { useState, useEffect } from "react";
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
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Icon from "../shared/Icon";
import {
  FormThemeProvider,
  useFormTheme,
} from "@/providers/form-theme/form-theme-provider";

type FieldTabs = "base" | "field" | "preset" | "theme";

type FieldType = {
  name: string;
  icon: LucideIcon;
  iconColor?: string;
  bg?: string;
};

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

type ThemeFieldType = {
  name: string;
  color: string;
  class: ThemeClass;
};
const BASE_DATA: FieldType[] = [
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

const FIELD_DATA: FieldType[] = [
  {
    name: "Short Text",
    icon: Minus,
    iconColor: "text-amber-500",
    bg: "bg-amber-500/2",
  },
  {
    name: "Long Text",
    icon: ChartNoAxesGantt,
    iconColor: "text-blue-500",
    bg: "bg-blue-500/2",
  },
  {
    name: "Email",
    icon: AtSign,
    iconColor: "text-cyan-500",
    bg: "bg-cyan-500/2",
  },
  {
    name: "Number",
    icon: Hash,
    iconColor: "text-emerald-500",
    bg: "bg-emerald-500/2",
  },
  {
    name: "Phone Number",
    icon: Phone,
    iconColor: "text-fuchsia-500",
    bg: "bg-fuchsia-500/2",
  },
  {
    name: "Url",
    icon: Link,
    iconColor: "text-green-500",
    bg: "bg-green-500/2",
  },
  {
    name: "Date",
    icon: CalendarDays,
    iconColor: "text-indigo-500",
    bg: "bg-indigo-500/2",
  },
  {
    name: "Dropdown",
    icon: ChevronDown,
    iconColor: "text-lime-500",
    bg: "bg-lime-500/2",
  },
  {
    name: "Radio",
    icon: Circle,
    iconColor: "text-orange-500",
    bg: "bg-orange-500/2",
  },
  {
    name: "Checkbox",
    icon: Square,
    iconColor: "text-pink-500",
    bg: "bg-pink-500/2",
  },
];

const PRESET_DATA: FieldType[] = [
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

const THEME_DATA: ThemeFieldType[] = [
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
    color: "#497D00",
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

export function FormFieldbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const tabFromQuery = (searchParams.get("tab") as FieldTabs) ?? "field";
  const [fieldTab, setFieldTab] = useState<FieldTabs>(tabFromQuery);
  useEffect(() => {
    if (tabFromQuery !== fieldTab) {
      setFieldTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const handleTabChange = (value: string) => {
    setFieldTab(value as FieldTabs);
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      <Tabs value={fieldTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="base">Base</TabsTrigger>
          <TabsTrigger value="field">Field</TabsTrigger>
          <TabsTrigger value="preset">Preset</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="scrollbar-hide h-full overflow-x-hidden overflow-y-auto pb-4">
        {fieldTab == "base" && (
          <div className="flex flex-col gap-4">
            {BASE_DATA.map((f) => (
              <Field key={f.name} field={f} />
            ))}
          </div>
        )}
        {fieldTab == "field" && (
          <div className="flex flex-col gap-4">
            {FIELD_DATA.map((f) => (
              <Field key={f.name} field={f} />
            ))}
          </div>
        )}
        {fieldTab == "preset" && (
          <div className="flex flex-col gap-4">
            {PRESET_DATA.map((f) => (
              <Field key={f.name} field={f} />
            ))}
          </div>
        )}
        {fieldTab == "theme" && (
          <div className="flex flex-col gap-4">
            {THEME_DATA.map((f) => (
              <ThemeField key={f.name} field={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ field }: { field: FieldType }) {
  return (
    <div
      className={cn(
        "text-muted-foreground hover:text-secondary-foreground smooth flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-2 text-sm hover:shadow active:scale-98",
        field.bg,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="bg-background flex items-center justify-center rounded-md border p-1">
          <Icon className={field?.iconColor} icon={field?.icon} size={16} />
        </div>
        <span className="line-clamp-1">{field?.name}</span>
      </div>
    </div>
  );
}

function ThemeField({ field }: { field: ThemeFieldType }) {
  const { setTheme } = useFormTheme();

  return (
    <FormThemeProvider>
      <div
        onClick={() => {
          setTheme(field?.class);
        }}
        className={cn(
          "text-muted-foreground hover:text-secondary-foreground smooth flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-2 text-sm hover:shadow active:scale-98",
        )}
        style={{
          backgroundColor: field?.color
            ? `rgba(${parseInt(field.color.slice(1, 3), 16)}, ${parseInt(field.color.slice(3, 5), 16)}, ${parseInt(field.color.slice(5, 7), 16)}, 0.1)`
            : undefined,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-md border",
            )}
            style={{
              backgroundColor: `${field?.color}`,
            }}
          ></div>
          <span className="line-clamp-1">{field?.name}</span>
        </div>
      </div>
    </FormThemeProvider>
  );
}
