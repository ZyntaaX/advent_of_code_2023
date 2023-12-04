import fs from 'fs'
import readline from 'readline'

export async function parseInputFromFile1 (): Promise<void> {
  const fileName = 'src/01/input/01.txt'
  const filestream = fs.createReadStream(fileName)

  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
  })

  let total = 0

  for await (const line of rl) {
    let number = ''

    for (let i = 0; i < line.length; i++) {
      const isNumber = !Number.isNaN(parseInt(line[i]))

      if (isNumber) {
        number += line[i]
        break
      }
    }

    for (let i = line.length - 1; i >= 0; i--) {
      const isNumber = !Number.isNaN(parseInt(line[i]))

      if (isNumber) {
        number += line[i]
        break
      }
    }

    const parsedInt = parseInt(number)
    total += parsedInt
  }

  console.log('PARSED: ', total)
}
