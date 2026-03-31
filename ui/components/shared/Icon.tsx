import { cn } from "@/lib/utils";
import { ComponentType } from "react";

interface IconProps {
  icon: ComponentType<any>;
  className?: string;
  size?: number;
}

const Icon = ({ icon: IconComp, className, size = 20 }: IconProps) => {
  return (
    <i
      className={cn("text-muted-foreground", className)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconComp size={size} />
    </i>
  );
};

export default Icon;
