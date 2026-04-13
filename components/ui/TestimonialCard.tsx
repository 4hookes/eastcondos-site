import * as React from "react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
    quote: string;
    name: string;
    context: string;
    initials: string;
    className?: string;
}

function TestimonialCard({
    quote,
    name,
    context,
    initials,
    className,
}: TestimonialCardProps) {
    return (
        <div
            className={cn(
                "relative rounded-2xl p-8",
                "bg-white border border-gray-100 border-l-4 border-l-amber",
                "shadow-[0_4px_20px_rgb(0,0,0,0.06)]",
                "hover:-translate-y-1 hover:shadow-lg transition-all duration-300",
                className
            )}
        >
            {/* Decorative quote mark */}
            <span
                aria-hidden="true"
                className="absolute top-4 right-6 text-6xl text-amber/20 font-serif leading-none select-none"
            >
                &ldquo;
            </span>

            {/* Quote text */}
            <blockquote className="text-lg text-gray-700 italic leading-relaxed relative">
                {quote}
            </blockquote>

            {/* Footer */}
            <footer className="flex items-center gap-3 mt-6">
                <div
                    className="w-10 h-10 rounded-full bg-charcoal text-white text-sm font-semibold flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                >
                    {initials}
                </div>
                <div>
                    <p className="font-semibold text-charcoal leading-tight">{name}</p>
                    <p className="text-sm text-gray-500">{context}</p>
                </div>
            </footer>
        </div>
    );
}

export { TestimonialCard };
export type { TestimonialCardProps };
