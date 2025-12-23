let audioCtx;
let clickBuffer = null;

/**
 * Initialize click sound asynchronously
 * @param {string} url - path to click sound file
 */
export const initClickSound = (url) => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // fetch and decode asynchronously, do not block main thread
  fetch(url)
    .then(res => res.arrayBuffer())
    .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
    .then(buffer => {
      clickBuffer = buffer;
    })
    .catch(err => {
      console.warn('Click sound failed to load', err);
    });
};

/**
 * Play click sound instantly
 * Safe to call even if buffer is not yet loaded
 */
export const playClick = (volume = 1) => {
  if (!clickBuffer || !audioCtx) return; // fail silently if not ready

  if (audioCtx.state === 'suspended') audioCtx.resume();

  const source = audioCtx.createBufferSource();
  source.buffer = clickBuffer;

  const gainNode = audioCtx.createGain();
  gainNode.gain.value = Math.max(0, Math.min(1, volume));

  source.connect(gainNode).connect(audioCtx.destination);
  source.start(0);
};
