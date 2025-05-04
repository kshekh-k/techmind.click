import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-600",
        danger: "bg-red-600",
        blue: "bg-blue-600",
        warning: "bg-yellow-500",
        red: "bg-red-500",
        purple: "bg-purple-600",
        gray: "bg-gray-500",
        orange: "bg-orange-500",
        pink: "bg-pink-500",
        teal: "bg-teal-500",
        lime: "bg-lime-500",
        cyan: "bg-cyan-500",
        amber: "bg-amber-500",
        indigo: "bg-indigo-600",
        rose: "bg-rose-500",
        sky: "bg-sky-500",
        violet: "bg-violet-600",
        emerald: "bg-emerald-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  VariantProps<typeof progressVariants> { }

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressVariants({ variant }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }