import exportMessage from "./modules/exportMessage.js";
import { getUrlParameter } from "./modules/getUrlParameters.js";
import { verifyHash } from "./modules/hashCode.js";
import { unscramble } from "./modules/stringScramble.js";
import audio from "./modules/audio.js";
window.exportMessage = exportMessage;

const nameScrambled = getUrlParameter('a');
const verify = verifyHash(nameScrambled, getUrlParameter('v'));
const name = unscramble(nameScrambled);

if (verify) {
  const greetingTextContainer = document.querySelector('.greeting-text > div');
  greetingTextContainer.parentNode.classList.add('custom');
  greetingTextContainer.innerHTML = `Dear ${name}. Happy holidays! A&nbsp;little greeting to you that's a bit OTT & all over because hey, holiday spirit? Wishing you & yours a lovely festive time & a really good new year ahead.<br>See,&nbsp;Also x`;
}

/**
 * Audio
 */
audio(document.body, {
  audioSelector: '.audio-player',
  buttonSelector: '.audio-button',
});

/**
 * Modal
 */
const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const closeModalButton = modal.querySelector("button");

modalButton.addEventListener('click', function() {
  modal.showModal();
  modal.scrollTo(0, 0);
});

closeModalButton.addEventListener('click', function() {
  modal.close();
});

modal.addEventListener('click', function() {
  modal.close();
});
