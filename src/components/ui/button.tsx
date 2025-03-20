import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shadow-[0_4px_10px_rgba(0,0,0,0.25)]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        icon: "",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[43px] rounded-[15px] text-base px-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-[52px] rounded-[15px] text-[20px] px-4",
        icon: "h-10 w-10",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };


// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary-button",
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",

//         "gradient-primary":
//           "bg-gradient-to-r from-[#B886FF] to-[#684082] shadow-[0_4px_10px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_5px_rgba(0,0,0,0.25)] transition-all duration-200 hover:transform-y-10",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-primary-button",
//         accent:
//           "bg-accent text-accent-foreground hover:bg-accent/80 shadow-primary-button",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         icon: "",
//         "v2-secondary":
//           "bg-v2-secondary-1 text-v2-primary-1001 hover:bg-v2-secondary-1/80",
//         "v2-accent": "bg-v2-accent text-v2-primary-1001 hover:bg-v2-accent/80",
//         "v2-secondary-outline":
//           "bg-transparent border border-v2-secondary-1 text-v2-secondary-1 hover:bg-v2-secondary-1/80 hover:text-v2-neutral-1001",

//         "v2-primary":
//           "bg-v2-primary-1008 text-v2-primary-1001 hover:bg-v2-primary-1008/80",
//         link: "text-primary underline-offset-4 hover:underline",
//         menu: "bg-gray-dark text-gray-foreground",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         xs: "h-[29px] rounded-lg py-1 px-3 text-xs font-normal",
//         sm: "h-9 rounded-md px-3",
//         md: "h-11 rounded-lg text-xs font-medium px-3",
//         lg: "h-12 rounded-2xl text-base px-8",
//         icon: "h-10 w-10",
//       },
//     },
//   },
// );


