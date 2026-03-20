"use client";

import {
  ArrowLeft,
  DatabaseZap,
  Eye,
  FilePenLine,
  LucideIcon,
  Send,
  Settings,
  Share,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { formRoutes, workspaceRoutes } from "@/const/route-const";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Icon from "../shared/Icon";
import { formSettingTab } from "@/types/type";
import useForm from "@/hooks/use-form";
import NoData from "../shared/NoData";
import ProfileBtn from "../shared/ProfileBtn";
import { useSize } from "@/hooks/use-size";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";

type TbasType = {
  value: formSettingTab;
  lable: string;
  icon: LucideIcon;
};

const TABS: TbasType[] = [
  {
    value: "general",
    lable: "General",
    icon: Settings,
  },
  {
    value: "edit",
    lable: "Edit",
    icon: FilePenLine,
  },
  {
    value: "result",
    lable: "Result",
    icon: DatabaseZap,
  },
  {
    value: "share",
    lable: "Share",
    icon: Send,
  },
];

const FormEditTopbar = () => {
  const { formId, workspaceId } = useParams<{
    workspaceId: string;
    formId: string;
  }>();

  const { form } = useForm();

  const { data, isLoading, isError, error } = form(formId);

  const formData = data?.data?.form;

  return (
    <div className="flex h-[52px] items-center justify-between gap-2 border-b px-2">
      <div className="flex items-center gap-2">
        <Link href={workspaceRoutes.allForm(workspaceId)}>
          <Button variant="outline" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <Link
            className="text-muted-foreground smooth line-clamp-1 hover:text-blue-600 hover:underline"
            href={formRoutes.setting(workspaceId, formId, "general")}
          >
            {formData?.name || "Untitled"}
          </Link>
        )}
      </div>
      <div className={isLoading ? "pointer-events-none" : ""}>
        <FormMenuTabs />
      </div>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="size-9 rounded-full" />
        </div>
      ) : (
        <FormEditTopbarActionButton />
      )}
    </div>
  );
};

export default FormEditTopbar;

function FormMenuTabs() {
  const { formId, workspaceId } = useParams<{
    workspaceId: string;
    formId: string;
  }>();

  const pathname = usePathname();

  const currentTab = pathname.split("/").pop();

  const router = useRouter();

  const isMobile = useSize(660);

  if (isMobile) {
    return (
      <Select
        value={currentTab}
        onValueChange={(value: formSettingTab) =>
          router.push(formRoutes.setting(workspaceId, formId, value))
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Menu" />
        </SelectTrigger>
        <SelectContent>
          {TABS.map((tab) => (
            <SelectItem key={tab.value} value={tab.value}>
              <span className="flex items-center gap-2">
                <Icon icon={tab.icon} />
                {tab.lable}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Tabs value={currentTab}>
      <TabsList>
        {TABS.map((tab) => (
          <Link
            key={tab.value}
            href={formRoutes.setting(workspaceId, formId, tab.value)}
            passHref
          >
            <TabsTrigger value={tab.value} asChild>
              <span className="flex items-center gap-2">
                <Icon icon={tab.icon} />
                {tab.lable}
              </span>
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}

function FormEditTopbarActionButton() {
  const isMobile = useSize(760);

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <Button variant="outline" size={isMobile ? "icon" : "default"}>
          <Eye />
          {!isMobile && " Preview"}
        </Button>
        <Button size={isMobile ? "icon" : "default"}>
          <Share />
          {!isMobile && " Publish"}
        </Button>
      </div>
      <ProfileBtn onlyAvatar={true} />
    </div>
  );
}
