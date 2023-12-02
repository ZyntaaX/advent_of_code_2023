/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import readline from 'readline';

export async function parseInputFromFile2() {
  const fileName = "src/01/input/01.txt";
  const filestream = fs.createReadStream(fileName);

  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });

  let total = 0;

  // eslint-disable-next-line no-restricted-syntax
  for await (const line of rl) {
    let number = '';
    number += getFirstNumberOccurence(line);
    number += getLastNumberOccurence(line);
    // eslint-disable-next-line radix
    total += parseInt(number);

    // console.log(`LINE: ${number}`);
  }

  console.log('SUM: ', total);
}

function getFirstNumberOccurence(text) {
  const arrOfWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  let indexOfFirstInt = 9999;
  let indexOfFirstWord = 9999;

  let firstWord;
  let firstInt;

  // eslint-disable-next-line no-restricted-syntax
  for (const word of arrOfWords) {
    const temp = text.indexOf(word);

    if (temp !== -1 && temp < indexOfFirstWord) {
      indexOfFirstWord = temp;
      firstWord = getNumberForWord(word).toString();
    }
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < text.length; i++) {
    // eslint-disable-next-line radix
    if (!Number.isNaN(parseInt(text[i]))) {
      // Is a number
      if (i < indexOfFirstInt) {
        indexOfFirstInt = i;
        firstInt = text[i];
      }
    }
  }

  if (indexOfFirstInt < indexOfFirstWord) return firstInt;
  return firstWord;
}

function getLastNumberOccurence(text) {
  const arrOfWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  let indexOfLastInt = -1;
  let indexOfLastWord = -1;

  let lastWord;
  let lastInt;

  // eslint-disable-next-line no-restricted-syntax
  for (const word of arrOfWords) {
    const temp = text.lastIndexOf(word);

    if (temp > indexOfLastWord) {
      indexOfLastWord = temp;
      lastWord = getNumberForWord(word).toString();
    }
  }

  // eslint-disable-next-line no-plusplus
  for (let i = text.length - 1; i >= 0; i--) {
    if (!Number.isNaN(parseInt(text[i], 10))) {
      if (i > indexOfLastInt) {
        indexOfLastInt = i;
        lastInt = text[i];
      }
    }
  }

  if (indexOfLastInt > indexOfLastWord) return lastInt;
  return lastWord;
}

// eslint-disable-next-line consistent-return
function getNumberForWord(word) {
  switch (word) {
    case 'one': return 1;
    case 'two': return 2;
    case 'three': return 3;
    case 'four': return 4;
    case 'five': return 5;
    case 'six': return 6;
    case 'seven': return 7;
    case 'eight': return 8;
    case 'nine': return 9;
    default: return 0;
  }
}
