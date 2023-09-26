"use client"

import { useGameContext } from "@/hooks";
import { CombatLayout, DialogueLayout, OverworldLayout } from "@/layouts";


export default function Home() {
  const { state } = useGameContext()

  return (
    <OverworldLayout />
  )

  return (
    <CombatLayout
      playerParty={state.characters}
      enemyParty={state.characters}
    />
  )
}
