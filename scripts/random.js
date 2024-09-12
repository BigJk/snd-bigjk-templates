/**
 * Shuffle an array
 * @param {any[]} arr - The array to shuffle
 * @returns The shuffled array
 */
function shuffle(arr) {
  let i = arr.length;
  while (i) {
    let j = Math.floor(random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    i--;
  }
  return arr;
}

/**
 * Pick a random element from an array
 * @param {any[]} arr - The array to pick from
 * @returns The random element
 */
function pickRandom(arr) {
  return arr[Math.floor(random() * arr.length)];
}

/**
 * Pick n random elements from an array without repeating
 * @param {any[]} arr - The array to pick from
 * @param {number} n - The number of elements to pick
 */
function pickRandomN(arr, n) {
  if (n >= arr.length) {
    return arr;
  }
  if (n === 0) {
    return [];
  }
  return shuffle([...arr]).slice(0, n);
}

/**
 * Pick a random element from an array with weights
 * @param {any[]} arr - The array to pick from
 * @param {number[]} weights - The weights of the elements as numbers
 * @returns The random element
 */
function pickRandomByWeight(arr, weights) {
  let totalWeight = weights.reduce((a, b) => a + b, 0);
  let randomNum = random() * totalWeight;
  for (let i = 0; i < arr.length; i++) {
    randomNum -= weights[i];
    if (randomNum <= 0) {
      return arr[i];
    }
  }
}

/**
 * Shortcut for rolling a dice
 * @param {string} diceStr - The dice to roll (e.g. '2d6 + 5')
 */
function roll(diceStr) {
  return dice.roll(diceStr).total;
}

window._bigjk ??= {};
window._bigjk.random = true;

console.log("random.js loaded");
