import { FileText } from "lucide-react"
import { CEmpty } from "../custom/CEmpty"
import { Button } from "../ui/button"
import { CreateWorkspace } from "./CreateWorkspace"

export const NoWorkspace = () => {
    return (
        <CEmpty
            title="No Workspace yet"
            description="You haven't created any workspaces yet. Get started by creating your first workspace."
            btns={
                <div className="flex gap-2 items-center flex-wrap justify-center">
                    <Button variant="secondary">
                        <FileText />
                        Documentation
                    </Button>
                    <CreateWorkspace />
                </div>
            }

        />
    )
}