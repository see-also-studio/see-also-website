export function hashCode(text) {
  let hash = 0
  let i;
  let chr;
  
  if (text.length === 0) {
    return hash;
  }

  for (i = 0; i < text.length; i++) {
    chr   = text.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function verifyHash(compare, hash) {
  const hashedCompare = hashCode(compare);

  if (hashedCompare == hash) {
    return true;
  } else {
    console.error('Url parameters do not match hash');
    return false;
  }
}
