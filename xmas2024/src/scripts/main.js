import { draggable } from './include/draggable';
import { Marquee, loop } from 'dynamic-marquee';

console.log('xmas2024');

document.querySelectorAll('.draggable').forEach((element) => draggable(element));

document.querySelectorAll('.marquee').forEach(function(element) {
  const speed = element.getAttribute('data-speed') || 0;
  const marquee = new Marquee((element), {
    rate: speed,
    startOnScreen: true,
  });
  const seperatorText = '&nbsp&nbsp&nbsp&nbsp*&nbsp&nbsp&nbsp&nbsp';
  const control = loop(marquee, [
    () => `New! Seasonal special`,
    () => {
      const seperator = document.createElement('div');
      seperator.innerHTML = seperatorText;
      return seperator;
    },
    () => `Enable sound`,
    () => {
      const seperator = document.createElement('div');
      seperator.innerHTML = seperatorText;
      return seperator;
    },
    () => `Today's festive greeting now available`,
    () => {
      const seperator = document.createElement('div');
      seperator.innerHTML = seperatorText;
      return seperator;
    },
    () => `Enable sound`,
    () => {
      const seperator = document.createElement('div');
      seperator.innerHTML = seperatorText;
      return seperator;
    },
    () => `Special offer on clementines`,
    () => {
      const seperator = document.createElement('div');
      seperator.innerHTML = seperatorText;
      return seperator;
    },
    () => `Enable sound`,
    () => {
      const seperator = document.createElement('div');
      seperator.innerHTML = seperatorText;
      return seperator;
    },
  ]);
  element.addEventListener('mouseenter', () => {
    marquee.setRate(0);
  });
  element.addEventListener('mouseleave', () => {
    marquee.setRate(speed);
  });
});

const imageFiles = {
  clem1: '/xmas2024/media/images/01clem.png',
  clem2: '/xmas2024/media/images/02clem.png',
  clem3: '/xmas2024/media/images/03clem.png',
  clem4: '/xmas2024/media/images/04clem.png',
  clem5: '/xmas2024/media/images/05clem.png',
  clem6: '/xmas2024/media/images/06clem.png',
  clem7: '/xmas2024/media/images/07clem.png',
  clem8: '/xmas2024/media/images/08clem.png',
};

const notes = {
  one: {
    note: 'one',
    audio: 'c4',
    image: imageFiles.clem3,
  },
  two: {
    note: 'two',
    audio: 'f4',
    image: imageFiles.clem2,
  },
  three: {
    note: 'three',
    audio: 'f4',
    image: imageFiles.clem1,
  },
  four: {
    note: 'four',
    audio: 'g4',
    image: imageFiles.clem4,
  },
  five: {
    note: 'five',
    audio: 'f4',
    image: imageFiles.clem5,
  },
  six: {
    note: 'six',
    audio: 'e4',
    image: imageFiles.clem6,
  },
  seven: {
    note: 'seven',
    audio: 'd4',
    image: imageFiles.clem7,
  },
  eight: {
    note: 'eight',
    audio: 'd4',
    image: imageFiles.clem8,
  },
};

const audioFiles = {
  c4: '/xmas2024/media/audio/glockenspiel-c1.mp3',
  d4: '/xmas2024/media/audio/glockenspiel-d1.mp3',
  e4: '/xmas2024/media/audio/glockenspiel-e1.mp3',
  f4: '/xmas2024/media/audio/glockenspiel-f1.mp3',
  g4: '/xmas2024/media/audio/glockenspiel-g1.mp3',
  a4: '/xmas2024/media/audio/glockenspiel-a1.mp3',
  asharp4: '/xmas2024/media/audio/glockenspiel-asharp1.mp3',
  register: '/xmas2024/media/audio/register.mp3',
};

const sequence = [
  {//1
    note: notes.one,
    file: 'c4',
  },
  {//2
    note: notes.two,
    file: 'f4',
  },
  {//3
    note: notes.three,
    file: 'f4',
  },
  {//4
    note: notes.four,
    file: 'g4',
  },
  {//5
    note: notes.five,
    file: 'f4',
  },
  {//6
    note: notes.six,
    file: 'e4',
  },
  {//7
    note: notes.seven,
    file: 'd4',
  },
  {//8
    note: notes.eight,
    file: 'd4',
  },
  {//1
    note: notes.one,
    file: 'd4',
  },
  {//2
    note: notes.two,
    file: 'g4',
  },
  {//3
    note: notes.three,
    file: 'g4',
  },
  {//4
    note: notes.four,
    file: 'a4',
  },
  {//5
    note: notes.five,
    file: 'g4',
  },
  {//6
    note: notes.six,
    file: 'f4',
  },
  {//7
    note: notes.seven,
    file: 'e4',
  },
  {//8
    note: notes.eight,
    file: 'c4',
  },
  {//
    action: 'reset',
    file: 'register',
  },
];
const notesElContainer = document.querySelector('.notes');

let sequenceCurrent = 0;

for (const item of Object.keys(notes)) {
  const noteEl = document.createElement('div');
  noteEl.classList.add('notes__item');
  noteEl.setAttribute('data-note', item);
  if (sequence[0].note.note !== item) {//////////////
    noteEl.classList.add('init');
  }
  if (notes[item].image) {
    const imageEl = document.createElement('img');
    imageEl.src = notes[item].image;
    imageEl.alt = 'A clementine';
    noteEl.appendChild(imageEl);
  }
  notesElContainer.appendChild(noteEl);
}

let audioContext;
const audioBuffers = {};
let backgroundAudio = false;
let audioContextInitialized = false;

const inputListener = async (event) => {
  if (!audioContextInitialized) {
    await initializeAudio();
  }
  if (!event.target.closest('.draggable')) {
    const current = sequence[sequenceCurrent];
    if (current.action === 'reset') {
      reset();
    }

    if (current.file) {
      console.log(`${sequenceCurrent + 1}/${sequence.length}, ${sequence[sequenceCurrent].file}`);
      playAudio(current.file);
    }

    if (current.note) {
      triggerObject(current.note.note, (current.duration || 200));
    }
    
    if (sequenceCurrent < sequence.length - 1) {
      sequenceCurrent ++;
    } else {
      sequenceCurrent = 0;
    }
  } else {
    console.log('Draggable object');
  }
};

function reset() {
  console.log('Reset');
  [...notesElContainer.children].forEach((el) => {
    el.classList.add('init');
  });

}

document.addEventListener('mousedown', inputListener);

async function initializeAudio() {
  console.log('initialize audio');
  audioContextInitialized = true;
  // Initialize AudioContext and preload on first interaction
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    await preloadAudioFiles();
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
    console.log('AudioContext resumed');
  }
  if (!backgroundAudio) {
    backgroundAudio = true;
    console.log('start bg');
    playAudioLoop('/xmas2024/media/audio/music.mp3', 0.25, 0.3);
    playAudioLoop('/xmas2024/media/audio/cashiers.mp3', 0.8, 0.3);
  }
}

function triggerObject(note, duration) {
  const currentNoteEl = notesElContainer.querySelector(`*[data-note="${note}"]`);
  currentNoteEl.classList.remove('init');
  if (currentNoteEl._timeout) {
    clearTimeout(currentNoteEl._timeout);
  }
  currentNoteEl.classList.add('active');
  currentNoteEl._timeout = setTimeout(() => {
    currentNoteEl.classList.remove('active');
    delete currentNoteEl._timeout;
  }, duration);
}

async function preloadAudioFiles() {
  for (const [key, url] of Object.entries(audioFiles)) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers[key] = audioBuffer;
    } catch (error) {
      console.error(`Unable to fetch the audio file, Error: ${error.message}`);
    }
  }
  console.log('Audio chimes preloaded');
}

function playAudio(key) {
  if (audioBuffers[key]) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffers[key];
      source.connect(audioContext.destination);
      source.start(0);
  } else {
      console.error(`Audio with key "${key}" not found`);
  }
}

async function playAudioLoop(url, targetVolume, fadeDuration) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start at 0 volume

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = true;

  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  source.start(0);

  // Gradually increase the volume to the target over fadeDuration
  gainNode.gain.linearRampToValueAtTime(targetVolume, audioContext.currentTime + fadeDuration);
  console.log(`Looping audio: ${url}`);
}

const date = new Date();
const dateEl = document.querySelector('.datetime');
dateEl.innerText = getDateString(date);

function getDateString(date) {
  const day = ('0' + date.getDate().toString()).slice(-2);
  const month = ('0' + (date.getMonth() + 1).toString()).slice(-2);
  const year = date.getFullYear().toString().slice(-2);
  const hour = ('0' + date.getHours().toString()).slice(-2);
  const minute = ('0' + date.getMinutes().toString()).slice(-2);
  const dateString = `${day}/${month}/${year}\n${hour}:${minute}`;
  return dateString;
}
