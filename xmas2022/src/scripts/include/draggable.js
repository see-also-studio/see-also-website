import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export function draggable(element, bounds = null) {
  Draggable.create(element, {
    zIndexBoost: true,
    bounds: document.querySelector(bounds),
  });
}
