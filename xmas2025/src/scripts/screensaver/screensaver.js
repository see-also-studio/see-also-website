import { fadeOutAll, fadeInAll } from './screensaver-core.js';

// Example wiring (replace with your library)
document.addEventListener('pointerdown', fadeOutAll);

// Example inactivity trigger
window.addEventListener('screensaver:activate', fadeInAll);

// Optional export if you want manual control elsewhere
export { fadeOutAll, fadeInAll };
