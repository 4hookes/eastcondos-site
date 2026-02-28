import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-gold text-white hover:bg-gold-light shadow-md hover:shadow-lg",
                secondary: "bg-navy text-white hover:bg-navy/90 shadow-md",
                outline:
                    "border-2 border-navy text-navy bg-transparent hover:bg-navy hover:text-white",
                ghost: "hover:bg-navy/10 text-navy",
                link: "text-navy underline-offset-4 hover:underline",
                premium: "bg-gradient-to-r from-navy to-slate-900 text-white shadow-lg hover:shadow-xl border border-white/10",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-14 rounded-lg px-8 text-base",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
