"use client"

import { useState } from "react"


export function useToast() {
  const [toasts, setToasts] = useState<React.FC[]>([])

  return (
    <div>useToast</div>
  )
}
