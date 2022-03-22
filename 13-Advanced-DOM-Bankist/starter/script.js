'use strict';

//////////////////////////////////////////
// Selecting Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////////////////////////////////
// Smooth Scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // Modern Way
  section1.scrollIntoView({ behavior: 'smooth' });
});
/////////////////////////////////////////////////////////
// Page Navigation : Event Delegation
// event delegation: use in event bubble up by simply putting eventlistener on a common parent of all the elements that we are interested in, then we can basically catch that event in the commen parent element

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event (event created)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////

// Building a Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t =>
//   t.addEventListener('click', function () {
//     console.log('TAB');
//   })
// );

// use event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard clause --an if statement which will return early if some condition matches
  if (!clicked) return; // ignoring null

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content Area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Null --is the results of the closest method when there is no matching parent element be found
// NOTE: the whole idea when we build components like this is to just add and remove classes as necessary to manipulate the content to our needs.
//////////////////////////////////////////////////////////////

// Menu fade animation -- Passing Arguments to Event Handlers
const nav = document.querySelector('.nav');
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = opacity;
  }
};

// passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// mouseenter not bubbles
// this keyword is equal to current target
// any handler function can only ever have one real argument (only one real parameter )
////////////////////////////////////////////////////
// console.log(document.open());
/*
// Selecting, Creating and Deleting Document

// Selecting Elements (HTML document)
console.log(document.documentElement); // root
console.log(document.head); // if inside the head
console.log(document.body); // if inside the body

const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
console.log(allSection); // return a nodelist of all section element

document.getElementById('section--1'); // no need to use # or . (only applicable to querySelector metthod)
const allButton = document.getElementsByTagName('button');
console.log(allButton); // return HTMLCollection() --different from node list(not update automatically) --so called life collection that means if the DOM changes this collection is also immediately updated automatically

console.log(document.getElementsByClassName('btn')); // return HTML Collections

// CREATING and INSERTING ELEMENTS (programmatic way)
// .insertAdjacentHTML --quick and easy way of creating and inserting (based on Bankist App) elements

const message = document.createElement('div'); // creates DOM elements and stores that element into the variable message --this element is not yet in our DOM (web page) --this is just a DOM object
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class = "btn btn--close--cookie"> Got it! </button>'; // method use to read and set content

// header.prepend(message); // --basically adds the element as the first child of header element --method use to insert created DOM element on DOM (web page - HTML)
header.append(message); // --basically adds the element as the last child of header element

// Note: Element only insert at once, message element is now indeed a life element living in the DOM --can't be at multiple places at the same time
// Note: We can use prepend and append not only to insert elements but also to move them
// DOM ELEMENT IS UNIQUE !!! only exist at one place at a time

//header.append(message.cloneNode(true)); // copy all the child element by setting true at parameter --method use to insert multiple elements

// header.before(message); // insert before the header element -- message and header as siblings
// header.after(message);

// DELETE Elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();

    // message.parentElement.removeChild(message); // message and then we would move up in a DOM tree,remove child and then again the name of the element that we want to remove.

    // DOM traversing -- way of moving up and down in the DOM tree like selecting (parentElement)
  });

// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // Reference Error
console.log(message.style.backgroundColor); // --only found in inline css

// get style even not in DOM or in html doc
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // Need to use parseInt/parseFloat in order to read and convert to number

// documentElement === HTML :root (style.css)
document.documentElement.style.setProperty('--color-primary', 'orangered'); // use setProperty() easily change the style then we pass the name of property and the value

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.className);
console.log(logo.alt);
console.log(logo.src); // absolute URL
console.log(logo.getAttribute('src')); // relative URL as relative to the folder in HTML file

const link = document.querySelector('.twitter-link');
console.log(link.href); // absolute URL
console.log(link.getAttribute('href')); // absolute URL

const link1 = document.querySelector('.nav__link--btn');
console.log(link1.href); // absolute URL
console.log(link1.getAttribute('href')); // '#' - relative URL
// setting attribute
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

// non-standard
console.log(logo.designer); // undefined --not an attribute in html is not a standard property in an element
console.log(logo.getAttribute('designer')); // Jonas

// data attributes --special type (has to start with DATA word)
console.log(logo.dataset.versionNumber); // need to camelCase name stated in html attribute (data-version-number)

// Note: special attributes always stored in the dataset object
// **oftern use data attributes when working with UI and need to store data in UI esp in HTML code

// CLASSES
logo.classList.add('c', 'k');
logo.classList.remove('c', 'k');
logo.classList.toggle('c', 'k');
logo.classList.contains('c', 'k'); // not includes
// **can pass multiple classes passin in multiple values

// !! DONT USE !!
logo.className = 'Jonas'; // will override existing  --allows us to only put one class on any element
*/
///////////////////////////////////////////////////////
/*
// Implementing Smooth Scrolling

// 1st way --old school
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // 1st: need to get the coordinates of the we want to scroll to
  console.log(s1coords); // DOM Rect: x: left (distance between the border on the browser), y: top(distance from the top), width: px, height: px

  // console.log(e.target.getBoundingClientRect());
  // **getBoundingClientRect() --basically relative to the visible view port

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // current scroll --when at the top both should be zero

  // view height and width VP
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight, //not counting with scroll bars. It's just dimension of the VP that avaible for the content --excludes scroll bars
  //   document.documentElement.clientWidth
  // );

  // scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); // this top is always relative to the vuewport but not to the document (html) --not to the top of the page

  // solution:  simply add the current scroll position (window offset) to the top value of the page (window.scrollTo). And with this, we will then determine the position of the section here, not relative to the viewport. Not to the top of the browser window viewport, but instead to the top of the page. (current position + current scroll)
  // by doing the solution:  basically determined the absolute position of this element (section1) relative to the document. So to the entire page.

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Modern Way
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/
////////////////////////////////////////////////////////////
/*
// Types of Events and Events Handlers
const h1 = document.querySelector('h1');

// addEventListener() -- allows us to add multiple event listeners to the same event -- can also remove an event handler
const alertH1 = function (e) {
  alert('addEventListener: Great you are reading the heading !');

  // h1.removeEventListener('mouseenter', alertH1)
};

h1.addEventListener('mouseenter', alertH1);
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// on-event property
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great you are reading the heading !');
// };
*/
///////////////////////////////////////////////////////////
/*
// Event Propagation in Practice

// rgb(255,255,255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)}) `;
// console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // True

  // Stop event propagation
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

//  if we really do want to catch events during the capturing phase, we can define a third parameter in the addEventlistener function. If the third parameter is set to TRUE, the event handler will no longer listen to bubbling events but instead to capturing events
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  false
); // this element is now listening for the event (like target phase) as it travels down from DOM, while the other ones (nav__link & nav__links) are listening for events as it travels back up

// **e.target --the target is essentially where the event originated. So where the event first(actually) happened. So this is not the element on which the handler is actually attached
// **e.currentTarget --indeed the element on which the event handler is attached
// NOTE: noticed that the currentTarget is exactly the same as the this keyword. So, the this keyword is also the one pointing to the element on which the EventListener is attached to.
*/
///////////////////////////////////////////////////////////
/*
// DOM Traversing
const h1 = document.querySelector('h1');

// Going DOWNWARDS : --child element
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // nodelist
console.log(h1.children); // HTML collection --works only on direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going UPWARDS : --parent element
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(  --gradient-secondary)'; //closest parent element that has this class and simply applied all style to that element

// if selector actually matches the element on which calling closest, its gonna be the return

h1.closest('h1').style.background = 'var(  --gradient-primary)';

// closest -- use to find parent element in a multiple same elements. Opposite of querySelector, both receives a query string as an input but querySelector, finds children, no matter how deep in the Dom tree, while the closest method finds parents. And also no matter how far up in the Dom tree.

// Gong SIDEWAYS -- siblings element
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // all siblings
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
////////////////////////////////////////////////////////////
