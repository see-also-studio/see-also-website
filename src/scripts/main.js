import barba from '@barba/core';
import gsap from 'gsap';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Keyboard, Mousewheel, A11y } from 'swiper/modules';
import { CustomBlockTime } from './components/time.js';
import { CurrentWeather } from './components/weather.js';
import { details } from './components/details.js';

Swiper.use([Navigation, Pagination, EffectFade, Keyboard, Mousewheel, A11y]);

console.log('main.js');

const transitionDuration = 0.35;
const contentHeight = 0;

runOnce();
function runOnce() {
  document.querySelectorAll('.time').forEach(function(el) {
    new CustomBlockTime(el);
  });

  document.querySelectorAll('.widget').forEach(function(el) {
    new CurrentWeather(el);
  });
}

viewUpdate();
function viewUpdate() {
  initGallery();
}

function initGallery() {
  const galleries = document.querySelectorAll('#projects .section__content:last-child .gallery');
  const galleryNavigated = document.body.getAttribute('data-navigated');
  console.log(galleryNavigated ? 'Slide in from: ' + galleryNavigated : 'Navigated straight to page');
  galleries.forEach(function(el) {
    let init = true;
    let navigatable = false;
    const swiper = new Swiper(el.querySelector('.gallery__inner'), {
      grabCursor: true,
      autoHeight: false,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: '.gallery__button--next',
        prevEl: '.gallery__button--prev',
        disabledClass: 'gallery__button--disabled',
      },
      pagination: {
        el: '.gallery__pagination',
        type: 'custom',
        renderCustom: function(swiper, current, total) {
          if (total <= 3) {
            return '';
          }
          return `${ Math.min(Math.max(current - 1, 1), total - 2) }/${ total - 2 }`;
        },
      },
      keyboard: {
        enabled: true,
      },
      // mousewheel: {
      //   eventsTarget: '.gallery__inner',
      // },
      spaceBetween: 15,
      initialSlide: !galleryNavigated ? 1 : (galleryNavigated === 'end' ? 2 : 0),
      on: {
        afterInit: () => {
          console.log('Gallery init');
          setTimeout(() => {
            // Only available if there is timeout
            console.log(swiper.slides.length - 1);
            console.log(swiper.wrapperEl.parentElement.parentElement.parentElement.parentElement);
          }, 10);
        },
        reachEnd: () => {
          console.log('Reached end, navigate to next project');
          const url = document.querySelector('#projects .project').getAttribute('data-next');
          if (navigatable && url) {
            console.log('Go to next project: ' + url);
            swiper.allowSlideNext = false;
            swiper.allowSlidePrev = false;
            document.body.setAttribute('data-navigated', 'beginning')
            barba.go(url);
          }
        },
        reachBeginning: () => {
          console.log('Reached beginning, navigate to previous project');
          const url = document.querySelector('#projects .project').getAttribute('data-previous');
          if (navigatable && url) {
            console.log('Go to previous project: ' + url);
            swiper.allowSlideNext = false;
            swiper.allowSlidePrev = false;
            document.body.setAttribute('data-navigated', 'end')
            barba.go(url);
          } else {
            console.log('Cant navigate');
          }
        },
        realIndexChange: () => {
          console.log('Changed slide');
        },
      }
    });

    if (init) {
      init = false;

      if (galleryNavigated === 'end') {
        swiper.slideTo(swiper.slides.length - 1, 0, false);
        swiper.slidePrev();
      } else if (galleryNavigated === 'beginning') {
        swiper.slideNext();
      }

      navigatable = true;
    }
  });

  // const projects = document.querySelectorAll('.projects__item');
  // projects.forEach(function(el) {
  //   el.style.setProperty('--left', Math.floor(Math.random() * 101));
  //   el.style.setProperty('--top', Math.floor(Math.random() * 101));
  // });
}

barba.init({
  timeout: 5000,
  transitions: [
    {
      name: 'self',
      sync: true,
      enter() {
        console.log('self enter');
      }
    },
    {
      name: 'default-transition',
      sync: true,
      once() {
        console.log('default-transition once');
      },
      leave(data) {
        console.log('default-transition leave');
        gsap.to(data.current.container, {
          opacity: 0,
          duration: transitionDuration,
        });
      },
      enter(data) {
        console.log('default-transition enter');
        document.body.setAttribute('data-view', data.next.namespace);
        viewUpdate();
        gsap.from(data.next.container, {
          opacity: 0,
          duration: transitionDuration,
        });
      },
    },
  ], 
  views: [
    {
      namespace: 'home',
      beforeEnter(data) {
        console.log('home view enter');
        if (data.current.url.path === data.next.url.path) {
          const aboutSection = document.body.querySelector('#about .section__content-wrapper');
          if (aboutSection.style.display === 'none') {
            openSection(aboutSection);
          } else {
            closeSection(aboutSection);
          }
          return;
        }
        // Only run if not first load. Current on first load is null.
        if (data.current.container) {
          const aboutSection = document.body.querySelector('#about .section__content-wrapper');
          openSection(aboutSection)
        }
      },
      beforeLeave(data) {
        console.log('home view leave');
        if (data.current.url.path === data.next.url.path) {
          return;
        }
        const aboutSection = document.body.querySelector('#about .section__content-wrapper');
        closeSection(aboutSection);
      },
    },
    {
      namespace: 'project',
      beforeEnter(data) {
        console.log('project view enter');
        if (data.current.url.path === data.next.url.path) {
          return;
        }

        const projectContent = document.body.querySelector('#projects .project__content');
        const projectContentWrapper = document.body.querySelector('#content .section__content-wrapper');
        const projectContentWrapperInner = projectContentWrapper.querySelector('.section__content');
        const widget = projectContentWrapper.querySelector('.widget');
        let startHeight = 0;
        let prevProjectContent;
        
        // Switching between projects.
        if (data.current.namespace === data.next.namespace) {
          // Get old project content and height height
          prevProjectContent = projectContentWrapper.querySelector('.project__content');
          startHeight = prevProjectContent.offsetHeight;
        } else {
          startHeight = projectContentWrapper.offsetHeight;
        }

        // Add new project content
        projectContentWrapperInner.appendChild(projectContent);

        // If first page load, set styles and skip transition.
        if (!data.current.container) {
          widget.style.display = 'none';
          projectContent.style.opacity = '';
          return;
        }

        const endHeight = projectContent.offsetHeight;

        // Switching between projects. Set old to absolute, fade out, remove. Fade in new. Scale height.
        if (data.current.namespace === data.next.namespace) {
          prevProjectContent.style.position = 'absolute';
          gsap.to(prevProjectContent, {
            opacity: 0,
            duration: transitionDuration,
            onComplete: () => {
              prevProjectContent.remove();
              // Clean up extra content if navigation buttons are spammed and duplicates are left behind.
              if (projectContentWrapperInner.children.length > 2) {
                for (let i = projectContentWrapperInner.children.length - 2; i >= 1; i--) {
                  console.log('Cleaning up left behind duplicate content elements.');
                  projectContentWrapperInner.children[1].remove();
                }
              }
            },
          });
        } else {
          // Entering project page from non project page. 
          // Set widget to absolute, fade out. Fade in new. Scale height.
          widget.style.position = 'absolute';
          gsap.to(widget, {
            opacity: 0,
            duration: transitionDuration,
            onComplete: () => { 
              widget.style.display = 'none';
              widget.style.opacity = widget.style.position = '';
            },
          });
        }

        projectContentWrapper.style.overflow = 'hidden';
        gsap.fromTo(projectContentWrapper, {
          height: startHeight + 'px',
        }, 
        {
          height: endHeight + 'px',
          duration: transitionDuration,
          onComplete: () => projectContentWrapper.style.overflow = projectContentWrapper.style.height = '',
        });

        projectContent.style.opacity = '0';
        gsap.to(projectContent, {
          opacity: 1,
          duration: transitionDuration,
          onComplete: () => projectContent.style.opacity = '',
        });
      },
      beforeLeave(data) {
        console.log('project view leave');
        if (data.current.url.path === data.next.url.path) {
          return;
        }

        const projectContentWrapper = document.body.querySelector('#content .section__content-wrapper');
        const projectContent = projectContentWrapper.querySelector('.project__content');
        const startHeight = projectContentWrapper.offsetHeight;

        // Make old content pos absolute, fade out and remove
        projectContent.style.position = 'absolute';
        gsap.to(projectContent, {
          opacity: 0,
          duration: transitionDuration,
          onComplete: () => projectContent.remove(),
        });

        // Leaving project page type. Change content back to widget.
        if (data.current.namespace !== data.next.namespace) {
          const widget = projectContentWrapper.querySelector('.widget');
          widget.style.opacity = '0';
          widget.style.position = widget.style.display = '';
          const endHeight = widget.offsetHeight;

          projectContentWrapper.style.overflow = 'hidden';
          gsap.fromTo(projectContentWrapper, {
            height: startHeight + 'px',
          }, 
          {
            height: endHeight + 'px',
            duration: transitionDuration,
            onComplete: () => {
              projectContentWrapper.style.overflow = projectContentWrapper.style.height = '';
            }
          });
          gsap.to(widget, {
            opacity: 1,
            duration: transitionDuration, 
            onComplete: () => {
              widget.opacity = '';
            },
          });
        }
      },
    },
  ],
});

function closeSection(el) {
  const currentHeight = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.style.display = 'block';
  gsap.fromTo(el, {
    height: currentHeight + 'px',
  },
  {
    opacity: 0,
    height: '0px',
    duration: transitionDuration,
    onComplete: () => { 
      el.style.overflow = el.style.opacity = el.style.height = '';
      el.style.display = 'none';
    },
  });
}

function openSection(el) {
  const currentHeight = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.style.display = 'block';
  gsap.from(el, {
    opacity: 0,
    height: currentHeight + 'px',
    duration: transitionDuration,
    onComplete: () => {
      el.style.overflow = el.style.opacity = el.style.height = '';
      el.style.display = '';
    },
  });
}

document.querySelectorAll('details').forEach(function(el) {
  details(el);
});
