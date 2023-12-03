import fs from 'fs'

export default function getSumOfEngineParts (): void {
  const lines = fs.readFileSync('./src/03/input/03.txt', 'utf-8').trim().split(/\s+/)

  const partsToSum: number[] = []

  for (let i = 0; i < lines.length; i++) {
    const currentLine: string = lines[i]

    for (let j = 0; j < currentLine.length; j++) {
      const char = currentLine[j]

      if (isCharSymbol(char)) {
        const part = parseInt(char)
        if (!isNaN(part)) {
          partsToSum.push(part)
        }
      }
    }
  }

  console.log('Total sum of engine parts: ', partsToSum.reduce((sum, nextVal) => sum + nextVal))
}

function isCharSymbol (char: string): boolean {
  return !/[\s.]/.test(char)
}

getSumOfEngineParts()
