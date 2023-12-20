export default function audio(element, settings = {}) {
  const volumeStep = settings.volumeStep || 0.025;
  const audioElement = element.querySelector(settings.audioSelector || 'audio');
  const audioButton = element.querySelector(settings.buttonSelector || 'button');
  let status = 'paused'; // playing, paused, resuming, stopping
  let fadeInterval = null;
  audioElement.volume = 0;
  audioButton.addEventListener('click', toggle);

  function toggle() {
    audioElement.classList.toggle('playing');
    clearInterval(fadeInterval);
    if (status === 'paused') {
      fadeInterval = setInterval(fadeIn, 20);
    } else {
      fadeInterval = setInterval(fadeOut, 15);
    }
  }

  function fadeIn() {
    status = 'playing';

    if (audioElement.paused) {
      audioElement.play();
    }

    if (audioElement.volume + volumeStep >= 1) {
      audioElement.volume = 1;
      clearInterval(fadeInterval);
    } else {
      audioElement.volume += volumeStep;
    }
  }

  function fadeOut() {
    status = 'paused';

    if (audioElement.volume - volumeStep <= 0) {
      audioElement.volume = 0;
      audioElement.pause();
      clearInterval(fadeInterval);
    } else {
      audioElement.volume -= volumeStep;
    }
  }
}
