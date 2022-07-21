import icons from 'url:../../img/icons.svg';

// Parent class --not going to create any instance of this view --only use it as parent class of other child views
export default class View {
  _data;

  // JSDocs format
  /**
   * Render the received object to the DOM
   * @param {object | object[]} data The data to be rendered (e.g. recipe)
   * @param {*} [render = true] If false, create mark up str instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returnes if render=false
   * @this {object} View instance
   * @author racketShip01
   * @todo Finish implementation
   */
  render(data, render = true) {
    // if (!data) return this.renderError(); // guard clause for undefined or null
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // check if received data is an array and if its empty

    this._data = data;
    const markUp = this._generateMarkup();

    if (!render) return markUp; // --if render is false then will return this markup that being generated and DO NOT explicitly execute the next two lines of code instead will only want to return a string(markup). These rules only apply when we used previewView calls render() method in the bookmarkView and resultsView

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    // this render method will be responsible for then actually putting #generateMarkup onto the page
  }

  //---------------------------------------------------
  // Developing a DOM updating Algorithm

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup(); // generate this markup and compare new HTML to the current HTML can then only change text and attributes that have change from old version to new

    // Difficult to compare markup string to DOM elements in current page **Tricks: convert markup str to a DOM object
    const newDOM = document.createRange().createContextualFragment(newMarkUp); //createRange method can call another method such as createContextualFragment where in we can pass the markup str (html string) then convert that str into real DOM node objects --not living on the page but lives in heap memory

    // virtual DOM elements (new DOM as if it was a real DOM on our page)
    const newElements = Array.from(newDOM.querySelectorAll('*')); // will return a nodelist need to convert into a real array

    // current DOM elements on page
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // will return a nodelist need to convert into real array

    // COMPARISON of virtual DOM element to current DOM element
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(newEl.isEqualNode(curEl)); // isEqualNode --method in node use to compare

      // updates changed in TEXT (from new El to curEl)
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //console.log(newEl.firstChild.nodeValue.trim()); // we only update the text here not the attributes. NOTE: whenever an element changes we also need to change the attributes
        curEl.textContent = newEl.textContent;
      } // nodevalue --used to check values for different types of nodes (is not null for type of nodes in text and comment)

      // updates changed in ATTRIBUTES (from new El to curEl)
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes); // use to log attributes property of all elements changed in the new element
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      } // by this if block --simply replace all the attributes in the current element by the attributes coming from the new element
    });
  } // in this method is to create newMarkup but not re-rendering it

  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Public API
  renderSpinner() {
    const markUp = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  } // public method so that controller can then call this method here as it starts fetching the data

  // --------------------------------------
  // Error Handling: Success and Error Message
  renderError(message = this._errorMessage) {
    const markUp = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}

// NOTE: Parcel and Babel --inheritance between private fields and methods doesnt really work yet --best way to use native way of JS of protected fields and methods (convention)
