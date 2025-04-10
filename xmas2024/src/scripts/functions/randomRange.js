export function randomRange(min = 1, max = 100, int = false) {
  if (int) {
    return Math.floor(Math.random() * (max - min) + min);
  } else {
    return Math.random() * (max - min) + min;
  }
}
