import { randomFromRange } from "../functions/random";

export function orbPosition(el) {
  console.log('Randomizing orbs');
  const orientation = randomFromRange(0, 1); // 0 = left/right, 1 = top/bottom
  const x = orientation ? randomFromRange(0, 1) * 100 : randomFromRange(0, 100);
  const y = orientation ? randomFromRange(0, 100) : randomFromRange(0, 1) * 100;
  el.style.setProperty('--left', x + '%');
  el.style.setProperty('--top', y + '%');
}
