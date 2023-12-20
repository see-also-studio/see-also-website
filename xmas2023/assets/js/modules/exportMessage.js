import { scramble } from './stringScramble.js';
import { hashCode } from './hashCode.js';

export default function exportMessage(content = {}) {
  const url = location.protocol + '//' + location.host + location.pathname;
  let urlParams = '';
  let toHash = '';
  let first = true;
  
  for (const item in content) {
    const scrambledValue = scramble(content[item]);
    toHash = `${toHash}${scrambledValue}`;
    urlParams = `${ urlParams }${ first === true ? '?' : '&' }${ item }=${ scrambledValue }`;
    first = false;
  }

  const hash = hashCode(toHash);
  const fullUrl = `${ url }${ urlParams }&v=${ hash }`;
  
  return fullUrl;
}
