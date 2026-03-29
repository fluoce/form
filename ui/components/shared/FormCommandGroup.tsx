import useForm from "@/hooks/use-form";
import { CommandGroup, CommandItem, CommandShortcut } from "../ui/command";
import { Activity, Form } from "lucide-react";
import { formRoutes } from "@/const/route-const";
import { useRouter } from "next/navigation";

const FormCommandGroup = ({
  setShowCommand,
}: {
  setShowCommand: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { forms } = useForm();

  const { data } = forms;

  const formList = data?.data?.forms ?? [];

  if (!formList || formList.length == 0) {
    return null;
  }

  return (
    <CommandGroup heading="Selected Workspace's Forms">
      {formList.map((f) => (
        <CommandItem
          key={f.id}
          onSelect={() => {
            router.push(formRoutes.setting(f.workspaceId, f.id, "result"));
            setShowCommand(false);
          }}
        >
          <Form />
          <span>{f.name}</span>
          <CommandShortcut>
            <Activity />
          </CommandShortcut>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

export default FormCommandGroup;
