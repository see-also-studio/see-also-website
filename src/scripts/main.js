import barba from '@barba/core';
import gsap from 'gsap';
import Swiper from 'swiper';
import { CustomBlockTime } from './components/time.js';

console.log('main.js');

const transitionDuration = 0.35;
const contentHeight = 0;

runOnce();
function runOnce() {
  document.querySelectorAll('.time').forEach(function(el) {
    new CustomBlockTime(el);
  });
}

viewUpdate();
function viewUpdate() {
  initGallery();
}

function initGallery() {
  const galleries = document.querySelectorAll('.gallery');
  galleries.forEach(function(el) {
    new Swiper(el.querySelector('.gallery__inner'), {
      grabCursor: true,
      autoHeight: false,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      spaceBetween: 15,
    });
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
            onComplete: () => prevProjectContent.remove(),
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
