"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    value: string;
    label: string;
    accentChar?: string;
    className?: string;
}

function renderValue(value: string, accentChar?: string): React.ReactNode {
    if (!accentChar || !value.includes(accentChar)) {
        return value;
    }

    const index = value.lastIndexOf(accentChar);
    const before = value.slice(0, index);
    const accent = value.slice(index, index + accentChar.length);
    const after = value.slice(index + accentChar.length);

    return (
        <>
            {before}
            <span className="text-amber">{accent}</span>
            {after}
        </>
    );
}

function StatCard({ value, label, accentChar, className }: StatCardProps) {
    return (
        <div className={cn("flex flex-col items-center text-center p-6", className)}>
            <span className="text-5xl font-sans font-bold text-charcoal leading-none tracking-[-0.02em]">
                {renderValue(value, accentChar)}
            </span>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mt-2">
                {label}
            </span>
        </div>
    );
}

export { StatCard };
export type { StatCardProps };
