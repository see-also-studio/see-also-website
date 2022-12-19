import {getUrlParameter} from './include/getUrlParameters';
import {unscramble} from './include/stringScramble';
import {verifyHash} from './include/hashCode';
import {audio} from './include/audio';
import {draggable} from './include/draggable';
import {bauble} from './include/baubles';

console.log('xmas2022');

const scrambledRecipient = getUrlParameter('r');
const scrambledContent = getUrlParameter('c');
const validationString = getUrlParameter('v');
const isValid = verifyHash(scrambledRecipient + scrambledContent, validationString)
const recipient = unscramble(scrambledRecipient);
const content = unscramble(scrambledContent);

if (!isValid) {
  console.error('Url parameters are invalid.');
} else {
  const recipientEl = document.body.querySelector('.message__recipient');
  const contentEl = document.body.querySelector('.message__content-text');
  recipientEl.innerHTML = recipient;
  contentEl.innerHTML = content;
}

const messageElement = document.querySelector('.message');
messageElement.addEventListener('click', (el) => { el.currentTarget.classList.remove('click') });

const introEl = document.body.querySelector('.intro');
introEl.addEventListener('click', () => introEl.classList.add('inactive'));
introEl.addEventListener('wheel', () => introEl.classList.add('inactive'));

audio(document.querySelector('.audio'));

document.querySelectorAll('.message, .info').forEach((element) => draggable(element));

const baubleContainer = document.querySelector('.background');
const startPatterns = ['00', '19', '17', '15', '01'];
const startColors = ['#04680E','#C33636', '#3660B0', '#C3A436', '#4F7462'];
baubleContainer.addEventListener('click', () => bauble(baubleContainer));
startPatterns.forEach((pattern, i) => bauble(baubleContainer, [pattern], [startColors[i]]));
