console.log('main.js');

const recipient = decodeURIComponent(getUrlParam('r'));
const content = decodeURIComponent(getUrlParam('c'));
const validation = decodeURIComponent(getUrlParam('v'));
const reverse = decodeURIComponent(getUrlParam('w'));

if (reverse === 'write') {
  console.log('Write mode: ');
  console.log(recipient);
  console.log(content);
  let url = 'https://www.see-also.com';
  //url = 'http://localhost:8080'
  const r = scramble(recipient, true);
  const c = scramble(content, true);
  const v = hashCode(r + c);
  console.log('Validation check: ');
  console.log(validateUrl(r, c, v));
  console.log('Link: ');
  console.log(url + '/xmas2021/?r=' + r + '&c=' + c + '&v=' + v);
}

if (recipient !== undefined && content !== undefined && validation !== undefined) {
  if (validateUrl(recipient, content, validation)) {
    console.log('Url is valid');
    document.documentElement.classList.add('custom');
    document.querySelector('#name').innerHTML = scramble(recipient);
    document.querySelector('#content').innerHTML = scramble(content);
  } else {
    console.log('Url is invalid');
  }
}

function scramble(str, create = false) {
  const chars = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', ' ', '.', ',', '!', '?', '&', '(', ')', '<', '>', '–', '-', '\'', '/', 'Š', 'á', 'é'];
  const charsScrambled = ['k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', 'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '–', '-', '\'', '/', 'Š', 'á', 'é'];

  let result = [];

  for (let i = 0; i < str.length; i++) {
    for (let x = 0; x < chars.length; x++) {
      if (str[i] === (create ? chars : charsScrambled)[x]) {
        result.push((!create ? chars : charsScrambled)[x]);
      }
    }
  }
  result = result.join('');

  if (create) {
    encodeURIComponent(result);
  }

  return result;
}

function getUrlVars() {
  let vars = {};
  const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter, defaultvalue = false){
  let urlparameter = defaultvalue;
  if(window.location.href.indexOf(parameter) > -1){
    urlparameter = getUrlVars()[parameter];
  }

  return urlparameter;
}

function validateUrl(r, c, validation) {
  const valid = hashCode(r + c);

  if (valid == validation) {
    return true;
  } else {
    return false;
  }
}



/**
 * Snow button
 */

var audioEnabled = false;

document.querySelector('#snow-button').addEventListener('click', function() {
  var audio = document.querySelector('#audio');

  if(this.classList.contains('mute__muted')) {
    if (audio) {
      toggleAudio(audio, true);
    }
    this.classList.remove('mute__muted');
    audioEnabled = true;
  } else {
    if (audio) {
      toggleAudio(audio, false);
    }
    this.classList.add('mute__muted');
    audioEnabled = false;
  }
});

/**
 * Temporary audio toggle
 */
function toggleAudio(element, play) {
  if (play) {
    element.muted = false;
    element.play();
  } else {
    element.pause();
  }
}


/**
 * Snow/audio button toggle
 */
let snowButton = document.querySelector('#snow-button');

class SnowButton {
  constructor(el, audio) {
    this.el = el;
    this.audio = audio;

  }

  
}

// adjustVolume, credit - jedmao, https://stackoverflow.com/a/13149848
async function adjustVolume(element, newVolume, {duration = 750, easing = swing, interval = 13,} = {}) {
  const originalVolume = element.volume;
  const delta = newVolume - originalVolume;

  if(audio.muted) {
    audio.muted = false;
    audio.volume = 0;
  }

  if(audio.paused) {
    audio.play();
  }

  if(!delta || !duration || !easing || !interval) {
      element.volume = newVolume;
      return Promise.resolve();
  }
  const ticks = Math.floor(duration / interval);
  let tick = 1;
  return new Promise((resolve) => {
      const timer = setInterval(() => {
          element.volume = originalVolume + (
              easing(tick / ticks) * delta
          );
          if(++tick === ticks) {
              clearInterval(timer);
              resolve();
          }
      }, interval);
  });
}

function swing(p) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}
 
 

/**
 * Snow
 */

class Snow {
  constructor(el) {
    this.el = el;
    this.flakesCurrent = 1;
    this.flakesMin = 3;
    this.flakesMax = 25;
    this.flakes = [];
    this.flakeDelay = 50;
    this.flakeCountdown = this.flakeDelay; 
    this.height, this.width;
    window.addEventListener('resize', () => this.resize());
    this.init();
  }

  init() {
    this.resize();
    this.animate();
  }

  resize() {
    this.height = this.el.offsetHeight;
    this.width = this.el.offsetWidth;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.drawFrame();
  }

  drawFrame() {
    while (this.flakes.length < this.flakesCurrent) {
      this.createFlake();
    }

    for (let i = 0; i < this.flakes.length; i++) {
      let flake = this.flakes[i];
      this.moveFlake(i);
    }

    this.manageFlakes();
  }

  manageFlakes() {
    //console.log(audioEnabled + ' ' + this.flakesMin + ' ' + this.flakesCurrent + ' ' + this.flakesMax);

    if (!audioEnabled && this.flakesCurrent > this.flakesMin) {
      this.flakesCurrent = this.flakesMin;

    } else if((audioEnabled && this.flakesCurrent < this.flakesMax) || this.flakesCurrent < this.flakesMin) {
      //console.log('create new flake');
      if (this.flakeCountdown <= 0) {
        this.flakeCountdown = this.flakeDelay;
        this.flakesCurrent++;
      } else {
        this.flakeCountdown--;
      }
    }
  }

  createFlake() {
    let flake = document.createElement('span');
    flake.classList.add('snow__flake');
    this.randomizeFlake(flake);
    this.el.appendChild(flake);
    this.flakes.push(flake);
  }

  moveFlake(i) {
    let flake = this.flakes[i]
    flake.y += flake.speed;
    flake.style.top = flake.y + 'px';

    if (flake.y > this.height) {
      this.resetFlake(i);
    }
  }

  resetFlake(i) {
    let flake = this.flakes[i];

    if (this.flakes.length > this.flakesCurrent && Math.floor(Math.random() * 100 + 1) < 85) {
      flake.remove();
      this.flakes.splice(i, 1);
      //('Delete flake' + this.flakes.length + '/' + this.flakesCurrent);
    } else {
      flake.classList.remove('angel', 'angel--alt');
      this.randomizeFlake(flake);
    }
  }

  randomizeFlake(flake) {
    flake.speed = (Math.random() + 0.15);
    flake.size = flake.speed * 1.8 + 1;
    flake.y = -100;
    flake.style.left = Math.floor(Math.random() * 100) + '%';
    flake.style.animationDuration = ((Math.random() * 15) + 5) + 's';
    flake.style.fontSize = flake.size + 'em';

    if (Math.floor(Math.random() * 100) + 1 > 96) {
      flake.classList.add('angel');

      if (Math.floor(Math.random() * 2) + 1 > 1) {
        flake.classList.add('angel--alt');
      }
    }
  }
}



/**
 * Buttons
 */
{
  let nameButton = document.querySelector('#name');
  if (nameButton) {
    document.querySelector('#name').addEventListener('click', function(e) {
      document.querySelector('#message').classList.add('active');
    });
  }
}


/**
 * Marquees
 */

class Marquee {
  constructor(el) {
    this.el = el;
    this.wrapper = this.el.querySelector('.marquee__wrapper');
    window.addEventListener('resize', () => this.resize());
    this.init();
  }

  init() {
    const width = this.el.offsetWidth;
    const wrapperWidth = this.wrapper.offsetWidth;
    const ratio = wrapperWidth / width;
    const amount = Math.ceil(width / wrapperWidth);
    
    for (let i = 0; i < amount; i++) {
      var clone = this.wrapper.cloneNode(true);
      clone.classList.add('marquee__wrapper--clone');
      this.el.appendChild(clone);
    }

    this.el.querySelectorAll('.marquee__wrapper').forEach(function(marquee) {
      marquee.animate(
        [
          { transform: 'translate3d(0,0,0)' },
          { transform: 'translate3d(-100%,0,0)' }
        ], {
          duration: 40000 * ratio,
          iterations: Infinity,
        },
      );
    });
  }

  resize() {
    this.el.querySelectorAll('.marquee__wrapper--clone').forEach(function(clone) {
      clone.remove();
    });
    this.init();
  }
}

/**
 * Trees
 */
 class Forest {
  constructor(el) {
    this.el = el;
    this.tree = this.el.querySelector('.background__tree');
    window.addEventListener('resize', () => this.resize());
    this.init();
  }

  init() {
    const width = this.el.offsetWidth;
    const treeWidth = this.tree.offsetWidth;
    const ratio = treeWidth / width;
    const amount = Math.floor((width + treeWidth * 0.6) / treeWidth);
    // 100 / 33 = 3.33 = 3
    
    for (let i = 0; i < amount - 1; i++) {
      var clone = this.tree.cloneNode(true);
      clone.classList.add('background__tree--clone');
      clone.style.setProperty('--animation-offset', Math.random() * -1.5 + 's');
      this.el.appendChild(clone);
    }
  }

  resize() {
    this.el.querySelectorAll('.background__tree--clone').forEach(function(clone) {
      clone.remove();
    });
    this.init();
  }
}



/**
 * Wait for page to load so can get window size
 */

window.addEventListener('load', function() {
  document.querySelectorAll('.background').forEach(function(el) {
    new Forest(el);
  });

  document.querySelectorAll('.marquee').forEach(function(el) {
    new Marquee(el);
  });

  let snow = new Snow(document.querySelector('.snow'));
});

/**
 * String hash function
 */
function hashCode(text) {
  var hash = 0, i, chr;
  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i++) {
    chr   = text.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};



/**
 * Draggable
 */
const position = { x: 0, y: 0 }

interact('.card').draggable({
  listeners: {
    move (event) {
      let el = event.target;
      let x = (parseFloat(el.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(el.getAttribute('data-y')) || 0) + event.dy;
      el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
      el.setAttribute('data-x', x);
      el.setAttribute('data-y', y);
    },
  },
  cursorChecker() {
    return 'grab';
  },
});
