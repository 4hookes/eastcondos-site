import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "glass" | "glass-dark" }
>(({ className, variant = "default", ...props }, ref) => {
    const variantStyles = {
        default:
            "bg-white shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300",
        glass:
            "bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl",
        "glass-dark":
            "bg-charcoal/90 backdrop-blur-lg border border-white/10 text-white rounded-2xl",
    };

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-300",
                variantStyles[variant],
                className
            )}
            {...props}
        />
    );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-serif font-normal leading-none tracking-tight text-charcoal",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-base text-gray-600 mt-2 leading-relaxed", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
