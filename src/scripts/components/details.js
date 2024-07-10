export function details(el, settings = {}) {
  const details = el;
  const summary = details.querySelector('summary');
  const content = details.querySelector('summary + *');

  let animation = null;
  let isClosing = false;
  let isExpanding = false;

  summary.addEventListener('click', (evt) => onClick(evt));

  if (el.classList.contains('details--moreless')) {
    const lessButton = document.createElement('button');
    lessButton.setAttribute('title', 'Less');
    lessButton.appendChild(document.createElement('span'));
    lessButton.addEventListener('click', (evt) => onClick(evt));
    content.appendChild(lessButton);
  }

  function onClick(evt) {
    evt.preventDefault();
    details.style.overflow = 'hidden';

    if (isClosing || !details.open) {
      open();
    } else if (isExpanding || details.open) {
      shrink();
    }
  }

  function shrink() {
    isClosing = true;
    const startHeight = `${details.offsetHeight}px`;
    const endHeight = `${summary.offsetHeight}px`;
    if (animation) {
      animation.cancel();
    }
    animation = details.animate({
      height: [startHeight, endHeight],
    }, {
      duration: 400,
      easing: 'ease-out',
    });
    animation.onfinish = () => onAnimationFinish(false);
    animation.oncancel = () => isClosing = false;
  }

  function open() {
    details.style.height = `${details.offsetHeight}px`;
    details.open = true;
    window.requestAnimationFrame(() => expand());
  }

  function expand() {
    isExpanding = true;
    const startHeight = `${details.offsetHeight}px`;
    const endHeight = `${content.offsetHeight + summary.offsetHeight}px`;

    if (animation) {
      animation.cancel();
    }
    animation = details.animate({
      height: [startHeight, endHeight],
    }, {
      duration: 400,
      easing: 'ease-out',
    });
    animation.onfinish = () => onAnimationFinish(true);
    animation.oncancel = () => isExpanding = false;
  }

  function onAnimationFinish(open) {
    details.open = open;
    animation = null;
    isClosing = false;
    isExpanding = false;
    details.style.height = details.style.overflow = '';
  }
}
