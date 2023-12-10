/* eslint-disable @typescript-eslint/no-unused-vars */
import { readFileSync } from 'fs'

const FILE_PATH = './src/resources/10_example.txt'
// const FILE_PATH = './src/resources/10.txt'

const PIPE_TYPE = ['|', '-', 'L', 'J', '7', 'F']
type Pipe = typeof PIPE_TYPE[number]

type Bearing = ['NORTH', 'EAST', 'SOUTH', 'WEST']

const START_POSITION = 'S'

interface ConnectedPipe {
  pipe: Pipe
  firstConnection: Bearing
  secondConnection: Bearing
}

export default function (): void {
  const lines = readFileSync(FILE_PATH, 'utf-8').trim().split('\n')
  const map: string[][] = buildMap(lines)
  console.log(map)
}

function buildMap (lines): string[][] {
  const map: string[][] = []
  // Initializes the map array
  //   for (let i = 0; i < lines.length; i++) {
  //     map.push([])
  //   }

  lines.forEach((line, lineIndex) => {
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
