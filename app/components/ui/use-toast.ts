import { Toast,} from "@/components/ui/toast"
import {
  toast as sonnerToast,
  ToastT as SonnerToast,
} from "sonner"

export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: (toastId?: string) => sonnerToast.dismiss(toastId),
  }
}