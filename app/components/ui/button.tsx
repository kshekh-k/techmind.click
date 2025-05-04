import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        success: "bg-green-600 text-white hover:bg-green-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
        blue: "bg-blue-600 text-white hover:bg-blue-700",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
        red: "bg-red-500 text-white hover:bg-red-600",
        purple: "bg-purple-600 text-white hover:bg-purple-700",
        gray: "bg-gray-500 text-white hover:bg-gray-600",
        orange: "bg-orange-500 text-white hover:bg-orange-600",
        pink: "bg-pink-500 text-white hover:bg-pink-600",
        teal: "bg-teal-500 text-white hover:bg-teal-600",
        lime: "bg-lime-500 text-black hover:bg-lime-600",
        cyan: "bg-cyan-500 text-white hover:bg-cyan-600",
        amber: "bg-amber-500 text-black hover:bg-amber-600",
        indigo: "bg-indigo-600 text-white hover:bg-indigo-700",
        rose: "bg-rose-500 text-white hover:bg-rose-600",
        sky: "bg-sky-500 text-white hover:bg-sky-600",
        violet: "bg-violet-600 text-white hover:bg-violet-700",
        emerald: "bg-emerald-500 text-white hover:bg-emerald-600",
        outlineSuccess: "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
        outlineDanger: "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
        outlineBlue: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        outlineWarning: "border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black",
        outlineRed: "border border-red-500 text-red-600 hover:bg-red-500 hover:text-white",
        outlinePurple: "border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white",
        outlineGray: "border border-gray-500 text-gray-600 hover:bg-gray-500 hover:text-white",
        outlineOrange: "border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white",
        outlinePink: "border border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white",
        outlineTeal: "border border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white",
        outlineLime: "border border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-black",
        outlineCyan: "border border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white",
        outlineAmber: "border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-black",
        outlineIndigo: "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white",
        outlineRose: "border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white",
        outlineSky: "border border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white",
        outlineViolet: "border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white",
        outlineEmerald: "border border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
