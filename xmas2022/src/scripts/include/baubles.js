import {randomRange} from '../functions/randomRange';

let baubles = 0;

export function bauble(baubleContainer, pattern = []) {
  if (baubles > 18) {
    console.log('Max baubles already reached');
    baubleContainer.classList.remove('active');
    return;
  }

  baubles ++;

  const baubleElement = createBauble(pattern);
  console.log(baubleElement);
  baubleContainer.appendChild(baubleElement);
}

function createBauble(pattern) {
  const patterns = pattern.length ? pattern : ['00', '01', '02', '03', '04', '06', '09', '13', '14', '15', '16', '17', '18', '19'];
  const colors = ['#3A8342', '#34BE41', '#6EA474', '#04680E', '#04680E', '#04680E', '#04680E'];

  const randomPattern = patterns[randomRange(0, patterns.length, true)];
  const randomSize = randomRange(14, 18);
  const randomColor = colors[randomRange(0, colors.length, true)];

  const randomXDuration = randomRange(25, 45);
  const randomYDuration = randomRange(25, 45);
  const randomRotateDuration = randomRange(10, 25);

  const randomXDelay = randomRange(0, randomXDuration * -1);
  const randomYDelay = randomRange(0, randomYDuration * -1);
  const randomRotateDelay = randomRange(0, randomRotateDuration * -1);

  const baubleElement = document.createElement('div');

  const styles = {
    '--mask-image': `url('/media/patterns/${randomPattern}.svg')`,
    '--color--fg':  '#fff',
    '--color--bg':  randomColor,
    '--width':  randomSize + 'em',
  
    '--durationX':  randomXDuration + 's',
    '--durationY': randomYDuration + 's',
    '--delayX': randomXDelay + 's',
    '--delayY': randomYDelay + 's',
  
    '--durationR': randomRotateDuration + 's',
    '--delayR': randomRotateDelay + 's',
  };

  // Object.assign(baubleElement.style, styles);

  baubleElement.style.setProperty('--mask-image', `url('/media/patterns/${randomPattern}.svg')`);
  baubleElement.style.setProperty('--color--fg',  '#fff');
  baubleElement.style.setProperty('--color--bg',  randomColor);
  baubleElement.style.setProperty('--width',  randomSize + 'em');

  baubleElement.style.setProperty('--durationX',  randomXDuration + 's');
  baubleElement.style.setProperty('--durationY', randomYDuration + 's');
  baubleElement.style.setProperty('--delayX', randomXDelay + 's');
  baubleElement.style.setProperty('--delayY', randomYDelay + 's');

  baubleElement.style.setProperty('--durationR', randomRotateDuration + 's');
  baubleElement.style.setProperty('--delayR', randomRotateDelay + 's');


  baubleElement.classList.add('ball');

  return baubleElement;
}
