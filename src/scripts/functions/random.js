// return random number between min and max
export function randomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

