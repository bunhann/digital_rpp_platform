import * as React from "react"
import { cn } from "@/lib/utils"
import { FaCheck, FaTimes } from "react-icons/fa"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, type = "success", isVisible, onClose }: ToastProps) {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // Auto close after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border",
          "bg-white dark:bg-gray-800 text-gray-800 dark:text-white",
          type === "success" && "border-green-200 dark:border-green-800",
          type === "error" && "border-red-200 dark:border-red-800",
          type === "info" && "border-blue-200 dark:border-blue-800"
        )}
      >
        {type === "success" && <FaCheck className="text-green-500 flex-shrink-0" />}
        {type === "error" && <FaTimes className="text-red-500 flex-shrink-0" />}
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <FaTimes size={12} />
        </button>
      </div>
    </div>
  )
}