import { delay, shuffle } from '../functions/utils.js';

let currentRunId = 0;
let currentMode = 'visible';

const STAGGER_MS = 285;

function getContainers() {
  return document.querySelectorAll('.fade-group');
}

/**
 * Sequentially fades items in or out
 * @param {HTMLElement[]} items - array of container items
 * @param {boolean} hide - true = fade out, false = fade in
 * @param {number} runId - current run ID for cancellation
 * @param {HTMLElement} container - container element (used for optional delay)
 */
async function runSequence(items, hide, runId, container) {
  // Read delay attribute
  const delayAttr = container.getAttribute('delay');
  const initialDelay = delayAttr ? parseInt(delayAttr, 10) : 0;

  if (initialDelay > 0) {
    await delay(initialDelay); // wait before starting sequence
    document.body.classList.add('first-run');
  }

  for (const item of items) {
    if (runId !== currentRunId) return;

    item.classList.toggle('is-hidden', hide);

    await delay(STAGGER_MS);
  }
}

export function fadeOutAll() {
  if (currentMode === 'fading-out' || currentMode === 'hidden') return;

  currentMode = 'fading-out';
  const runId = ++currentRunId;

  const containers = getContainers();
  containers.forEach(container => {
    // shuffle for random order
    const items = shuffle([...container.querySelectorAll('.fade-group__item')]);
    runSequence(items, true, runId, container);
  });
}

export function fadeInAll() {
  if (currentMode === 'fading-in' || currentMode === 'visible') return;

  currentMode = 'fading-in';
  const runId = ++currentRunId;

  const containers = getContainers();
  containers.forEach(container => {
    const items = shuffle([...container.querySelectorAll('.fade-group__item')]);
    runSequence(items, false, runId, container);
  });
}
