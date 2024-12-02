import * as fs from "fs";

export default (): void => {
  console.log(`[Puzzle 2] - Part one result: ${partOne()}`);
};

function handleInput(): number[][] {
  const fileData: string = fs.readFileSync("./data/puzzle-two-input.txt", "utf-8");

  const lists: number[][] = [];

  let subList: number[] = [];
  let currentString: string = "";
  for (const element of fileData) {
    if (element !== " ") currentString += element;

    if (element === " ") {
      subList.push(Number(currentString));
      currentString = "";
    }

    if (element === "\n") {
      subList.push(Number(currentString));
      lists.push(subList);
      subList = [];
      currentString = "";
    }
  }

  return lists;
}

function partOne(): number {
  const lists: number[][] = handleInput();

  let safeReportsCount: number = 0;
  for (let i = 0; i < lists.length; i++) {
    const isIncreasing: boolean = lists[i][0] < lists[i][1];

    for (let j = 0; j < lists[i].length; j++) {
      if (isIncreasing && lists[i][j + 1] < lists[i][j]) break;

      if (!isIncreasing && lists[i][j + 1] > lists[i][j]) break;

      if (((x) => x < 1 || x > 3)(Math.abs(lists[i][j] - lists[i][j + 1]))) break;

      if (j === lists[i].length - 1) safeReportsCount += 1;
    }
  }

  return safeReportsCount;
}