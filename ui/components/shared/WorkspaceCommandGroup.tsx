import useWorkspace from '@/hooks/use-workspace'
import { CommandGroup, CommandItem, CommandShortcut } from '../ui/command';
import { Settings, Square } from 'lucide-react';
import { workspaceRoutes } from '@/const/route-const';
import { useRouter } from 'next/navigation';

const WorkspaceCommandGroup = ({ setShowCommand }: { setShowCommand: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const router = useRouter()

    const { workspaces } = useWorkspace()

    const { data } = workspaces

    const workspaceList = data?.data?.workspaces ?? [];

    if (!workspaceList || workspaceList.length == 0) {
        return null
    }

    return (
        <CommandGroup heading="Workspaces">
            {workspaceList.map((w) => (
                <CommandItem
                    key={w.id}
                    onSelect={() => {
                        router.push(workspaceRoutes.setting(w.id, 'general'))
                        setShowCommand(false)
                    }}>
                    <Square className='text-primary' />
                    <span>{w.name}</span>
                    <CommandShortcut>
                        <Settings />
                    </CommandShortcut>
                </CommandItem>
            ))}
        </CommandGroup>
    )
}

export default WorkspaceCommandGroup