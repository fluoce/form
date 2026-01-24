
import clsx from "clsx";

interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
};

export function BlueSpinner({ size = "md", className }: SpinnerProps) {
    return (
        <div
            aria-label="Loading"
            role="status"
            className={clsx(
                "animate-spin rounded-full border-muted border-t-primary",
                sizeMap[size],
                className
            )}
        />
    );
}