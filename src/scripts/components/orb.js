import { randomFromRange, randomFromArray } from "../functions/random";

export function orbPosition(el) {
  console.log('Randomizing orbs');
  const orientation = randomFromRange(0, 1); // 0 = left/right, 1 = top/bottom
  const x = orientation 
    ? `${randomFromArray([`calc(0% - ${randomFromRange(1.7, 5, 1)}em)`, `calc(100% + ${randomFromRange(1.7, 5, 1)}em)`])}`
    : `${randomFromRange(0, 50)}%`;
  const y = orientation 
    ? `${randomFromRange(0, 100)}%` 
    : `${randomFromArray([`calc(0% - ${randomFromRange(1.7, 5, 1)}em)`, `calc(100% + ${randomFromRange(1.7, 5, 1)}em)`])}`;
  el.style.setProperty('--left', x);
  el.style.setProperty('--top', y);
}
