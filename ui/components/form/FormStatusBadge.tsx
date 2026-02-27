import { FormStatus } from "@/types/slice"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

export const FormStatusBadge = ({ status, className }: { status: FormStatus, className?: string }) => {
    return (
        <Badge variant={status == 'PUBLISHED' ? 'default' : status == 'DRAFT' ? 'secondary' : 'outline'} className={cn("text-[9px]", className)}>
            {status}
        </Badge>
    )
}