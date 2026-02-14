"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      offset={80}
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:!rounded-full group-[.toaster]:!px-5 group-[.toaster]:!py-2.5 group-[.toaster]:!w-fit group-[.toaster]:!min-w-0 group-[.toaster]:mx-auto group-[.toaster]:!max-w-[85vw] group-[.toaster]:flex group-[.toaster]:items-center group-[.toaster]:justify-center group-[.toaster]:gap-2 group-[.toaster]:!font-medium group-[.toaster]:!text-sm",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:!rounded-full",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:!rounded-full",
          success: "group-[.toaster]:!bg-green-600 group-[.toaster]:!text-white group-[.toaster]:!border-none",
          error: "group-[.toaster]:!bg-red-600 group-[.toaster]:!text-white group-[.toaster]:!border-none",
          info: "group-[.toaster]:!bg-blue-600 group-[.toaster]:!text-white group-[.toaster]:!border-none",
          warning: "group-[.toaster]:!bg-orange-500 group-[.toaster]:!text-white group-[.toaster]:!border-none",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "9999px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
