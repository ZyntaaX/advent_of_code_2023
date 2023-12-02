/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import fs from 'fs';

export default function calculateMinimumSetOfCubes() {
  const lines = fs.readFileSync('./src/02/input/02.txt', 'utf-8').trim().split('\n');

  const powerPerGame = [];

  lines.forEach((line) => {
    const game = line.match(/Game (\d+): (.+)/);
    const gameID = parseInt(game[1], 10);

    const gameSubsets = game[2].split(';');

    const minAmounts = {
      red: 0,
      green: 0,
      blue: 0,
    };

    gameSubsets.forEach((subset) => {
      const counts = subset.split(',').map((count) => count.trim().split(' '));

      counts.forEach(([amount, color]) => {
        if (amount > minAmounts[color]) {
          minAmounts[color] = parseInt(amount, 10);
        }
      });
    });

    console.log(`MIN AMOUNT GAME ${gameID}: `, minAmounts);
    powerPerGame.push(minAmounts.red * minAmounts.green * minAmounts.blue);
  });

  console.log('Total sum of powers: ', powerPerGame.reduce((sum, value) => sum + value));
}
