import fs from 'fs'

// const FILE_PATH = './src/resources/08_example.txt'
const FILE_PATH = './src/resources/08.txt'

type NodeValue = string

interface Node {
  value: NodeValue
  leftNode: NodeValue
  rightNode: NodeValue
}

const START_NODE = 'AAA'
const FINAL_NODE = 'ZZZ'

const TYPE_INSTRUCTION = ['L', 'R']
type Instruction = typeof TYPE_INSTRUCTION[number]

export default function findCorrectNode (): void {
  const lines = fs.readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  // First line is our instructions
  const instructions: Instruction[] = getInstructions(lines[0])

  const nodes: Node[] = createNodes(lines)

  const steps: number = getStepsBetweenNodes(START_NODE, FINAL_NODE, nodes, instructions)
  console.log('Total step: ', steps)
}

function getInstructions (line: string): Instruction[] {
  const instructions: Instruction[] = []
  for (const char of line) {
    if (TYPE_INSTRUCTION.includes(char)) {
      instructions.push(char)
    }
  }
  return instructions
}

function createNodes (lines: string[]): Node[] {
  const nodes: Node[] = []

  lines.slice(1).forEach((line, index) => {
    const values = line.replace(/\s/g, '').split(/[=(),]/).filter(Boolean)
    if (values.length === 0) return
    nodes.push({
      value: values[0],
      leftNode: values[1],
      rightNode: values[2]
    })
  })
  return nodes
}

function getStepsBetweenNodes (start: NodeValue, end: NodeValue, nodes: Node[], instructions: Instruction[]): number {
  let currentNode: Node = getNodeWithValue(nodes, start)

  let steps = 0
  let currentInstructionIndex = 0

  while (currentNode?.value !== end) {
    steps++

    // Move on to the left or right node depending on instruction
    if (instructions[currentInstructionIndex] === 'R') {
      currentNode = getNodeWithValue(nodes, currentNode.rightNode)
    } else if (instructions[currentInstructionIndex] === 'L') {
      currentNode = getNodeWithValue(nodes, currentNode.leftNode)
    }

    currentInstructionIndex++
    // Restart if we passed the end of our instructions
    if (currentInstructionIndex >= instructions.length) currentInstructionIndex = 0
  }

  return steps
}

function getNodeWithValue (nodes: Node[], value: NodeValue): Node {
  return (nodes.find((node) => node.value === value) ?? { value: '', leftNode: '', rightNode: '' })
}
