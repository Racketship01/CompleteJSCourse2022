// Implementing Search Feature
// this class is not going to render anything --but to get the query and to listen for click event on the button
class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // calling the argument (function) pass in addHandlerSearch method
    }); // if user clicks the submit button or if the user hits Enter while typing the query --we cant simply call the handler immediately when submitting form coz we need to first prevent the default action otherwise the page is going to reload
  }
}
export default new SearchView();
