import fs from 'fs'

interface Card {
  id: number
  winningNumbers: string[]
  playersNumbers: string[]
  matchingNumbers: number
}

interface PlayerCard {
  card: Card
  amount: number
}

export default function calculateTotalAmountOfScratchcards (): void {
  const lines = fs.readFileSync('./src/resources/04.txt', 'utf-8').trim().split('\n')

  const allCards: Card[] = []
  const playersCards: PlayerCard[] = []

  // Build card array
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
      playersNumbers: numbers[1].split(' ').filter(Boolean),
      matchingNumbers: 0
    }

    currentCard.matchingNumbers = getTotalMatchingNumbersForCard(currentCard)

    allCards.push(currentCard)

    // Player should start with 1 copy of each card
    playersCards.push({
      card: currentCard,
      amount: 1
    })
  })

  playersCards.forEach((currentCard, cardIndex) => {
    if (currentCard.card.matchingNumbers > 0) {
      // Add amount to each looped through card
      for (let i = 1; i <= currentCard.card.matchingNumbers; i++) {
        playersCards[cardIndex + i].amount += currentCard.amount
      }
    }
  })

  console.log('Total amount of cards: ', calcTotalScore(playersCards))
}

function getTotalMatchingNumbersForCard (card: Card): number {
  let totalMatches = 0

  card.playersNumbers.forEach((number) => {
    if (card.winningNumbers.includes(number) && number !== '') {
      totalMatches++
    }
  })

  return totalMatches
}

function calcTotalScore (cards: PlayerCard[]): number {
  let total = 0
  cards.forEach((card) => { total += card.amount ?? 0 })
  return total
}
