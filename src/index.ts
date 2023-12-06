/* eslint-disable @typescript-eslint/no-unused-vars */
// Day 1
import { parseInputFromFile1 } from './puzzles/01_1_1'
import { parseInputFromFile2 } from './puzzles/01_2_1'

// Day 2
import calculatePossibleGames from './puzzles/02_1_1'
import calculateMinimumSetOfCubes from './puzzles/02_2_1'

// Day 3
import getSumOfEngineParts from './puzzles/3_1_1'
import calculateGearRatios from './puzzles/3_2_1'

// Day 4
import calculateTotalPointsInTickets from './puzzles/4_1_1'
import calculateTotalAmountOfScratchcards from './puzzles/4_2_1'

// Day 5
import findClosestLocationNumber from './puzzles/5_1_1'
import findClosestLocationNumberOfManySeeds from './puzzles/5_2_1'

// Day 6
import sumOfRaceWins from './puzzles/6_1_1'
import sumOfRaceWins2 from './puzzles/6_2_1'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Run () {
  // console.log('\nDay 1 - Puzzle 1')
  // await parseInputFromFile1()

  // console.log('\nDay 1 - Puzzle 2')
  // await parseInputFromFile2()

  // console.log('\nDay 2 - Puzzle 1')
  // calculatePossibleGames()

  // console.log('\nDay 2 - Puzzle 2')
  // calculateMinimumSetOfCubes()

  // console.log('\nDay 3 - Puzzle 1')
  // getSumOfEngineParts()

  // console.log('\nDay 3 - Puzzle 2')
  // calculateGearRatios()

  // console.log('\nDay 4 - Puzzle 1')
  // calculateTotalPointsInTickets()

  // console.log('\nDay 4 - Puzzle 2')
  // calculateTotalAmountOfScratchcards()

  // console.log('\nDay 5 - Puzzle 1')
  // findClosestLocationNumber()

  console.log('\nDay 5 - Puzzle 2')
  findClosestLocationNumberOfManySeeds()

  // console.log('\nDay 6 - Puzzle 1')
  // sumOfRaceWins()

  // console.log('\nDay 6 - Puzzle 1')
  // sumOfRaceWins2()
}

void Run()
