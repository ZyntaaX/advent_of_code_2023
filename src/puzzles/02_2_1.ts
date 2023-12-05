/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */

import fs from 'fs'

export default function calculateMinimumSetOfCubes (): void {
  const lines = fs.readFileSync('./src/resources/02.txt', 'utf-8').trim().split('\n')

  const powerPerGame = []

  lines.forEach((line) => {
    const game = line.match(/Game (\d+): (.+)/)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const gameSubsets = game[2].split(';')

    const minAmounts = {
      red: 0,
      green: 0,
      blue: 0
    }

    gameSubsets.forEach((subset) => {
      const counts = subset.split(',').map((count) => count.trim().split(' '))

      counts.forEach(([amount, color]) => {
        if (amount > minAmounts[color]) {
          minAmounts[color] = parseInt(amount, 10)
        }
      })
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    powerPerGame.push(minAmounts.red * minAmounts.green * minAmounts.blue)
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  console.log('Total sum of powers: ', powerPerGame.reduce((sum, value) => sum + value))
}
