import { useEffect, useState } from "react"
import { CharacterSheet } from "../types"
import { useGameContext } from "./useGameContext"

interface useCombatProps {
  playerParty: CharacterSheet[]
  enemyParty: CharacterSheet[]
}

export function useCombat({ playerParty, enemyParty }: useCombatProps) {
  const { state } = useGameContext()
  const [player, setPlayer] = useState(playerParty)
  const [enemy, setEnemy] = useState(enemyParty)

  useEffect(() => {
    if (player.length === 0) [
      setPlayer(state.characters.active)
    ]

    if (enemy.length === 0) [
      setEnemy(state.characters.active)
    ]
  }, [])
  
  return { 
    player, 
    enemy 
  }
}
