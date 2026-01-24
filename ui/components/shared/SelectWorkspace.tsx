"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { CreateWorkspace } from "./CreateWorkspace"

const SelectWorkspace = () => {

    const workspaces = false

    return (
        workspaces
            ?
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Workspace" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>
                        </SelectLabel>
                        <SelectItem value="-">two-workspace</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            :
            <CreateWorkspace />
    )
}

export default SelectWorkspace