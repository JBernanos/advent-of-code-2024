import * as fs from "fs";

export default (): void => {
  console.log(`Part one result: ${partOne()}`);
  console.log(`Part two result: ${partTwo()}`);
};

function handleInput(): number[][] {
  const fileData: string = fs.readFileSync("./data/puzzle-one-input.txt", "utf-8");

  const listOne: number[] = [];
  const listTwo: number[] = [];

  let acc: number = 1; // used to controll in which list the current number should be stored.
  let currentString: string = "";
  for (const element of fileData) {
    if ([" ", "", "\n"].includes(element)) {
      if (currentString.length === 0) continue;

      if (acc % 2 !== 0) listOne.push(Number(currentString));
      else listTwo.push(Number(currentString));

      currentString = "";
      acc += 1;
      continue;
    }
    currentString += element;
  }

  return [listOne, listTwo];
}

function partOne(): number {
  const lists: number[][] = handleInput();
  const listOne: number[] = lists[0].sort();
  const listTwo: number[] = lists[1].sort();

  const fixedListSize: number = listOne.length;

  let totalDistanceBetweenLists: number = 0;
  for (let i = 0; i < fixedListSize; i++) {
    const smallestInListOne: number | undefined = listOne.shift();

    const smallestInListTwo: number | undefined = listTwo.shift();

    if (smallestInListOne && smallestInListTwo) {
      smallestInListOne < smallestInListTwo
        ? (totalDistanceBetweenLists += smallestInListTwo - smallestInListOne)
        : (totalDistanceBetweenLists += smallestInListOne - smallestInListTwo);
    }
  }

  return totalDistanceBetweenLists;
}

function partTwo(): number {
  const lists: number[][] = handleInput();
  const listOne: number[] = lists[0].sort();
  const listTwo: number[] = lists[1].sort();

  const similarityScoreHashTable: any = {};

  let similarityScore: number = 0;
  for (const element of listOne) {
    if (element in similarityScoreHashTable) {
      similarityScore += similarityScoreHashTable[element];
      continue;
    }

    let firstOcurrencyPosition: number | undefined = undefined;
    let lastOcurrencyPosition: number | undefined = undefined;
    for (let i = 0; i < listTwo.length; i++) {
      if (!firstOcurrencyPosition) {
        if (listTwo[i] === element) firstOcurrencyPosition = i;
        continue;
      }

      if (listTwo[i] !== element) {
        lastOcurrencyPosition = i;
        similarityScore += element * (lastOcurrencyPosition - firstOcurrencyPosition);
        similarityScoreHashTable[element] = element * (lastOcurrencyPosition - firstOcurrencyPosition);
        break;
      }
    }
  }

  return similarityScore;
}
