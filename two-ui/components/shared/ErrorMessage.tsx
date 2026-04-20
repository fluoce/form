import { cn } from "@/lib/utils";

const ErrorMessage = ({
  error,
  className,
}: {
  error: string;
  className?: string;
}) => {
  return error ? (
    <p className={cn("text-xs font-medium break-all text-red-500", className)}>
      {error}
    </p>
  ) : null;
};

export default ErrorMessage;
