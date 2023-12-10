/* eslint-disable @typescript-eslint/no-unused-vars */
import { readFileSync } from 'fs'

// const FILE_PATH = './src/resources/10_example.txt'
const FILE_PATH = './src/resources/10.txt'

type PipeType = '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S'

const START_POSITION: PipeType = 'S'
const GROUND_TILE = '.'

type Map = string[][]

interface Pipe {
  isStartPosition: boolean
  type: PipeType
  x: number
  y: number
  northPipe?: Pipe
  southPipe?: Pipe
  westPipe?: Pipe
  eastPipe?: Pipe
}

export default function (): void {
  const lines = readFileSync(FILE_PATH, 'utf-8').trim().split('\n')
  const map: Map = buildMap(lines)

  const pipes: Pipe[] = getPipeArray(map)

  const loopLength = findLengthOfLoop(pipes)
  console.log('Length: ', Math.ceil(loopLength / 2))
}

function findLengthOfLoop (pipes: Pipe[]): number {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const startPipe = pipes.find((pipe) => pipe.isStartPosition)!

  const directionsToCheck: Pipe[] = []

  // First 4 values to check
  if (startPipe?.westPipe !== undefined) directionsToCheck.push({ ...startPipe.westPipe })
  if (startPipe?.eastPipe !== undefined) directionsToCheck.push({ ...startPipe.eastPipe })
  if (startPipe?.northPipe !== undefined) directionsToCheck.push({ ...startPipe.northPipe })
  if (startPipe?.southPipe !== undefined) directionsToCheck.push({ ...startPipe.southPipe })

  let length = -1

  directionsToCheck.forEach((pipe) => {
    let previousPipe: Pipe = startPipe
    let currentPipe: Pipe = pipe

    if (currentPipe === undefined) return

    if (length !== -1) return

    while (true) {
      if (currentPipe?.type === START_POSITION) break

      if (currentPipe.eastPipe !== undefined && !isPipesSame(currentPipe.eastPipe, previousPipe)) {
        previousPipe = currentPipe
        currentPipe = currentPipe.eastPipe
      } else if (currentPipe.westPipe !== undefined && !isPipesSame(currentPipe.westPipe, previousPipe)) {
        previousPipe = currentPipe
        currentPipe = currentPipe.westPipe
      } else if (currentPipe.northPipe !== undefined && !isPipesSame(currentPipe.northPipe, previousPipe)) {
        previousPipe = currentPipe
        currentPipe = currentPipe.northPipe
      } else if (currentPipe.southPipe !== undefined && !isPipesSame(currentPipe.southPipe, previousPipe)) {
        previousPipe = currentPipe
        currentPipe = currentPipe.southPipe
      } else {
        length = -1
        break
      }

      if (length === -1) length = 1
      else length++
    }
  })

  return length
}

function isPipesSame (pipeA: Pipe, pipeB: Pipe): boolean {
  return (pipeA.x === pipeB.x && pipeA.y === pipeB.y)
}

function buildMap (lines): Map {
  const map: Map = []

  lines.forEach((line) => {
    const xMap: string[] = []
    line.split('').forEach((char) => {
      if (char !== '\r') {
        xMap.push(char)
      }
    })
    map.push(xMap)
  })
  return map
}

function getPipeArray (map: Map): Pipe[] {
  const tempArr: Pipe[] = []
  map.forEach((row, yIndex) => {
    row.forEach((char, xIndex) => {
      if (char === GROUND_TILE) return
      tempArr.push({
        x: xIndex,
        y: yIndex,
        type: char as PipeType,
        isStartPosition: char === START_POSITION
      })
    })
  })

  const directionMapping = {
    '-': ['westPipe', 'eastPipe'],
    '7': ['westPipe', 'southPipe'],
    'F': ['eastPipe', 'southPipe'],
    'J': ['westPipe', 'northPipe'],
    'L': ['northPipe', 'eastPipe'],
    '|': ['northPipe', 'southPipe'],
    'S': ['northPipe', 'southPipe', 'westPipe', 'eastPipe']
  }

  tempArr.forEach((pipe) => {
    const directions = directionMapping[pipe.type]
    directions.forEach((direction) => {
      switch (direction) {
        case 'northPipe':
          pipe[direction] = tempArr.find((el) => el.x === pipe.x && el.y === pipe.y - 1)
          break
        case 'southPipe':
          pipe[direction] = tempArr.find((el) => el.x === pipe.x && el.y === pipe.y + 1)
          break
        case 'westPipe':
          pipe[direction] = tempArr.find((el) => el.x === pipe.x - 1 && el.y === pipe.y)
          break
        case 'eastPipe':
          pipe[direction] = tempArr.find((el) => el.x === pipe.x + 1 && el.y === pipe.y)
          break
      }
    })
    return pipe
  })

  return tempArr
}

function getPipeAtPosition (allPipes: Pipe[], x: number, y: number): Pipe | undefined {
  return allPipes.find((pipe) => pipe.x === x && pipe.y === y)
}
