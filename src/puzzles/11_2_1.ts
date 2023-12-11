import { readFileSync } from 'fs'

import _ from 'underscore'

const FILE_PATH = './src/resources/11.txt'
// const FILE_PATH = './src/resources/11_example.txt'

const GALAXY_SYMBOL = '#'

// 1 for part 1, 1000000 for part 2
const SPACE_EXPANSION_COEFFICIENT = 1000000

type Map = string[][]

interface Galaxy {
  x: number
  y: number
}

interface GalaxyPair {
  galaxyOne: Galaxy
  galaxyTwo: Galaxy
}

export default function (): void {
  const lines = readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, galaxies, galaxyPairs] = buildGalaxyMap(lines, SPACE_EXPANSION_COEFFICIENT)

  const allShortestPaths: number[] = getShortestPathForPairs(galaxyPairs)
  console.log('Sum of shortest paths: ', allShortestPaths.reduce((acc, next) => acc + next))
}

function getShortestPathForPairs (pairs: GalaxyPair[]): number[] {
  const paths: number[] = []
  pairs.forEach((pair) => {
    const shortestPath: number = Math.abs(pair.galaxyOne.x - pair.galaxyTwo.x) + Math.abs(pair.galaxyOne.y - pair.galaxyTwo.y)
    paths.push(shortestPath)
  })
  return paths
}

function buildGalaxyMap (lines, spaceExpansionCoefficient: number): [Map, Galaxy[], GalaxyPair[]] {
  let map: Map = []
  const galaxies: Galaxy[] = []
  const pairs: GalaxyPair[] = []

  // Creates the map
  lines.forEach((line) => {
    const row: string[] = []
    const values = line.split('').filter(Boolean)

    values.forEach((val) => {
      if (val !== '\r') {
        row.push(val)
      }
    })

    map.push(row)
  })

  // Maps all the galaxies
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === GALAXY_SYMBOL) {
        galaxies.push({ x, y })
      }
    }
  }

  // Creates all possible pairs
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const pair: GalaxyPair = { galaxyOne: galaxies[i], galaxyTwo: galaxies[j] }
      pairs.push(pair)
    }
  }

  // Get points where space expands on Y axis
  let expansionPoints: number[] = getSpaceExpansionCoordsForRow(map)

  // Updates all the galaxy Y coords with space expansion in account
  let passes = 0
  expansionPoints.forEach((point) => {
    const p = point + passes * (spaceExpansionCoefficient - (spaceExpansionCoefficient === 1 ? 0 : 1))
    galaxies.filter((g) => g.y >= p).forEach((g) => {
      g.y += spaceExpansionCoefficient - (spaceExpansionCoefficient === 1 ? 0 : 1)
    })
    passes++
  })

  // Inverts our map, to get expansion points for X
  map = _.zip(...map)

  // Get points where space expands on original X axis
  expansionPoints = getSpaceExpansionCoordsForRow(map)

  // Updates all the galaxy X coords with space expansion in account
  passes = 0
  expansionPoints.forEach((point) => {
    const p = point + passes * (spaceExpansionCoefficient - (spaceExpansionCoefficient === 1 ? 0 : 1))
    galaxies.filter((g) => g.x >= p).forEach((g) => {
      g.x += spaceExpansionCoefficient - (spaceExpansionCoefficient === 1 ? 0 : 1)
    })
    passes++
  })

  // Reverts the 2D array back to it's original
  map = _.zip(...map)

  return [map, galaxies, pairs]
}

function getSpaceExpansionCoordsForRow (map: Map): number[] {
  const expansionsRows: number[] = []
  for (let y = 0; y < map.length; y++) {
    let rowHasGalaxy = false
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === GALAXY_SYMBOL) {
        rowHasGalaxy = true
        break
      }
    }
    if (!rowHasGalaxy) {
      expansionsRows.push(y)
    }
  }
  return expansionsRows
}
