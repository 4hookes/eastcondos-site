"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Background = "offwhite" | "white" | "charcoal" | "charcoal-gradient";

interface SectionWrapperProps {
    id?: string;
    background?: Background;
    className?: string;
    children: React.ReactNode;
    narrow?: boolean;
}

const backgroundStyles: Record<Background, string> = {
    offwhite: "bg-offwhite",
    white: "bg-white",
    charcoal: "bg-charcoal text-white",
    "charcoal-gradient": "bg-gradient-to-br from-charcoal to-charcoal-light text-white",
};

const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
    ({ id, background = "offwhite", className, children, narrow = false }, ref) => {
        return (
            <section
                ref={ref}
                id={id}
                className={cn(
                    "py-20 md:py-28",
                    backgroundStyles[background],
                    className
                )}
            >
                <div
                    className={cn(
                        "mx-auto px-5 sm:px-8",
                        narrow ? "max-w-4xl" : "max-w-7xl"
                    )}
                >
                    {children}
                </div>
            </section>
        );
    }
);
SectionWrapper.displayName = "SectionWrapper";

export { SectionWrapper };
export type { SectionWrapperProps, Background };
