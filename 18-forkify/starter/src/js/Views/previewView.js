import View from './Views.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
              <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
            <svg> <use href="${icons}#icon-user"></use>
                    </svg>
          </div>
            </div>
        </a>
      </li>
      `;
  } // this method will be return as markup in the BookmarkView and Resultview being called the return method
}

export default new PreviewView();
