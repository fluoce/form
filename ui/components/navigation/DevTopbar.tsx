"use client"

import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { useKeyPress } from "@/hooks/use-keyPress";
import { useState } from "react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"

const DevTopbar = () => {

    const [showCommand, setShowCommand] = useState(false)

    useKeyPress("/", () => {
        setShowCommand(true)
    });


    return (
        <div className="w-full h-10 p-2 flex items-center justify-between">
            <i></i>
            <Button onClick={() => setShowCommand(true)} variant="ghost">
                <Search /> Search <Kbd>/</Kbd>
            </Button>
            <CommandDialog open={showCommand} onOpenChange={setShowCommand}>
                <Command className="max-w-sm rounded-lg border">
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem>
                                <Calendar />
                                <span>Calendar</span>
                            </CommandItem>
                            <CommandItem>
                                <Smile />
                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem disabled>
                                <Calculator />
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>
                                <User />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <CreditCard />
                                <span>Billing</span>
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <Settings />
                                <span>Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>

        </div>
    )
}

export default DevTopbar

