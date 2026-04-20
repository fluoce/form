import { useState, useEffect } from "react";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Icon from "../shared/Icon";
import {
  FormThemeProvider,
  useFormTheme,
} from "@/providers/form-theme/form-theme-provider";
import {
  BASE_DATA,
  FIELD_DATA,
  FieldType,
  PRESET_DATA,
  THEME_DATA,
  ThemeFieldType,
} from "./FieldData";
import useFormField from "@/hooks/use-form-field";
import {
  useAppDispatch,
  useAppSelector,
} from "@/providers/redux/redux-provider";
import { addField } from "@/store/slice/form-slice";

type FieldTabs = "base" | "field" | "preset" | "theme";

export function FormFieldbarContent() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const searchParams = useSearchParams();

  const pathname = usePathname();

  const { formId } = useParams<{
    formId?: string;
  }>();

  const pageId = useAppSelector((state) => state.form.selectedPage);

  const tabFromQuery = (searchParams.get("tab") as FieldTabs) ?? "field";

  const [fieldTab, setFieldTab] = useState<FieldTabs>(tabFromQuery);

  const { createFormField } = useFormField();

  const { mutateAsync } = createFormField;

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
              <Field onClick={() => {}} key={f.name} field={f} />
            ))}
          </div>
        )}
        {fieldTab == "field" && (
          <div className="flex flex-col gap-4">
            {FIELD_DATA.map((f) => (
              <Field
                onClick={() => {
                  mutateAsync({
                    formId: formId ?? "",
                    formPageId: pageId,
                    body: {
                      config: {
                        label: f?.name,
                        //@ts-ignore
                        type: f?.type,
                      },
                    },
                  }).then((data) => {
                    if (!data || !data?.data?.formField) return;
                    dispatch(
                      addField({
                        pageId,
                        field: data?.data?.formField,
                      }),
                    );
                  });
                }}
                key={f.name}
                field={f}
              />
            ))}
          </div>
        )}
        {fieldTab == "preset" && (
          <div className="flex flex-col gap-4">
            {PRESET_DATA.map((f) => (
              <Field onClick={() => {}} key={f.name} field={f} />
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

function Field({ field, onClick }: { field: FieldType; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
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
