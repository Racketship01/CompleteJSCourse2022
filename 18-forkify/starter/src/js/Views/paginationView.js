import View from './Views.js';
import icons from 'url:../../img/icons.svg';

// Implementing Pagination Feature
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // event handler for button
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);

      handler(goToPage); // passing to the controlPagination method in the controller
    });
  }
  // NOTE: using custom data attributes establish a connection between the DOM and our code

  _generateMarkup() {
    const currentPage = this._data.page;

    // computation on how many pages will be render
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // page 1 and other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButtonNext(currentPage, numPages);
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButtonPrev(currentPage, numPages);
    }

    // other pages
    if (currentPage < numPages) {
      const prev = this._generateMarkupButtonPrev(currentPage, numPages);
      const next = this._generateMarkupButtonNext(currentPage, numPages);

      return [prev, next];
    }

    // page 1 and NO other pages
    return '';
  } // every view that renders something to the UI needs to generate a mark up method to call in the render method

  _generateMarkupButtonPrev(curPage, numPages) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1} of ${numPages}</span>
  </button>
    `;
  }

  _generateMarkupButtonNext(curPage, numPages) {
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1} of ${numPages}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
}

export default new PaginationView();

// NOTE: if we dont return anything by default, undefined is returned and rendered in the UI
