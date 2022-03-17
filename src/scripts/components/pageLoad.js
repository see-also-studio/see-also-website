/**
 * @Class InternalLink
 * Fetch and replace page content
 */

const pageChange = new Event ('pagechange', {
  bubbles: true,
  cancelable: true, 
  composed: false,
});

export class InternalLink {
  /**
   * @param el {element}
   */
  constructor(el) {
    this.el = el;
    this.url = this.el.getAttribute('href');
    this.el.setAttribute('data-js', 'true');
    //console.log(this.url);
    this.isInternal = this.el.getAttribute('target') !== '_blank';
    this.init();
  }

  init() {
    if (this.isInternal) {
      this.el.addEventListener('click', (evt) => this.changePage(evt));
    }
  }
  
  changePage(evt) {
    evt.preventDefault();
    fetch(this.url)
    .then(response => { 
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      console.log('Changing title to: ' + doc.title);
      return {
        'title': doc.title,
        'main': doc.body.querySelector('main'),
      };
    })
    .then(data => {
      if (document.title !== data.title) {
        document.title = data.title;
      }

      // Iterate through sections to change for change in content
      data.main.querySelectorAll('section').forEach(el => {
        const id = el.id;
        const current = document.body.querySelector('#' + id);
        const refreshable = el.querySelector('.js-refresh') ? true : false;

        // Only if section contains refreshable element
        if (el.querySelector('.js-refresh')) {
          const currentInner = current.querySelector('.js-refresh');

          if (currentInner.innerHTML !== el.querySelector('.js-refresh').innerHTML) {
            console.log(id + ' is different');
          } else {
            console.log(id + ' is the same');
          }
          
          //if (el.querySelector('.js-refresh').innerHTML !== currentInner.innerHTML) {
          //  el.querySelector('.js-refresh').innerHTML = 'test';
          //  //current.replaceChild(el.querySelector('.refresh'), current.querySelector('.refresh'));
          //  console.log('replacing ' + id);
          //}
        }
        //console.log(el);
        //console.log(compare);
        //console.log(id + ' ' + (el.innerHTML === compare.innerHTML ? 'same' : 'not the same'));
        //if (el.querySelector('.refresh')) {
        //  console.log(el);
        //}
      });

      //document.body.replaceChild(data.main, document.querySelector('main'));
      document.dispatchEvent(pageChange);
    })
    .catch(error => {
      console.log('Failed to fetch page: ' , error);
    });
  }
}
