import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default:
                    "bg-amber text-white hover:bg-amber-light shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
                secondary:
                    "bg-charcoal text-white hover:bg-charcoal-light shadow-md hover:shadow-lg",
                outline:
                    "border-2 border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-white",
                ghost: "hover:bg-charcoal/10 text-charcoal",
                link: "text-charcoal underline-offset-4 hover:underline",
                premium:
                    "bg-gradient-to-r from-charcoal to-charcoal-light text-white border border-white/10 shadow-lg",
            },
            size: {
                default: "h-12 px-6 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-14 rounded-lg px-8 text-base",
                icon: "h-12 w-12",
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
