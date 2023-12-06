import fs from 'fs'

const BOAT_SPEED = 1

const FILE_PATH = './src/resources/06.txt'
// const FILE_PATH = './src/resources/06_example.txt'

interface Race {
  time: number
  distanceToBeat: number
}

export default function sumOfRaceWins (): void {
  const lines = fs.readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  const allRaces: Race[] = getAllRaces(lines)

  const amountOfPossibleWins: number[] = []
  allRaces.forEach((race) => {
    amountOfPossibleWins.push(findWinCombinations(race))
  })

  console.log(
    'Sum of total win possibilities',
    amountOfPossibleWins.reduce((sum, next) => sum * next)
  )
}

function findWinCombinations (raceToBeat: Race): number {
  const { distanceToBeat, time } = raceToBeat

  let winCount = 0

  for (let i = 1; i < time; i++) {
    const boatCurrentSpeed = i * BOAT_SPEED
    const totalDistanceTraveled = (time - i) * boatCurrentSpeed

    if (totalDistanceTraveled > distanceToBeat) winCount++
  }

  return winCount
}

function getAllRaces (lines: string[]): Race[] {
  const races: Race[] = []

  const numRegeex: RegExp = /\d+/g
  const timesMatches = lines[0].match(numRegeex) // times
  const distanceMatches = lines[1].match(numRegeex) // distance

  if (timesMatches !== null && distanceMatches !== null) {
    for (let i = 0; i < timesMatches.length; i++) {
      races.push({
        time: parseInt(timesMatches[i]),
        distanceToBeat: parseInt(distanceMatches[i])
      })
    }
  }

  return races
}
