import { draggable } from './include/draggable';
import { audioToggleButton } from './include/audioButton';
import { fadeOutAll, fadeInAll } from './screensaver/screensaver-core';
import { start, onActive, onInactive } from './screensaver/afk-detector';
import { cycleHidden } from './include/cyclehidden';
import { initClickSound, playClick } from './include/click-sound';

console.log('xmas2025');

document.querySelectorAll('.draggable').forEach((element) => draggable(element));

// const sound = document.querySelector(".button-sound");
// const volume = sound?.dataset.volume;
// if (sound && volume !== undefined) {
//   sound.volume = Math.max(0, Math.min(1, parseFloat(volume)));
// }

// document.querySelectorAll('.button').forEach(btn => {
//   audioToggleButton(btn, { fadeDuration: 600 });
//   btn.addEventListener('click', () => {
//     if (!sound) return;
//     sound.currentTime = 0;
//     sound.play();
//   });
// });  await initClickSound('media/audio/button.mp3');


document.addEventListener('DOMContentLoaded', () => {
  // Preload click sound asynchronously — does NOT block
  initClickSound('media/audio/button.mp3');

  document.querySelectorAll('.button').forEach(btn => {
    // Existing toggle audio logic runs immediately
    audioToggleButton(btn, { fadeDuration: 600 });

    // Play click sound when button is pressed
    btn.addEventListener('click', () => {
      playClick(0.5); // optional volume
    });
  });
});

// const date = new Date();
// const dateEl = document.querySelector('.datetime');
// dateEl.innerText = getDateString(date);

// function getDateString(date) {
//   const day = ('0' + date.getDate().toString()).slice(-2);
//   const month = ('0' + (date.getMonth() + 1).toString()).slice(-2);
//   const year = date.getFullYear().toString().slice(-2);
//   const hour = ('0' + date.getHours().toString()).slice(-2);
//   const minute = ('0' + date.getMinutes().toString()).slice(-2);
//   const dateString = `${day}/${month}/${year}\n${hour}:${minute}`;
//   return dateString;
// }

document.querySelectorAll(".message").forEach(message => {
  cycleHidden(message);
  // message.querySelectorAll('button').forEach(btn => {
  //   btn.addEventListener("click", () => {
  //     if (!sound) return;
  //     sound.currentTime = 0;
  //     sound.play();
  //   });
  // });
});

const initialEvents = ['pointerdown', 'keydown', 'touchstart',];
onActive(() => fadeOutAll());
onInactive(() => fadeInAll());
start({ timeout: 12000, initialEvents });

