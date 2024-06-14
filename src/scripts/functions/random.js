// return random number between min and max
export function randomFromRange(min, max, decimalPlaces = 0) {
  if (min >= max) {
    throw new Error('The value of min must be less than the value of max.');
  }
  if (decimalPlaces < 0) {
    throw new Error('decimalPlaces must be a positive integer.');
  }

  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimalPlaces));
}

// return random from array
export function randomFromArray(array) {
  return array[randomFromRange(0, array.length - 1)];
}

