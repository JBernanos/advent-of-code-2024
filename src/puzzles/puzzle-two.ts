import * as fs from "fs";

export default (): void => {
  console.log(`[Puzzle 2] - Part one result: ${partOne()}`);
  console.log(`[Puzzle 2] - Part two result: ${partTwo()}`);
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

function partTwo(): number {
  const lists: number[][] = handleInput();

  const errorSolved = (list: number[]): boolean => {
    const subLists: number[][] = [];

    for (let i = 0; i < list.length; i++) {
      const tempList: number[] = list.slice();
      tempList.splice(i, 1);
      subLists.push(tempList);
    }

    for (let i = 0; i < subLists.length; i++) {
      const isIncreasing: boolean = subLists[i][0] < subLists[i][1];
  
      for (let j = 0; j < subLists[i].length; j++) {
        if (isIncreasing && subLists[i][j + 1] < subLists[i][j]) break;
  
        if (!isIncreasing && subLists[i][j + 1] > subLists[i][j]) break;
  
        if (((x) => x < 1 || x > 3)(Math.abs(subLists[i][j] - subLists[i][j + 1]))) break;
  
        if (j === subLists[i].length - 1) return true;
      }
    }
    return false;
  }

  let safeReportsCount: number = 0;
  for (let i = 0; i < lists.length; i++) {
    const isIncreasing: boolean = lists[i][0] < lists[i][1];

    for (let j = 0; j < lists[i].length; j++) {
      if (isIncreasing && lists[i][j + 1] < lists[i][j]) {
        if (errorSolved(lists[i])) safeReportsCount += 1;
        break;
      }

      if (!isIncreasing && lists[i][j + 1] > lists[i][j]) {
        if (errorSolved(lists[i])) safeReportsCount += 1;
        break;
      }

      if (((x) => x < 1 || x > 3)(Math.abs(lists[i][j] - lists[i][j + 1]))) {
        if (errorSolved(lists[i])) safeReportsCount += 1;
        break;
      }

      if (j === lists[i].length - 1) safeReportsCount += 1;
    }
  }

  return safeReportsCount;
}
