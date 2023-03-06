export function audio(element, settings = {}) {
  const volumeStep = settings.volumeStep || 0.025;
  const audioElement = element.querySelector(settings.audioSelector || 'audio');
  const audioButton = element.querySelector(settings.buttonSelector || 'button');
  let status = 'paused'; // playing, paused, resuming, stopping
  let fadeInterval = null;

  audioElement.volume = 0;
  audioButton.addEventListener('click', toggle);

  function toggle() {
    clearInterval(fadeInterval);
    if (status === 'paused') {
      fadeInterval = setInterval(fadeIn, 50);
    } else {
      fadeInterval = setInterval(fadeOut, 50);
    }
  }

  function fadeIn() {
    console.log(audioElement.volume);
    status = 'playing';

    if (audioElement.paused) {
      audioElement.play();
    }

    if (audioElement.volume + volumeStep >= 1) {
      console.log('Audio max volume');
      audioElement.volume = 1;
      clearInterval(fadeInterval);
    } else {
      audioElement.volume += volumeStep;
    }
  }

  function fadeOut() {
    console.log(audioElement.volume);
    status = 'paused';

    if (audioElement.volume - volumeStep <= 0) {
      console.log('Audio paused');
      audioElement.volume = 0;
      audioElement.pause();
      clearInterval(fadeInterval);
    } else {
      audioElement.volume -= volumeStep;
    }
  }
}
