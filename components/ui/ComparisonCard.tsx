import * as React from "react";
import { cn } from "@/lib/utils";

interface ComparisonItem {
    label: string;
    value: string;
}

interface ComparisonCardProps {
    variant: "muted" | "highlighted";
    title: string;
    items: ComparisonItem[];
    className?: string;
}

function ComparisonCard({ variant, title, items, className }: ComparisonCardProps) {
    const isMuted = variant === "muted";

    return (
        <div
            className={cn(
                "rounded-2xl p-8",
                isMuted
                    ? "bg-charcoal text-white/80"
                    : "bg-white border border-gray-100 shadow-lg",
                className
            )}
        >
            {/* Title */}
            {isMuted ? (
                <h3 className="text-2xl font-serif text-white/60 mb-8">{title}</h3>
            ) : (
                <div className="mb-8">
                    <h3 className="text-2xl font-serif text-charcoal inline-block">
                        {title}
                    </h3>
                    <div className="h-0.5 w-12 bg-amber mt-2" />
                </div>
            )}

            {/* Items */}
            <ul className="space-y-0">
                {items.map((item, index) => {
                    const isLastItem = index === items.length - 1;
                    return (
                        <li
                            key={index}
                            className={cn(
                                "pb-4 mb-4",
                                !isLastItem &&
                                    (isMuted
                                        ? "border-b border-white/10"
                                        : "border-b border-gray-100"),
                                isLastItem && "pb-0 mb-0"
                            )}
                        >
                            <p
                                className={cn(
                                    "text-xs uppercase tracking-wider mb-1",
                                    isMuted ? "text-white/40" : "text-amber"
                                )}
                            >
                                {item.label}
                            </p>
                            <p
                                className={cn(
                                    isMuted
                                        ? "text-base text-white/80"
                                        : "text-lg font-medium text-charcoal"
                                )}
                            >
                                {item.value}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export { ComparisonCard };
export type { ComparisonCardProps, ComparisonItem };
