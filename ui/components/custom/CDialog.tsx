import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const CDialog = ({
  trigger,
  children,
  title,
  description,
  successBtnText,
  cancelBtnText,
  isLoading = false,
  onSuccess,
  onCancel,
  open,
  onOpenChange
}: {
  trigger: ReactNode;
  children?: ReactNode;
  title?: string;
  description?: string;
  successBtnText?: string;
  cancelBtnText?: string;
  isLoading?: boolean
  onSuccess?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open?: boolean;
  onOpenChange?: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div>
            <DialogTitle className="text-lg">{title}</DialogTitle>
            <DialogDescription className="text-xs">{description}</DialogDescription>
          </div>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCancel} variant="outline">
              {cancelBtnText || "Cancel"}
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            onClick={onSuccess}>
            {isLoading && <Spinner />}
            {successBtnText || "Done"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CDialog;
