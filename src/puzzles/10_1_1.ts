/* eslint-disable @typescript-eslint/no-unused-vars */
import { readFileSync } from "fs";

const FILE_PATH = "./src/resources/10_example.txt";
// const FILE_PATH = './src/resources/10.txt'

const PIPE_TYPE = ["|", "-", "L", "J", "7", "F", "S"];
type Pipe = (typeof PIPE_TYPE)[number];

type Bearing = ["NORTH", "EAST", "SOUTH", "WEST"];

const START_POSITION = "S";

type Map = string[][];

interface ConnectedPipe {
  pipe?: Pipe;
  // firstConnection?: Bearing;
  // secondConnection?: Bearing;
  x: number;
  y: number;
  isStartPosition?: boolean;
}

export default function (): void {
  const lines = readFileSync(FILE_PATH, "utf-8").trim().split("\n");
  const map: Map = buildMap(lines);
  // console.log(map);

  const pipeArray: ConnectedPipe[] = getPipeArray(map);

  const furthestPoint: number = getFurthestPointFromStart(pipeArray);
}

function getFurthestPointFromStart(
  pipeArray: ConnectedPipe[],
  map: Map
): number {
  const startPos: ConnectedPipe = pipeArray.find((el) => el.isStartPosition);

  let lengthOfLoop: number = NaN;

  for (let y = startPos.y - 1; y <= startPos.y + 1; y++) {
    if (y < 0 || y >= map.length) continue;
    for (let x = -1; x <= 1; x++) {
      if (x < 0 || x >= map[y].length) continue;
      lengthOfLoop = findLengthOfLoop(map);
    }
  }
}

function findLengthOfLoop(
  map: Map,
  nextPipe: ConnectedPipe,
  currentLength: number
): number {}

function buildMap(lines): Map {
  const map: Map = [];

  lines.forEach((line, lineIndex) => {
    const xMap: string[] = [];
    line.split("").forEach((char) => {
      if (char !== "\r") {
        xMap.push(char);
      }
    });
    map.push(xMap);
  });
  return map;
}

function getPipeArray(map: string[][]): ConnectedPipe[] {
  const arr: ConnectedPipe[] = [];
  map.forEach((row, yIndex) => {
    row.forEach((char, xIndex) => {
      if (PIPE_TYPE.includes(char)) {
        arr.push({
          x: xIndex,
          y: yIndex,
          pipe: char as Pipe,
          isStartPosition: char === START_POSITION,
        });
      }
    });
  });
  return arr;
}
