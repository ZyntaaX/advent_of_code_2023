import fs from 'fs'
import { findLCM } from '../helpers/array_helpers'

// const FILE_PATH = './src/resources/08_example.txt'
const FILE_PATH = './src/resources/08.txt'

type NodeValue = string

interface Node {
  value: NodeValue
  leftNode: NodeValue
  rightNode: NodeValue
}

const START_NODE_LAST_VALUE = 'A'
const FINAL_NODE_LAST_VALUE = 'Z'

const TYPE_INSTRUCTION = ['L', 'R']
type Instruction = typeof TYPE_INSTRUCTION[number]

export default function findCorrectNodesSimultaneously (): void {
  const lines = fs.readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  // First line is our instructions
  const instructions: Instruction[] = getInstructions(lines[0])

  const nodes: Node[] = createNodes(lines)

  const nodeStepsToFinnish: number[] = []
  const startNodes: Node[] = getNodesWithEndValue(nodes, START_NODE_LAST_VALUE)
  startNodes.forEach((node) => {
    nodeStepsToFinnish.push(getStepsBetweenNodes(node.value, FINAL_NODE_LAST_VALUE, nodes, instructions))
  })

  console.log('Minimum number of steps: ', findLCM(nodeStepsToFinnish))
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

  while (true) {
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

    // We found the end
    if (currentNode.value[2] === end) break
  }

  return steps
}

function getNodesWithEndValue (nodes: Node[], value: NodeValue): Node[] {
  return (nodes.filter((node) => node.value[2] === value) ?? [])
}

function getNodeWithValue (nodes: Node[], value: NodeValue): Node {
  return (nodes.find((node) => node.value === value) ?? { value: '', leftNode: '', rightNode: '' })
}
