import interact from 'interactjs'

export function draggable(element, bounds = null) {
  interact(element).draggable({
    listeners: {
      move (event) {
        let el = event.target;
        let x = (parseFloat(el.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(el.getAttribute('data-y')) || 0) + event.dy;
        el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0) rotate(-6deg)';
        el.setAttribute('data-x', x);
        el.setAttribute('data-y', y);
      },
    },
    cursorChecker() {
      return 'grab';
    },
  });
}
