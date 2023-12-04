import fs from 'fs'

const GEAR_SYMBOL: string = '*'
// const FILE_PATH = './src/03/input/03.txt'
const FILE_PATH = './src/03/input/example.txt'

export default function getSumOfGearRatios (): void {
  const lines = fs.readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  const charGrid: string[][] = []
  // Initialize charGrid with empty arrays for each line
  lines.forEach(() => {
    charGrid.push([])
  })

  const gearRatios: number[] = []

  lines.forEach((line, lineIndex) => {
    line.split('').forEach((char, charIndex) => {
      charGrid[lineIndex][charIndex] = char
    })
  })

  for (let y = 0; y < charGrid.length; y++) {
    for (let x = 0; x < charGrid[y].length; x++) {
      if (charGrid[y][x] === GEAR_SYMBOL) {
        const amountOfNumbersAdjacent = getAdjacentNumbersCount(charGrid, x, y)

        if (amountOfNumbersAdjacent.length === 2) {
          // console.log('RATIO:: ', amountOfNumbersAdjacent[0] * amountOfNumbersAdjacent[1])

          console.log(amountOfNumbersAdjacent)
          gearRatios.push(amountOfNumbersAdjacent[0] * amountOfNumbersAdjacent[1])
        }
      }
    }
  }

  // const total = 0
  // gearRatios.forEach((el) => {
  //   log.el
  // })
  console.log('Gears: ', gearRatios.length)

  console.log('Sum of gear ratios: ', gearRatios.reduce((sum, next) => sum + next))
}

function getAdjacentNumbersCount (charGrid: string[][], x: number, y: number): number[] {
  const numArr: number[] = []

  const lines = fs.readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  for (let i = y + 1; i >= y - 1; i--) {
    if (i < 0 || i > charGrid.length) continue

    if (i === y) {
      const charToLeft = parseInt(charGrid[i][x - 1])
      const charToRight = parseInt(charGrid[i][x + 1])

      if (!isNaN(charToRight)) {
        const number = getDigitFromString(lines[y], x + 1)
        numArr.push(number)
      }

      if (!isNaN(charToLeft)) {
        const number = getDigitFromStringInReverse(lines[i], x)
        numArr.push(number)
      }

      continue
    }

    for (let j = x + 1; j >= x - 1; j--) {
      if (j < 0 || j > charGrid[i].length) continue

      const charToLeft = parseInt(charGrid[i][j - 1])
      const charToRight = parseInt(charGrid[i][j + 1])

      if (!isNaN(charToLeft) && isNaN(charToRight) && j < x + 1 && j > x - 1) {
        const number = getDigitFromStringInReverse(lines[i], j)
        numArr.push(number)
        j -= number.toString().length - 1
      } else if (isNaN(charToLeft) && !isNaN(charToRight) && j < x + 1 && j > x - 1) {
        const number = getDigitFromString(lines[i], j)
        numArr.push(number)
        // j--
      } else if (!isNaN(charToLeft) && !isNaN(charToRight) && j < x + 1 && j > x - 1) {
        let startIndex = j - 1
        while (!isNaN(parseInt(charGrid[i][startIndex]))) {
          startIndex--
        }

        const number = getDigitFromString(lines[i], startIndex)
        j -= number.toString().length - 1
        numArr.push(number)
      } else if (!isNaN(parseInt(charGrid[i][j])) && isNaN(charToLeft) && isNaN(charToRight)) {
        // console.log(charGrid[i][j], ' is a lonely number')
        numArr.push(parseInt(charGrid[i][j]))
        j--
      }

      // Immedietaly return as this will does not meet the requirements anyways
      if (numArr.length > 2) return numArr
    }
  }

  return numArr
}

function getDigitFromStringInReverse (string: string, startIndex: number): number {
  const reversedSubstring = string.substring(0, startIndex + 1).split('').reverse().join('')
  const match = reversedSubstring.match(/\d+/)

  if (match !== null) {
    return Number(match[0].split('').reverse().join(''))
  }

  return 0
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDigitFromString (string: string, startIndex: number): number {
  const substring = string.substring(startIndex)
  const match = substring.match(/\d+/)

  if (match !== null) {
    return Number(match[0])
  }

  return 0
}
