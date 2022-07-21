import View from './Views.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet! Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    const str = this._data
      .map(bookmark => previewView.render(bookmark, false)) //this map will become an array of string of markup
      .join('');
    // why not directly call _generateMarkup method in previewView without messing the render method? because we still need to set the data property to the data that we passed so that we can use the this keyword --we simply render method return to markup as a string and set it to false that will trigger the guard clause in render method at View.js
    return str;
  }
} // this method return a markup string --expecting a string that will be stored into the markup variable from the ORIGINAL render() call in the controller.

export default new BookmarksView();
