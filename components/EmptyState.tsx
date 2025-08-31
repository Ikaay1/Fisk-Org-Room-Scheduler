import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

function EmptyState({
  title,
  description,
  variant = "base",
}: {
  title: string;
  description: string;
  variant?: "base" | "warn";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 text-center space-y-2",
        variant === "warn" &&
          "border-amber-500/40 bg-amber-50/40 dark:bg-amber-950/10"
      )}
    >
      <div className="flex justify-center">
        <CalendarDays className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default EmptyState;
