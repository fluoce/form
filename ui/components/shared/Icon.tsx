import { cn } from "@/lib/utils";
import { ComponentType } from "react";

const Icon = ({
  icon: IconComp,
  className,
}: {
  icon: ComponentType;
  className?: string;
}) => {
  return (
    <i className={cn("text-muted-foreground", className)}>
      <IconComp />
    </i>
  );
};

export default Icon;
