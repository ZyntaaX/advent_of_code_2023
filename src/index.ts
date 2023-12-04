/* eslint-disable @typescript-eslint/no-unused-vars */
// Day 1
import { parseInputFromFile1 } from './01/01_1_1'
import { parseInputFromFile2 } from './01/01_2_1'

// Day 2
import calculatePossibleGames from './02/02_1_1'
import calculateMinimumSetOfCubes from './02/02_2_1'

// Day 3
import getSumOfEngineParts from './03/3_1_1'
import calculateGearRatios from './03/3_2_1'

// Day 4
import calculateTotalPointsInTickets from './04/4_1_1'
import calculateTotalAmountOfScratchcards from './04/4_2_1'

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

  console.log('\nDay 3 - Puzzle 2')
  calculateGearRatios()

  // console.log('\nDay 4 - Puzzle 1')
  // calculateTotalPointsInTickets()

  // console.log('\nDay 4 - Puzzle 2')
  // calculateTotalAmountOfScratchcards()
}

void Run()
