import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "amber" | "amber-outline" | "charcoal";

interface BadgeProps {
    variant?: BadgeVariant;
    className?: string;
    children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
    amber: "bg-amber text-white text-xs font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full",
    "amber-outline":
        "border border-amber text-amber text-xs font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full",
    charcoal:
        "bg-charcoal text-white text-xs font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full",
};

function Badge({ variant = "amber-outline", className, children }: BadgeProps) {
    return (
        <span className={cn("inline-block", variantStyles[variant], className)}>
            {children}
        </span>
    );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
