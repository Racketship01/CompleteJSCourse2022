'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

//Note: when need to manipulate styles on page, always export the styles into a class.

const openModal = function () {
  modal.classList.remove('hidden');
  //Note: dot is only for the selector when selecting classes
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

//Note: if want to use same function in multiple event listener, need to specify that function as a separate function(function expression) then can pass as an argument to multiple "add eventlistener"

document.addEventListener('keydown', function (e) {
  console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Note: to look at the event object in order to figure out which key was pressed is by giving function a parameter.
// JS will call this function when a key down events happens and pass in the event object as an argument
