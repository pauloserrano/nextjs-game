"use client"

import { useGameContext } from "@/hooks";
import { CombatLayout } from "@/layouts";


export default function Home() {
  const { state } = useGameContext()

  return (
    <CombatLayout>
      { state.value }
    </CombatLayout>
  )
}
