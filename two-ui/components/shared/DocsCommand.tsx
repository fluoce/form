import { useRouter } from "next/navigation";
import { CommandGroup, CommandItem, CommandShortcut } from "../ui/command";
import { docsRoutes } from "@/const/route-const";
import { ArrowUpRight, BookOpen } from "lucide-react";

const DocsCommand = ({
  setShowCommand,
}: {
  setShowCommand: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  return (
    <CommandGroup heading="Resources">
      <CommandItem
        onSelect={() => {
          router.push(docsRoutes.base);
          setShowCommand(false);
        }}
      >
        <BookOpen />
        <span>Documentation</span>
        <CommandShortcut>
          <ArrowUpRight />
        </CommandShortcut>
      </CommandItem>
    </CommandGroup>
  );
};

export default DocsCommand;
