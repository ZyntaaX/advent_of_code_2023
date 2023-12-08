/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'

// const FILE_PATH = './src/resources/05_example.txt'
const FILE_PATH = './src/resources/05.txt'

const PARSE_LINES_MAP = {
  SEED_TO_SOIL_PARSE_LINE: 'seed-to-soil map:',
  SOIL_TO_FERTILIZER_PARSE_LINE: 'soil-to-fertilizer map:',
  FERTILIZER_TO_WATER_PARSE_LINE: 'fertilizer-to-water map:',
  WATER_TO_LIGHT_PARSE_LINE: 'water-to-light map:',
  LIGHT_TO_TEMPERATURE_PARSE_LINE: 'light-to-temperature map:',
  TEMPERATURE_TO_HUMIDITY_PARSE_LINE: 'temperature-to-humidity map:',
  HUMIDITY_TO_LOCATION_PARSE_LINE: 'humidity-to-location map:'
}

interface Converter {
  type: string
  source: number
  destination: number
  length: number
}

interface Seed {
  seedRangeStartInc: number
  seedRangeEndExcl: number
}

export default function (): void {
  const lines = fs.readFileSync(FILE_PATH, 'utf-8').trim().split('\n')

  // Seeds will always be on the first row
  const seeds: Seed[] = getSeedsFromString(lines[0])
  console.log('\nAll seed ranges: ', seeds)

  const converters: Converter[] = createConvertersFromLines(lines)

  const seedLocations: number[] = getAllLocationsForEachRange(seeds, converters)

  console.log('\nSeed locations: ', seedLocations)
  console.log('Lowest location number: ', Math.min(...seedLocations), '\n')
}

function getAllLocationsForEachRange (seeds: Seed[], converters: Converter[]): number[] {
  const returnLocations: number[] = []

  seeds.forEach(({ seedRangeStartInc, seedRangeEndExcl }, index) => {
    console.log(`\nStarting calculation of seed ${index + 1}`)

    const timerString = `Seed ${index + 1} time`
    console.time(timerString)

    const filteredRanges: Seed[] = getFilteredRanges(seeds, converters)

    for (let currentSeed = seedRangeStartInc; currentSeed < seedRangeEndExcl; currentSeed++) {
      let location: number | null = null

      let previousConverterType: string
      let currentValue: number | null = null

      converters.forEach((converter) => {
        if (converter.type === previousConverterType) return

        currentValue = convertValue(location ?? currentSeed, converter)

        if (currentValue !== null) {
          location = currentValue
          currentValue = null

          previousConverterType = converter.type
        }
      })

      if (location !== null && returnLocations.length <= index) {
        returnLocations.push(location)
      } else if (location !== null && location < returnLocations[index]) {
        returnLocations[index] = location
      }
    }
    console.timeEnd(timerString)
  })

  return returnLocations
}

function getFilteredRanges (ogRanges: Seed[], converters: Converter[]): Seed[] {
  return ogRanges
}

function convertValue (input: number, converter: Converter): number | null {
  const delta = input - converter.source

  if (delta >= 0 && delta < converter.length) {
    return converter.destination + delta
  }

  return null
}

function getSeedsFromString (line: string): Seed[] {
  const seeds: Seed[] = []

  const matches = line.match(/\d+/g)

  if (matches !== null) {
    for (let i = 0; i < matches.length; i += 2) {
      const seedRangeStartInc: number = parseInt(matches[i])
      const seedRangeEndExcl: number = seedRangeStartInc + parseInt(matches[i + 1])
      seeds.push({ seedRangeStartInc, seedRangeEndExcl })
    }
  }

  return seeds
}

function createConvertersFromLines (lines: string[]): Converter[] {
  const converters: Converter[] = []

  let lastConverterLine: string

  lines.forEach((line, lineIndex) => {
    const currentLine: string = line.trim()
    // Skip first line as that holds the seeds.
    // Also skip empty lines
    if (lineIndex === 0 || currentLine === '') return

    if (Object.values(PARSE_LINES_MAP).includes(currentLine)) {
      // A header line

      lastConverterLine = currentLine
    } else {
      // A row with numbers

      // Gets all numbers on a row
      const values = currentLine.match(/\d+/g)

      if (values !== null) {
        const destination = parseInt(values[0])
        const source = parseInt(values[1])
        const length = parseInt(values[2])
        const type = lastConverterLine

        converters.push({ type, source, destination, length })
      }
    }
  })

  return converters
}
