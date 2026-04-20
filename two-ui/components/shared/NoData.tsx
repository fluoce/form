import { ArrowUpLeft, Ban } from "lucide-react";
import { CEmpty } from "../custom/CEmpty";
import Link from "next/link";
import { Button } from "../ui/button";
import { workspaceRoutes } from "@/const/route-const";
import { ReactNode } from "react";

type NoDataProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
};

export default function NoData({
  title = "Something went wrong",
  description = "There is currently no data to display. Please go back or try later.",
  icon = <Ban className="text-muted-foreground" />,
  actions = (
    <Link href={workspaceRoutes.create}>
      <Button>
        <ArrowUpLeft /> Go Home
      </Button>
    </Link>
  ),
}: NoDataProps) {
  return (
    <CEmpty
      icon={icon}
      title={title}
      description={description}
      btns={actions}
    />
  );
}
