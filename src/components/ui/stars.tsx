import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarsProps = {
  value?: number;
  className?: string;
  size?: number;
  label?: string;
};

export function Stars({
  value = 5,
  className,
  size = 16,
  label,
}: StarsProps) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="img"
      aria-label={label ?? `Avaliação ${value} estrelas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          aria-hidden="true"
          className={cn(
            "fill-amber-400 text-amber-400",
            i >= Math.round(value) && "fill-slate-200 text-slate-200",
          )}
        />
      ))}
    </div>
  );
}