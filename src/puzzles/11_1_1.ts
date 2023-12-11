/* eslint-disable @typescript-eslint/no-unused-vars */
import { readFileSync } from 'fs'

import { zip } from 'lodash'
import _ from 'underscore'

const FILE_PATH = './src/resources/11.txt'
// const FILE_PATH = './src/resources/11_example.txt'

const GALAXY_SYMBOL = '#'
const EMPTY_SPACE_SYMBOL = '.'

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

  const [map, galaxies, galaxyPairs] = buildGalaxyMap(lines)
  //   console.log(galaxyPairs.length)

  const allShortestPaths: number[] = getShortestPathForPairs(galaxyPairs)
  console.log('Sum: ', allShortestPaths.reduce((acc, next) => acc + next))
}

function getShortestPathForPairs (pairs: GalaxyPair[]): number[] {
  const paths: number[] = []
  pairs.forEach((pair) => {
    const shortestPath: number = Math.abs(pair.galaxyOne.x - pair.galaxyTwo.x) + Math.abs(pair.galaxyOne.y - pair.galaxyTwo.y)
    paths.push(shortestPath)
  })
  return paths
}

function buildGalaxyMap (lines): [Map, Galaxy[], GalaxyPair[]] {
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

  // Inserts new rows where needed
  map = insertEmptySpace(map)
  // Inverts the 2D-array
  map = _.zip(...map)
  // Inserts new rows where needed, which will be columns later
  map = insertEmptySpace(map)
  // Again, inverts the 2D-array
  map = _.zip(...map)

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

  return [map, galaxies, pairs]
}

function insertEmptySpace (map: Map): Map {
  const workMap: Map = [...map]
  const colsWithGalaxies: number[] = []
  for (let y = 0; y < workMap.length; y++) {
    let rowHasGalaxy = false
    for (let x = 0; x < workMap[y].length; x++) {
      if (workMap[y][x] === GALAXY_SYMBOL) {
        if (!colsWithGalaxies.includes(x)) {
          colsWithGalaxies.push(x)
        }
        rowHasGalaxy = true
      }
    }

    if (!rowHasGalaxy) {
      workMap.splice(y, 0, [...workMap[y]])
      y++
    }
  }

  return workMap
}
