import View from './Views.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Please try again';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    const str = this._data
      .map(result => previewView.render(result, false))
      .join('');
    // console.log(str);
    return str;
  }
}

export default new ResultsView();
