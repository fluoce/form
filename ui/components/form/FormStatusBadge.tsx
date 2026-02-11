import { FormStatus } from "@/types/slice"
import { Badge } from "../ui/badge"

export const FormStatusBadge = ({ status }: { status: FormStatus }) => {
    return (
        <Badge variant={status == 'PUBLISHED' ? 'default' : status == 'DRAFT' ? 'secondary' : 'outline'} className="text-[9px]">
            {status}
        </Badge>
    )
}