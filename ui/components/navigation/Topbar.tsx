"use client"

import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { useKeyPress } from "@/hooks/use-keyPress";
import { useState } from "react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandList,
} from "@/components/ui/command"
import { CKbd } from "../custom/CKbd";
import WorkspaceCommandGroup from "../shared/WorkspaceCommandGroup";
import FormCommandGroup from "../shared/FormCommandGroup";
import { SidebarTrigger } from "../ui/sidebar";

const Topbar = () => {
    return (
        <div className="flex w-full sticky top-0 bg-background">
            <SidebarTrigger />
            <CTopbar />
        </div>
    )
}

export default Topbar

const CTopbar = () => {

    const [showCommand, setShowCommand] = useState(false)

    useKeyPress("/", () => {
        setShowCommand(true)
    });

    return (
        <div className="w-full h-10 p-2 flex items-center justify-between">
            <i></i>
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
    )
}

const Commands = ({ showCommand, setShowCommand }: { showCommand: boolean, setShowCommand: React.Dispatch<React.SetStateAction<boolean>> }) => {

    return (
        <CommandDialog open={showCommand} onOpenChange={setShowCommand}>
            <Command className="max-w-sm rounded-lg border">
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <WorkspaceCommandGroup setShowCommand={setShowCommand} />
                    <FormCommandGroup setShowCommand={setShowCommand} />
                </CommandList>
            </Command>
        </CommandDialog>
    )
}