export function unscramble(string, reverse = false) {
  const characters = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', ' ', '.', ',', '!', '?', '&', '(', ')', '<', '>', '–', '-', '\'', '/', 'Š', 'á', 'é'];
  const charactersScrambled = ['k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', 'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '–', '-', '\'', '/', 'Š', 'á', 'é'];

  const result = [];

  for (let i = 0; i < string.length; i++) {
    for (let x = 0; x < characters.length; x++) {
      if (string[i] === (reverse ? characters : charactersScrambled)[x]) {
        result.push((!reverse ? characters : charactersScrambled)[x]);
      }
    }
  }

  return result.join('');
}

export function scramble(string) {
  return unscramble(string, true);
}
