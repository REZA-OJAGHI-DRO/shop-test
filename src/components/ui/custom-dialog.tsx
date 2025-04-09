"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const CustomDialog = DialogPrimitive.Root;

const CustomDialogTrigger = DialogPrimitive.Trigger;

const CustomDialogPortal = DialogPrimitive.Portal;

const CustomDialogClose = DialogPrimitive.Close;

const CustomDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-gray-very-dark/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
CustomDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CustomDialogPortal>
    <CustomDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[85%] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-[14px]  bg-foreground/25 backdrop-blur-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </CustomDialogPortal>
));
CustomDialogContent.displayName = DialogPrimitive.Content.displayName;

const CustomDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  ></div>
);
CustomDialogHeader.displayName = "CustomDialogHeader";

const CustomDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
CustomDialogFooter.displayName = "CustomDialogFooter";

interface CustomDialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  closeClassName?: string;
}

const CustomDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  CustomDialogTitleProps
>(({ className, children, closeClassName, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "flex items-center justify-between border-b border-foreground p-6 text-lg font-normal leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  >
    {children}
    <DialogPrimitive.Close
      className={cn(
        "rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground",
        closeClassName
      )}
    >
      <X className="h-5 w-5" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  </DialogPrimitive.Title>
));
CustomDialogTitle.displayName = DialogPrimitive.Title.displayName;

const CustomDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CustomDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  CustomDialog,
  CustomDialogPortal,
  CustomDialogOverlay,
  CustomDialogClose,
  CustomDialogTrigger,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogFooter,
  CustomDialogTitle,
  CustomDialogDescription,
};
