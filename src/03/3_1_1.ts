import fs from 'fs'

export default function getSumOfEngineParts (): void {
  const lines = fs.readFileSync('./src/03/input/03.txt', 'utf-8').trim().split(/\r\n/)

  const partsToSum: number[] = [0]

  lines.forEach((line, currentLineIndex) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const elementsPerLine: string[] = line.split('.').flatMap((part) => {
      if (part === '\r' || part === '') {
        return []
      } else {
        // Separate numbers and symbols
        const matches = part.match(/(\d+|\D+)/g)
        return matches
      }
    })

    elementsPerLine.forEach((el, index) => {
      let currentOcc = 1

      for (let i = 0; i < index; i++) {
        let editableLine = elementsPerLine[i]

        do {
          if (editableLine.includes(el)) {
            currentOcc++
            editableLine = editableLine.replace(el, '')
          }
        } while (editableLine.includes(el))
      }

      const elementStartIndex: number = findNthOccurrence(line, el, currentOcc)
      const elementEndIndex: number = elementStartIndex + el.length - 1

      if (isNaN(parseInt(el, 10))) return

      for (let i = currentLineIndex - 1; i <= currentLineIndex + 1; i++) {
        if (i < 0 || i >= lines.length) continue

        let hasAdjacent = false

        const currentLine: string = lines[i]

        for (let j = elementStartIndex - 1; j <= elementEndIndex + 1; j++) {
          if (j < 0 || j >= currentLine.length) continue

          if (isCharSymbol(currentLine[j])) {
            partsToSum.push(parseInt(el))
            hasAdjacent = true

            break
          }
        }

        if (hasAdjacent) break
      }
    })
  })

  console.log('Sum of engine parts: ', partsToSum.reduce((sum, nextVal) => sum + nextVal))
}

function isCharSymbol (char: string): boolean {
  const result = char !== '.' && char !== '\r' && !/\s/.test(char) && !/\d/.test(char)
  return result
}

function findNthOccurrence (mainString: string, substring: string, n: number): number {
  let currentIndex = -1

  for (let i = 0; i < n; i++) {
    currentIndex = mainString.indexOf(substring, currentIndex + 1)

    if (currentIndex === -1) {
      // If substring is not found or there are fewer occurrences than n
      return -1
    }
  }

  return currentIndex
}
