import type { WorkspacePlan } from "@/types/slice";
import { Badge } from "@/components/ui/badge";

const PLAN_BADGE_CONFIG: Record<
    WorkspacePlan,
    {
        label: string;
        className: string;
    }
> = {
    STARTER: {
        label: "Starter",
        className:
            "bg-zinc-100 text-zinc-800 border border-zinc-300 " +
            "dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700",
    },
    PLUS: {
        label: "Plus",
        className:
            "bg-amber-100 text-amber-800 border border-amber-300 " +
            "dark:bg-amber-900 dark:text-amber-100 dark:border-amber-700",
    },
    PRO: {
        label: "Pro",
        className:
            "bg-blue-100 text-blue-800 border border-blue-300 " +
            "dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
    },
    PREMIUM: {
        label: "Premium",
        className:
            "bg-purple-100 text-purple-800 border border-purple-300 " +
            "dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700",
    },
    ENTERPRISE: {
        label: "Enterprise",
        className:
            "bg-green-100 text-green-800 border border-green-300 " +
            "dark:bg-green-900 dark:text-green-100 dark:border-green-700",
    },
};


export function PlanBadge({ plan }: { plan: WorkspacePlan }) {
    const config = PLAN_BADGE_CONFIG[plan];

    return (
        <Badge
            variant="outline"
            className={`text-[9px] h-4 font-medium ${config.className}`}
        >
            {config.label}
        </Badge>
    );
}