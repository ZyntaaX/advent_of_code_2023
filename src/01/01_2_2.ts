import fs from 'fs';

/* This is the second try of the second puzzle of day 1.
Not finished yet due to time constraint. Might be finished later. */

const numbersDict = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
};

export default function parseFileNumbersAndWords() {
  const lines = fs.readFileSync('./src/01/input/01.txt', 'utf-8').trim().split('\n');

  let totalSum = 0;
  //   for (const line of lines) {
  lines.forEach((line) => {
    totalSum += getFirstAndLastNumberAsNumber(line);
  });

  return totalSum;
}

function getFirstAndLastNumberAsNumber(textLine) {
  // Get first word
  // eslint-disable-next-line no-unused-vars
  Object.entries(numbersDict).forEach(([key, value]) => {

  });
  // Get first int

  // Get last word
  // Get last int'

  return textLine;
}
