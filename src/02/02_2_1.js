/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import fs from 'fs';

export default function calculateMinimumSetOfCubes() {
  const lines = fs.readFileSync('./src/02/input/02.txt', 'utf-8').trim().split('\n');

  lines.forEach((line) => {
    const game = line.match(/Game (\d+): (.+)/);
    // const gameID = parseInt(game[1], 10);

    const gameSubsets = game[2].split(';');

    let gameIsPossible = true;

    gameSubsets.forEach((subset) => {
      const counts = subset.split(',').map((count) => count.trim().split(' '));

      let minAmountOfRed = 0;
      let minAmountOfGreen = 0;
      let minAmountOfBlue = 0;

      return counts.forEach(([amount, color]) => {
        // Calculate minimum of each color
        return true;
      });
    });

  });

}
