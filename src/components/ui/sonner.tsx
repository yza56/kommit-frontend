import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, XIcon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      offset={{ top: 100, right: 32 }}
      mobileOffset={{ top: 88, right: 16, left: 16 }}
      closeButton
      icons={{
        success: <CircleCheckIcon className="size-6" />,
        close: <XIcon className="size-6" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "w-fit! gap-2! rounded-lg! border-success! bg-success-bg! px-6! py-3! font-sans text-base! font-semibold! text-success!",
          icon: "m-0! size-6! text-success",
          closeButton:
            "static! order-last ml-4 size-6! translate-x-0! translate-y-0! border-0! bg-transparent! p-0! text-success!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
