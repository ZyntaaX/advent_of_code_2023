import { readFileSync } from 'fs'

// const FILE_PATH = './src/resources/09_example.txt'
const FILE_PATH = './src/resources/09.txt'

type Sequence = number[]

export default function (): void {
  const lines = readFileSync(FILE_PATH, 'utf-8').trim().split('\n')
  const sequences: Sequence[] = getValuesArray(lines)

  const predictions: number[] = []
  sequences.forEach((sequence) => {
    predictions.push(getPrediction(sequence))
  })
  console.log('Sum of predictions: ', predictions.reduce((acc, next) => acc + next))
}

function getPrediction (sequence: Sequence): number {
  const currentSequenceArray: Sequence[] = []
  currentSequenceArray.push(sequence)

  // Loops until every value of last sequence is 0
  while (!currentSequenceArray[currentSequenceArray.length - 1].every((val) => val === 0)) {
    const currentSeq: Sequence = currentSequenceArray[currentSequenceArray.length - 1]
    const newSeq: Sequence = []
    for (let i = 0; i < currentSeq.length - 1; i++) {
      const diff = currentSeq[i + 1] - currentSeq[i]
      newSeq.push(diff)
    }
    currentSequenceArray.push(newSeq)
  }

  let valueForNextIteration: number = 0
  const reversedArr = currentSequenceArray.reverse()
  // -2 cause we want to start at second to last entry in the array
  for (let i = 0; i < reversedArr.length; i++) {
    const currentSequence: Sequence = reversedArr[i]

    const valueToAdd: number = currentSequence[0] - valueForNextIteration
    valueForNextIteration = valueToAdd
  }

  return valueForNextIteration
}

function getValuesArray (lines: string[]): Sequence[] {
  const arr: Sequence[] = []
  lines.forEach((line) => {
    const values = line.split(' ')
    const currentSequence: Sequence = []
    values.forEach((value) => {
      currentSequence.push(parseInt(value))
    })
    arr.push(currentSequence)
  })

  return arr
}
