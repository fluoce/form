"use client";

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
import { SquarePen } from "lucide-react";

const FormFieldEditbar = () => {
  const isMobile = useSize(1200);

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild className="absolute top-1 right-1">
          <Button size="icon">
            <SquarePen />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Customize Field</SheetTitle>
            <SheetDescription>
              Update properties, labels, and display options for your chosen
              field.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <FormFieldEditbarContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="flex h-full w-70 flex-col gap-8 border-l p-4">
      <FormFieldEditbarContent />
    </div>
  );
};

export default FormFieldEditbar;

function FormFieldEditbarContent() {
  return <div>FormFieldEditbar</div>;
}
