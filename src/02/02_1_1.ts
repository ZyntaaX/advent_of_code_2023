/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import fs from 'fs'

export default function calculatePossibleGames (): void {
  const targetCounts = {
    red: 12,
    green: 13,
    blue: 14
  }

  const possibleGames = []

  const lines = fs.readFileSync('./src/02/input/02.txt', 'utf-8').trim().split('\n')

  lines.forEach((line) => {
    const game = line.match(/Game (\d+): (.+)/)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const gameID = parseInt(game[1], 10)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const gameSubsets = game[2].split(';')

    let gameIsPossible = true

    gameSubsets.forEach((subset) => {
      const counts = subset.split(',').map((count) => count.trim().split(' '))

      return counts.some(([amount, color]) => {
        const targetCount = targetCounts[color]

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!(targetCount) || parseInt(amount, 10) > targetCount) {
          gameIsPossible = false
          return true
        }
        return false
      })
    })

    if (gameIsPossible) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      possibleGames.push(gameID)
    }
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  console.log('Sum: ', possibleGames.reduce((sum, gameID) => sum + gameID))
}
