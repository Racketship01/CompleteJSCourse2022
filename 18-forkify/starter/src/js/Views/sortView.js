import View from './Views.js';
import icons from 'url:../../img/icons.svg';

class SortView extends View {
  _parentElement = document.querySelector('.sort');

  addHandlerClickSort(handler) {
    let sorted = false;
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      handler((sorted = !sorted));
    });
  }

  _generateMarkup() {
    return `
    <button class="btn--inline sort__btn--next">
      <span>Sort</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
}

export default new SortView();
