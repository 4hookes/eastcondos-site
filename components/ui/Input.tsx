import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-navy ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-gold focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
