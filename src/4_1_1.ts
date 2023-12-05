import fs from 'fs'

interface Card {
  id: number
  winningNumbers: string[]
  playersNumbers: string[]
  points?: number
}

export default function calculateTotalPointsInTickets (): void {
  const lines = fs.readFileSync('./src/resources/04.txt', 'utf-8').trim().split('\n')

  const allCards: Card[] = []

  lines.forEach((line) => {
    const card = line.match(/Card\s+(\d+): (.+)/)

    let cardID
    let numbers

    if (card !== null) {
      cardID = parseInt(card[1], 10)
      numbers = card[2].split('|').map((item) => item.trim())
    }

    const currentCard: Card = {
      id: cardID,
      winningNumbers: numbers[0].split(' ').filter(Boolean),
      playersNumbers: numbers[1].split(' ').filter(Boolean)
    }

    currentCard.points = getTotalPointsForCard(currentCard)

    allCards.push(currentCard)
  })

  console.log('Total score of cards: ', calcTotalScore(allCards))
}

function getTotalPointsForCard (card: Card): number {
  let totalPoints = 0

  card.playersNumbers.forEach((number) => {
    if (card.winningNumbers.includes(number)) {
      totalPoints = totalPoints === 0 ? 1 : totalPoints * 2
    }
  })

  return totalPoints
}

function calcTotalScore (cards: Card[]): number {
  let total = 0
  cards.forEach((card) => { total += card.points ?? 0 })
  return total
}
