// Day 1
import { parseInputFromFile1 } from "./01/01_1_1";
import { parseInputFromFile2 } from "./01/01_2_1";

// Day 2
import calculatePossibleGames from "./02/02_1_1"
import calculateMinimumSetOfCubes from "./02/02_2_1";

async function Run() {
    console.log("\nDay 1 - Puzzle 1");
    await parseInputFromFile1();
    
    console.log("\nDay 1 - Puzzle 2");
    await parseInputFromFile2();
    
    console.log("\nDay 2 - Puzzle 1");
    calculatePossibleGames();
    
    console.log("\nDay 2 - Puzzle 2");
    calculateMinimumSetOfCubes();
}

Run();