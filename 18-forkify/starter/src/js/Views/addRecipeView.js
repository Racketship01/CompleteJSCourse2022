import View from './Views.js';
import icons from 'url:../../img/icons.svg';

// Uploading New Recipe
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(
      'click',
      this.toggleWindow.bind(this) //using bind method will create a copy of function and set this keyword to newly created object

      // function () {
      //   this.toggleWindow();

      //     this._overly.classList.toggle('hidden');
      //     this._window.classList.toggle('hidden');
      //   // BUG: this keyword inside of a handler function points to the element on which the listener is attached(_btnOpen) SOLUTION: export this entire function into another method with the correct this keyword bound then pass it as callback function in event handler
      // };
    );
  } // this function will be called as soon as the page loads --has nothing to do with controller as when the clicks happen will be the window to show --only gonna be used inside of this class

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // modern browser API to select (value) form elements --spread the return object into an array that contains all the fields with all the values

      // console.log(dataArr); // data that will be uploaded to the API --just another API call that will happen to the model --dataArr will return as an entries of array

      const data = Object.fromEntries(dataArr); // convert entries to an object
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView(); // import this object to the controller otherwise our main script sort controller will never execute this file (addRecipeView)
