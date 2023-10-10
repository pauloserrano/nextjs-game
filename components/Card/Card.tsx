import { Character } from '@/types'
import React from 'react'

interface CardProps {
  character: Character
  isSelected?: boolean
}

export default function Card({ character, isSelected }: CardProps) {
  return (
    <div>Card</div>
  )
}
