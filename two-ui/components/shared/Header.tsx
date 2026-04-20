import { ReactElement } from "react";

export const Header = ({
  type,
  title,
  icon,
}: {
  type?: string;
  title: string;
  icon?: ReactElement;
}) => {
  return (
    <div className="w-fit">
      <div className="text-muted-foreground flex items-center gap-2 text-3xl">
        {icon}
        <span className="truncate font-semibold">{title}</span>
      </div>
      <h1 className="text-muted-foreground truncate text-xs font-medium">
        {type}
      </h1>
    </div>
  );
};
