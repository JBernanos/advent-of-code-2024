import * as fs from "fs";

export default (): void => {
  console.log(`[Puzzle 3] - Part one result: ${partOne()}`);
};

function handleInput(): string {
  return fs.readFileSync("./data/puzzle-three-input.txt", "utf-8");
}

function partOne(): number {
  const input: string = handleInput();

  let multiplicationResult: number = 0;
  let currentString: string = "";
  for (const element of input) {
    if (!isValidCharacter(element)) {
      currentString = "";
      continue;
    }

    if (element === "m" && currentString === "") currentString += element;

    if (element === "u" && currentString[currentString.length - 1] === "m") currentString += element;

    if (element === "l" && currentString[currentString.length - 1] === "u") currentString += element;

    if (element === "(" && currentString[currentString.length - 1] === "l") currentString += element;

    if (element === "," && isDigit(currentString[currentString.length - 1])) currentString += element;

    if (isValidDigit(element, currentString)) currentString += element;

    if (element === ")" && isDigit(currentString[currentString.length - 1])) {
      currentString += element;

      if ((currentString.match(/,/g) || []).length != 1) {
        currentString = "";
        continue;
      }

      const firstNumber: number = Number(currentString.split(",")[0].split("(")[1]);
      const secondNumber: number = Number(currentString.split(",")[1].split(")")[0]);

      if (firstNumber <= 999 && secondNumber <= 999) multiplicationResult += firstNumber * secondNumber;

      currentString = "";
    }
  }

  return multiplicationResult;
}

function isValidCharacter(character: string): boolean {
  return isDigit(character) || ["m", "u", "l", "(", ",", ")"].includes(character);
}

function isDigit(c: string): boolean {
  return c >= "0" && c <= "9";
}

function isValidDigit(digit: string, currentString: string) {
  return (
    isDigit(digit) &&
    (currentString[currentString.length - 1] === "(" || currentString[currentString.length - 1] === "," || isDigit(currentString[currentString.length - 1]))
  );
}
