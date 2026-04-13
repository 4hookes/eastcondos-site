"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineStepProps {
    number: number;
    title: string;
    description: string;
    imagePlaceholder?: string;
    isLast?: boolean;
    className?: string;
}

function TimelineStep({
    number,
    title,
    description,
    imagePlaceholder,
    isLast = false,
    className,
}: TimelineStepProps) {
    return (
        <div className={cn("flex gap-6", className)}>
            {/* Left column: number circle + connecting line */}
            <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-amber text-white font-bold text-lg flex items-center justify-center">
                    {number}
                </div>
                {!isLast && (
                    <div className="w-0.5 bg-amber/30 flex-grow mt-2 min-h-[2rem]" />
                )}
            </div>

            {/* Right column: content */}
            <div className={cn("pb-10", isLast && "pb-0")}>
                <h3 className="text-xl font-serif text-charcoal mt-2">{title}</h3>
                <p className="text-base text-gray-600 mt-2 leading-relaxed">
                    {description}
                </p>
                {imagePlaceholder && (
                    <div className="w-full h-44 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-sm mt-4">
                        {imagePlaceholder}
                    </div>
                )}
            </div>
        </div>
    );
}

export { TimelineStep };
export type { TimelineStepProps };
