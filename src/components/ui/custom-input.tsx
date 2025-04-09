import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, convertPersianToEnglish } from "@/lib/utils";
import { Icon } from "@iconify/react";

const inputVariants = cva(
  "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed aria-[invalid=true]:ring-destructive shadow-inputs-shadow disabled:bg-secondary disabled:text-white disabled:shadow-[3px_4px_6px_rgba(0,0,0,0.2)]",
  {
    variants: {
      variant: {
        default:
          "flex h-[43px] w-full rounded-[15px] bg-white px-3 py-2 text-sm placeholder:text-muted-foreground text-gray-very-dark ring-offset-ring",
        sm: "flex h-[29px] w-full rounded-[7px] bg-input pr-3 py-2 placeholder:text-gray-very-dark/60 text-[11px]  text-gray-very-dark/60 ring-offset-gray-very-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
  onIconClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  convertPersian?: boolean;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      icon,
      onIconClick,
      disabled,
      onChange,
      convertPersian = true,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (convertPersian) {
        const convertedValue = convertPersianToEnglish(event.target.value);
        event.target.value = convertedValue;
      }
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            inputVariants({ variant, className }),
            icon || disabled ? "pl-12" : variant === "default" ? "pl-5" : "pl-3"
          )}
          ref={ref}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        {disabled ? (
          <div className="absolute left-[14px] top-1/2 -translate-y-1/2 cursor-not-allowed">
            <Icon
              icon="majesticons:lock"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
        ) : icon ? (
          <div
            className="absolute left-[14px] top-1/2 -translate-y-1/2"
            onClick={onIconClick}
          >
            {icon}
          </div>
        ) : null}
      </div>
    );
  }
);
CustomInput.displayName = "CustomInput";

export { CustomInput, inputVariants };
