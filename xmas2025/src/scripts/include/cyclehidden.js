export const cycleHidden = (messageEl) => {
  const inners = Array.from(
    messageEl.querySelectorAll('.message__inner')
  );
  const button = messageEl.querySelector('.message__button');

  if (!inners.length || !button) return;

  let index = inners.findIndex(el => !el.hasAttribute('hidden'));
  if (index === -1) index = 0;

  const showAtIndex = i => {
    inners.forEach((el, idx) => {
      if (idx === i) {
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', '');
      }
    });
  };

  button.addEventListener('click', () => {
    index = (index + 1) % inners.length;
    showAtIndex(index);
  });
};
