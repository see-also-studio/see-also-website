export const audioToggleButton = (button, options = {}) => {
  const audios = button.closest('.audio__item').querySelectorAll('audio');
  if (!audios.length) return;

  const fadeDuration = options.fadeDuration ?? 500; // ms
  const fadeStepTime = 20;
  const fadeSteps = Math.ceil(fadeDuration / fadeStepTime);

  let fadeIntervals = []; // one interval per audio

  // Detect iOS (modern, reliable)
  const IS_IOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const fadeIn = () => {
    fadeIntervals.forEach(i => clearInterval(i));
    fadeIntervals = [];

    audios.forEach(audio => {
      const maxVol = parseFloat(audio.getAttribute('data-volume')) || 1;

      if (IS_IOS) {
        // iOS: resume from pause at full volume
        audio.volume = maxVol;
        const p = audio.play();
        if (p && p.catch) p.catch(() => {});
        return;
      }

      // Desktop: fade in volume
      audio.volume = 0;
      const p = audio.play();
      if (p && p.catch) p.catch(() => {});

      const volumeStep = maxVol / fadeSteps;
      const interval = setInterval(() => {
        audio.volume = Math.min(maxVol, audio.volume + volumeStep);
        if (audio.volume >= maxVol) clearInterval(interval);
      }, fadeStepTime);

      fadeIntervals.push(interval);
    });
  };

  const fadeOut = () => {
    fadeIntervals.forEach(i => clearInterval(i));
    fadeIntervals = [];

    audios.forEach(audio => {
      if (IS_IOS) {
        // iOS: pause instantly but do NOT reset currentTime
        audio.pause();
        return;
      }

      const maxVol = parseFloat(audio.getAttribute('data-volume')) || 1;
      const volumeStep = maxVol / fadeSteps;

      const interval = setInterval(() => {
        audio.volume = Math.max(0, audio.volume - volumeStep);
        if (audio.volume <= 0) {
          audio.pause();
          clearInterval(interval);
        }
      }, fadeStepTime);

      fadeIntervals.push(interval);
    });
  };

  button.addEventListener('click', () => {
    const isEnabled = button.hasAttribute('enabled');

    if (isEnabled) {
      button.removeAttribute('enabled');
      fadeOut();
    } else {
      button.setAttribute('enabled', '');
      fadeIn();
    }
  });
};
