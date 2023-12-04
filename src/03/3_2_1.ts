import fs from 'fs'

const GEAR_SYMBOL: string = '*'

const FILE_PATH = './src/03/input/03.txt'

interface Gear {
  x: number
  y: number
  adjacentNumbers: GridNumber[]
}

interface GridNumber {
  value: number
  row: number
  startIndex: number
  endIndex: number
}

export default function calculateGearRatios (): void {
  const lines = fs.readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  const gridNumbers: GridNumber[] = buildGridNumbersArray(lines)
  const grid: string[][] = buildCharGrid(lines)

  const gears: Gear[] = buildGearArray(grid, gridNumbers)

  console.log('Total gear ratio: ', calculateTotalGearRatio(gears.filter((gear) => gear.adjacentNumbers.length === 2)))
}

function calculateTotalGearRatio (gears: Gear[]): number {
  let total: number = 0
  gears.forEach((gear) => {
    if (gear.adjacentNumbers.length === 0) return

    let gearRatio = 1
    gear.adjacentNumbers.forEach((num) => {
      gearRatio *= num.value
    })

    total += gearRatio
  })

  return total
}

function buildCharGrid (lines: string[]): string[][] {
  const charGrid: string[][] = []

  // Initialize charGrid with empty arrays for each line
  lines.forEach(() => {
    charGrid.push([])
  })

  lines.forEach((line, lineIndex) => {
    line.split('').forEach((char, charIndex) => {
      if (char !== '\r') {
        charGrid[lineIndex][charIndex] = char
      }
    })
  })

  return charGrid
}

function buildGridNumbersArray (lines: string[]): GridNumber[] {
  const grid: GridNumber[] = []

  lines.forEach((row, rowIndex) => {
    const matches = row.match(/\d+/g)

    let previousEndIndex = 0

    if (matches !== null) {
      matches.forEach((match) => {
        const startIndex = row.indexOf(match, previousEndIndex)
        const endIndex = startIndex + match.length - 1
        previousEndIndex = endIndex

        const gridNumber: GridNumber = {
          value: parseInt(match),
          row: rowIndex,
          startIndex,
          endIndex
        }
        grid.push(gridNumber)
      })
    }
  })

  return grid
}

function buildGearArray (grid: string[][], gridNumbersArr: GridNumber[]): Gear[] {
  const gears: Gear[] = []

  grid.forEach((row, rowIx) => {
    row.forEach((col, colIx) => {
      if (col === GEAR_SYMBOL) {
        const gear: Gear = {
          x: colIx,
          y: rowIx,
          adjacentNumbers: getAdjacentGridNumbers(colIx, rowIx, gridNumbersArr)
        }

        gears.push(gear)
      }
    })
  })

  return gears
}

function getAdjacentGridNumbers (x: number, y: number, gridNumbersArr: GridNumber[]): GridNumber[] {
  const adjacentGridNumbers: GridNumber[] = []

  const adjacentRowsGridNumbers: GridNumber[] = gridNumbersArr.filter((num) => num.row >= y - 1 && num.row <= y + 1)

  adjacentRowsGridNumbers.forEach((num) => {
    if (num.startIndex <= x + 1 && num.endIndex >= x - 1) {
      adjacentGridNumbers.push(num)
    }
  })

  return adjacentGridNumbers
}
