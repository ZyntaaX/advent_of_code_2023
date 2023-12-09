import fs from 'fs'
import { groupBy } from '../helpers/array_helpers'

const FILE_PATH = './src/resources/07.txt'
// const FILE_PATH = './src/resources/07_example.txt'

type Card = string
const CardStrength = {
  'J': 1,
  '1': 2,
  '2': 3,
  '3': 4,
  '4': 5,
  '5': 6,
  '6': 7,
  '7': 8,
  '8': 9,
  '9': 10,
  'T': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}

const JOKER_CARD = 'J'

const handType = [
  'FIVE_OF_KIND',
  'FOUR_OF_KIND',
  'FULL_HOUSE',
  'THREE_OF_KIND',
  'TWO_PAIR',
  'ONE_PAIR',
  'HIGH_CARD'
] as const
type HandType = typeof handType[number]

interface Hand {
  cards: Card[]
  bid: number
  type?: HandType
  rank?: number
}

export default function (): void {
  const lines = fs.readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  const hands: Hand[] = buildHandsArray(lines)

  const totalWinnings: number = hands.reduce<number>((acc, currentHand) => {
    return acc + currentHand.bid * (currentHand.rank ?? 0)
  }, 0)
  console.log(`Total winnings with joker: ${totalWinnings}`)
}

function buildHandsArray (lines: string[]): Hand[] {
  const returnHands: Hand[] = []
  const numRegex: RegExp = /\d+/g

  lines.forEach((line) => {
    const hand = line.substring(0, 5)
    const bid = line.substring(5).match(numRegex)
    const cards: Card[] = []

    for (const card of hand) {
      cards.push(card)
    }

    if (bid !== null) {
      const hand: Hand = { cards, bid: parseInt(bid[0]) }
      returnHands.push({ ...hand, type: getHandType(hand) })
    }
  })

  return determineHandsRank(returnHands)
}

function countRepeatsWithJoker (input: string): Array<Map<string, number>> {
  const possibilities: Array<Map<string, number>> = []

  // Iterate over each character in the input
  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    // Create a map to store counts for this iteration
    const counts = new Map<string, number>()

    // Count occurrences, considering "J" as a wildcard
    for (let j = 0; j < input.length; j++) {
      const currentChar = input[j] === JOKER_CARD ? char : input[j]
      counts.set(currentChar, (counts.get(currentChar) ?? 0) + 1)
    }

    // Add the counts map to the possibilities array
    possibilities.push(counts)
  }

  return possibilities
}

function getHandType (hand: Hand): HandType {
  let handString = ''
  hand.cards.forEach((card) => { handString += card })

  const mappedPossibleSolutions = countRepeatsWithJoker(handString)

  let previousType: HandType = 'HIGH_CARD'

  // Convert each Map entry to an array for easy iteration
  mappedPossibleSolutions.map(map => Array.from(map.values())).every((currentHandPossibility, index) => {
    if (previousType === 'FIVE_OF_KIND') return false

    const currentType: HandType = decideHand(currentHandPossibility)

    if (handType.indexOf(currentType) < handType.indexOf(previousType)) {
      previousType = currentType
    }

    return true
  })

  return previousType
}

function decideHand (arrayOfHighestDuplicates: number[]): HandType {
  if (arrayOfHighestDuplicates.includes(5)) { return 'FIVE_OF_KIND' }
  if (arrayOfHighestDuplicates.includes(4)) { return 'FOUR_OF_KIND' }
  if (arrayOfHighestDuplicates.includes(3) && arrayOfHighestDuplicates.includes(2)) { return 'FULL_HOUSE' }
  if (arrayOfHighestDuplicates.includes(3)) { return 'THREE_OF_KIND' }
  if (arrayOfHighestDuplicates.filter((el) => el === 2).length === 2) { return 'TWO_PAIR' }
  if (arrayOfHighestDuplicates.includes(2)) { return 'ONE_PAIR' }
  return 'HIGH_CARD'
}

function determineHandsRank (hands: Hand[]): Hand[] {
  const returnHands: Hand[] = []
  const handsGroupedByType = groupBy(hands, (hand) => hand.type)
  let rank = hands.length

  handType.forEach((type) => {
    new Map([...handsGroupedByType].filter(([k, v]) => k === type)).forEach((hands) => {
      const sortedHands = hands.sort(sortCards)

      sortedHands.forEach((hand) => {
        returnHands.push({ ...hand, rank })
        rank--
      })
    })
  })

  return returnHands
}

const sortCards = (cardA, cardB): number => {
  for (let i = 0; i < 5; i++) {
    const valueA = CardStrength[cardA.cards[i]]
    const valueB = CardStrength[cardB.cards[i]]

    if (valueA < valueB) {
      return 1
    } else if (valueA > valueB) {
      return -1
    }
  }

  return 0
}
