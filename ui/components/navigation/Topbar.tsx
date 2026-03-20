"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useKeyPress } from "@/hooks/use-keyPress";
import { ReactNode, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CKbd } from "../custom/CKbd";
import WorkspaceCommandGroup from "../shared/WorkspaceCommandGroup";
import FormCommandGroup from "../shared/FormCommandGroup";
import { SidebarTrigger } from "../ui/sidebar";
import DocsCommand from "../shared/DocsCommand";

const Topbar = ({ children }: { children?: ReactNode }) => {
  const [showCommand, setShowCommand] = useState(false);

  useKeyPress("/", () => {
    setShowCommand(true);
  });

  return (
    <div className="sticky top-0 flex w-full">
      <div className="flex w-full items-center justify-between py-1 pr-1">
        <SidebarTrigger />
        {children}
        <Button
          onClick={() => setShowCommand(true)}
          variant="ghost"
          className="text-zinc-500"
        >
          <Search />
          Search
          <CKbd>/</CKbd>
        </Button>
        <Commands showCommand={showCommand} setShowCommand={setShowCommand} />
      </div>
    </div>
  );
};

export default Topbar;

const Commands = ({
  showCommand,
  setShowCommand,
}: {
  showCommand: boolean;
  setShowCommand: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <CommandDialog open={showCommand} onOpenChange={setShowCommand}>
      <Command className="max-w-sm rounded-lg border">
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <WorkspaceCommandGroup setShowCommand={setShowCommand} />
          <FormCommandGroup setShowCommand={setShowCommand} />
          <DocsCommand setShowCommand={setShowCommand} />
        </CommandList>
      </Command>
    </CommandDialog>
  );
};
