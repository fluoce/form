"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useSize } from "@/hooks/use-size";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { TextCursorInput } from "lucide-react";

type FieldTabs = "preset" | "field";

const FormFieldbar = () => {
  const isMobile = useSize(860);

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild className="absolute top-1 left-1">
          <Button size="icon">
            <TextCursorInput />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Add Field or Preset</SheetTitle>
            <SheetDescription>
              Choose from ready-made presets or field types, or create your own
              custom fields for your form.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <FormFieldbarContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="flex h-full w-70 flex-col gap-8 border-r p-4">
      <FormFieldbarContent />
    </div>
  );
};

export default FormFieldbar;

function FormFieldbarContent() {
  const [fieldTab, setFieldTab] = useState<FieldTabs>("field");

  return (
    <Tabs
      value={fieldTab}
      onValueChange={(value) => setFieldTab(value as FieldTabs)}
      className="w-full"
    >
      <TabsList className="w-full">
        <TabsTrigger value="field">Field</TabsTrigger>
        <TabsTrigger value="preset">Preset</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
