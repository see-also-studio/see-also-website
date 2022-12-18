import {scramble} from './stringScramble';
import {hashCode} from './hashCode';

export function exportMessage(recipient, content) {
  console.log('Write mode: ');
  console.log(recipient);
  console.log(content);
  //const url = 'https://www.see-also.com/xmas2022/';
  const url = 'http://localhost:8000/';
  const r = scramble(recipient);
  const c = scramble(content);
  const v = hashCode(r + c);
  const fullUrl = url + '?r=' + r + '&c=' + c + '&v=' + v;
  return fullUrl;
}
