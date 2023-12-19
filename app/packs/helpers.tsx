import { CardData, CardWeighted } from './types';

// Fisher Yates
export function shuffleArray(array: CardData[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function pickUniqueRandomObjects(array: CardData[], count: number) {
  // Make a copy of the array to avoid modifying the original array
  const shuffledArray = shuffleArray([...array]);

  // Return the first 'count' elements
  return shuffledArray.slice(0, count);
}

// Array of single object based on weighted probability
export function weightedRandomSelection(array: CardWeighted[]) {
  const totalWeight = array.reduce((acc, obj) => acc + obj.probability, 0);
  let randomNum = Math.random() * totalWeight;

  for (const obj of array) {
    if (randomNum < obj.probability) {
      return [obj];
    }
    randomNum -= obj.probability;
  }
  return [];
}
