import { cn } from "@/lib/utils";
import { Check, Ellipsis } from "lucide-react";
import React, { FC } from "react";

type Props = {
  numberOfSteps: number;
  currentStep: number;
  labels: string[];
  className?: string;
};

const StepBullets: FC<Props> = ({
  currentStep,
  numberOfSteps,
  className,
  labels,
}) => {
  return (
    <div className={cn("flex w-full items-center", className)}>
      {Array(numberOfSteps)
        .fill(0)
        .map((_, index) => (
          <React.Fragment key={index}>
            <StepBullet
              active={index + 1 <= currentStep}
              current={index + 1 === currentStep}
              label={labels && labels[index] ? labels[index] : undefined}
            />
            {index + 1 < numberOfSteps ? (
              <div
                className={`h-[2px] min-w-4 flex-shrink-0 flex-grow shadow-[0_4px_8px_rgba(0,0,0,0.25)] ${
                  index + 1 < currentStep ? "bg-accent" : "bg-secondary"
                }`}
              ></div>
            ) : null}
          </React.Fragment>
        ))}
    </div>
  );
};

type StepBulletPropsType = {
  current: boolean;
  active: boolean;
  label?: string;
};
const StepBullet: FC<StepBulletPropsType> = ({ active, current, label }) => (
  <div className="relative">
    <div
      className={`flex size-[18px] items-center justify-center rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:size-7 text-background ${
        active ? "bg-accent" : "bg-secondary"
      }`}
    >
      {active && current ? (
        <Ellipsis className="size-[10px] lg:size-3" />
      ) : active ? (
        <Check className="size-[10px] lg:size-3" />
      ) : null}
    </div>
    {!!label && (
      <span
        className={`absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap ${
          active ? "text-accent" : "text-gray-very-dark"
        }`}
      >
        {label || ""}
      </span>
    )}
  </div>
);

export default StepBullets;
