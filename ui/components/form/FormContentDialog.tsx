import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FormFieldbarContent } from "./FormFieldbarContent";

const FormContentDialog = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add Content to Form</DialogTitle>
          <DialogDescription>
            View all fields, presets, and base items. Add them to your form as
            needed.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
          <FormFieldbarContent />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormContentDialog;
