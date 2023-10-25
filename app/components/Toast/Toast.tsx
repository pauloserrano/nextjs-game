import { useEffect, useState } from "react"
import { useCustomEvent } from "@/app/hooks"
import { EVENT_TYPES } from "@/app/types"
import styles from "./Toast.module.scss"

interface ToastProps {
  [prop: string]: any
}

export function Toast({ ...props}: ToastProps) {
  const [messages, setMessages] = useState<string[]>([])
  const { listen, remove } = useCustomEvent()

  useEffect(() => {
    const handler = ({ detail }: { detail: { message: string }}) => {
      const newMessage = detail.message
      setMessages(prev => [newMessage, ...prev])
    }

    listen(EVENT_TYPES.NOTIFICATION, handler)

    return () => {
      remove(EVENT_TYPES.NOTIFICATION, handler)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messages.length > 0){
        setMessages(messages.slice(0, -1))
      }
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [messages.length])

  return (
    <ul className={`${styles.container} ${props.className ? props.className : ""}`} {...props}>
      {messages.map((message, id) => (
        <li key={id} className={`${styles.description}`}>{message}</li>
      ))}
    </ul>
  )
}
