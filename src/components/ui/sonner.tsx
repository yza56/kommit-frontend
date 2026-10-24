import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, XIcon } from "lucide-react"

// Desktop déduit de la maquette, mobile choisi par nous (pas de maquette en dessous de 1280 px).
const DESKTOP_TOP_OFFSET = 100
const DESKTOP_RIGHT_OFFSET = 32
const MOBILE_TOP_OFFSET = 88
const MOBILE_SIDE_OFFSET = 16

const ICON_SIZE_CLASS = "size-6"
const ICON_SIZE_FORCED_CLASS = "size-6!"

const DESKTOP_OFFSET = { top: DESKTOP_TOP_OFFSET, right: DESKTOP_RIGHT_OFFSET }
const MOBILE_OFFSET = { top: MOBILE_TOP_OFFSET, right: MOBILE_SIDE_OFFSET, left: MOBILE_SIDE_OFFSET }

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      offset={DESKTOP_OFFSET}
      mobileOffset={MOBILE_OFFSET}
      closeButton
      icons={{
        success: <CircleCheckIcon className={ICON_SIZE_CLASS} />,
        close: <XIcon className={ICON_SIZE_CLASS} />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "w-fit! gap-2! rounded-lg! border-success! bg-success-bg! px-6! py-3! font-sans text-base! font-semibold! text-success!",
          icon: `m-0! ${ICON_SIZE_FORCED_CLASS} text-success`,
          closeButton:
            `static! order-last ml-4 ${ICON_SIZE_FORCED_CLASS} translate-x-0! translate-y-0! border-0! bg-transparent! p-0! text-success!`,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
