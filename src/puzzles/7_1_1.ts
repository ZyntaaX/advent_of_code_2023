import fs from 'fs'
import { groupBy } from '../helpers/array_helpers'

const FILE_PATH = './src/resources/07.txt'
// const FILE_PATH = './src/resources/07_example.txt'

type Card = string
const CardStrength = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}

const handType = ['FIVE_OF_KIND', 'FOUR_OF_KIND', 'FULL_HOUSE', 'THREE_OF_KIND', 'TWO_PAIR', 'ONE_PAIR', 'HIGH_CARD'] as const
type HandType = typeof handType[number]

interface Hand {
  cards: Card[]
  bid: number
  type?: HandType
  rank?: number
}

export default function totalWinnings (): void {
  const lines = fs.readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  let hands: Hand[] = buildHandsArray(lines)

  hands = determineHandsRank(hands)

  let total = 0
  hands.forEach((hand) => {
    total += hand.bid * (hand.rank ?? 0)
  })
  console.log('Total winnings: ', total)
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

  return returnHands
}

function getHandType (hand: Hand): HandType {
  const groupedCards = groupBy(hand.cards, (card) => card)

  const amountOfSimilarCards: number[] = []

  groupedCards.forEach((group) => {
    amountOfSimilarCards.push(group.length)
  })

  if (amountOfSimilarCards.includes(5)) { return 'FIVE_OF_KIND' }
  if (amountOfSimilarCards.includes(4)) { return 'FOUR_OF_KIND' }
  if (amountOfSimilarCards.includes(3) && amountOfSimilarCards.includes(2)) { return 'FULL_HOUSE' }
  if (amountOfSimilarCards.includes(3)) { return 'THREE_OF_KIND' }
  if (amountOfSimilarCards.filter((el) => el === 2).length === 2) { return 'TWO_PAIR' }
  if (amountOfSimilarCards.includes(2)) { return 'ONE_PAIR' }
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
