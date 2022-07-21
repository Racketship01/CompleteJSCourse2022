import View from './Views.js';

// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
// .. --means to the parent folder
import { Fraction } from 'fractional'; // any libraries or any packages imported no need to specify path
// console.log(Fraction);

class RecipeView extends View {
  //-----------Fields-------------
  _parentElement = document.querySelector('.recipe');
  // this render method and two private property are something that all the views have in common
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  //-----------Method-------------
  // Event Handler in MVC: Publisher Pattern
  addHandlerRender(handler) {
    // Event Listener
    // window.addEventListener('hashchange', controlRecipes);

    // window.addEventListener('load', controlRecipes); // this event fired off immediately after the page has a completed loading
    // as we open the page, we also want to listen for the load event for the entire page loading

    //------------------------------------
    // Event Handlers in MVC: Publisher-Subscriber Pattern
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));

    // NOTE: event listeners should be attached to DOM elements in the view, but the events should then be handled by controller functions that live in the controller module.
  }

  addHandlerUpdateServings(handler) {
    // event delegation for serving btn
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      console.log(btn);
      const { updateTo } = btn.dataset;
      console.log(updateTo);
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">${
            this._data.servings === 1 ? 'serving' : 'servings'
          }</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
        </div>
        
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map(this._generateMarkupIngredients)
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    // this function will only return a string
  }

  _generateMarkupIngredients(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `;
  }
}

export default new RecipeView(); // we dont pass any data here therefore we dont need any constructor

// NOTE: in order to avoid complex code like exporting the entire class and import in the controller js and create a new object. Instead we will create the object here in View module and then export that object (default export). No one from the outside of this class will have access to anything except for the object created
