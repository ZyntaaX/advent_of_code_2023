/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import fs from 'fs';

export default function calculatePossibleGames() {
  const targetCounts = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const possibleGames = [];

  const lines = fs.readFileSync('./src/02/input/02.txt', 'utf-8').trim().split('\n');

  lines.forEach((line) => {
    const game = line.match(/Game (\d+): (.+)/);
    const gameID = parseInt(game[1], 10);

    const gameSubsets = game[2].split(';');

    let gameIsPossible = true;

    gameSubsets.forEach((subset) => {
      const counts = subset.split(',').map((count) => count.trim().split(' '));

      return counts.some(([amount, color]) => {
        const targetCount = targetCounts[color];

        if (!targetCount || parseInt(amount, 10) > targetCount) {
          gameIsPossible = false;
          return true;
        }
        return false;
      });
    });

    if (gameIsPossible) {
      possibleGames.push(gameID);
    }
  });

  console.log('Possible Games: ', possibleGames);
  console.log('Sum: ', possibleGames.reduce((sum, gameID) => sum + gameID));
}
