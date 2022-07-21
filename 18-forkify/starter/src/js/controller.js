import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
// import sortView from './Views/sortView.js';
import paginationView from './Views/paginationView.js';
import bookmarksView from './Views/bookmarksView.js';
import addRecipeView from './Views/addRecipeView.js';

import 'core-js/stable'; // polyfilling to support old browser // NOTE: core-js (--special package use to polyfilling)

import 'regenerator-runtime/runtime'; // polyfilling async/await // & regenerator-runtime (intall multiple package) <npm i  core-js regenerator-runtime>
import { async } from 'regenerator-runtime';
// import { sort } from 'core-js/core/array';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////////////////////
// Hot Module --not from JS, coming from parcel
if (module.hot) {
  module.hot.accept();
} // this method prevent page to reload --after saving here in vscode, page still remain

const controlRecipes = async function () {
  try {
    // resultsView.renderSpinner();

    const id = window.location.hash.slice(1); // window.location --basically means the entire URL
    //console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // 0. Updated results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // NOTE: dont use render as the page will be flickering as refresh as re-rendering occur

    // 1 bookmark's view
    // debugger;
    bookmarksView.update(model.state.bookmarks);
    // BUG
    // NOTE: when reloading page bookmarks will be empty then the update method in View trying to do is to now insert the data in there --which should not happen as the goal of the update is to replace text content not to add new element --SOLUTION 1st: render the bookmarks (should happen once the page load) 2nd: create new handler at bookmarks view then pass a handler function that will render the bookmark as the page load

    // 2. Loading Recipe --fetch from API
    await model.loadRecipe(id); // async(controlRecipes) calling another async(loadRecipe) and will return a promise that need to await to handle result

    // const { recipe } = model.state;

    // 3. Rendering Recipe
    recipeView.render(model.state.recipe); // This method will also use to create new object in class. Render is a method use also in react to pass data in the class constructor in recipeView module.

    // const recipeView = new RecipeView(model.state.recipe) -- we can also used this if we export the entire class and import here

    // TEST
    // controlServings();
  } catch (err) {
    // console.log(err);

    // rendering error in the view (UI) -- catch re-throwing error from model module
    recipeView.renderError();
    console.error(err);
  }
};
// showRecipe();

//-------------------------------------------------
// Implementing Search Features
const controlSearchResults = async function () {
  try {
    // 1.) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2.) load search results
    await model.loadRecipeResults(query); // no need to store any results anywhere coz just like loadRecipe, doesnt return anything --all does is manipulate the state

    // 3.) render results
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results); //due to the structure it might hard to follow where is the data is but with calling it here can now pass we want to render at render()

    //----Implementation of pagination------------
    // render 10 pages in search result
    resultsView.render(model.getSearchResultsPage());

    // 4.) Render initial pagination buttons
    paginationView.render(model.state.search);

    // sortView.render(model.sortResults(sorted));
  } catch (err) {
    console.log(err);
  }
};

// // Sort
// const controlSort = function (sorted) {
//   resultsView.render(model.getSearchResultsPage());

//   paginationView.render(model.state.search);

//   sortView.render(model.sortResults(sorted));
// };

//  Pagination Feature
const controlPagination = function (goToPage) {
  // 1.) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2.) Render NEW  pagination buttons
  paginationView.render(model.state.search);
};

// ------------------------------------------------
// Updating Recipe Servings
const controlServings = function (newServs) {
  // Update the recipe servings (in state)
  model.updateServings(newServs);

  // Update the recipe view
  // recipeView.render(model.state.recipe);

  //******//
  // Developing a DOM updating Algorithm
  recipeView.update(model.state.recipe); //only update text and attributes in the DOM without re-render the entire view
};

//-------------------------------------------------
// Implementing Bookmark Feature

const controlAddBookmark = function () {
  // 1. add / remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. update recipe view
  recipeView.update(model.state.recipe);

  // 3. render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

//-------------------------------------------------
// Uploadig New Recipe
const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render addRecipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.renderMessage();

    // render bookmark view (not update as we insert new element)
    bookmarksView.render(model.state.bookmarks);

    // change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`); // history API of the browsers --allow us to change the URL w/o reloading the page // pushSate takes 3 argument: 1--state 2--title 3--url
    // window.history.back(); --automatically going back to the last page --API going back and forth

    // close form windor
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

//--------------------------------------------------
// Event Handler in MVC: Subscriber Pattern
const init = function () {
  bookmarksView.addHandlerBookmark(controlBookmark);

  recipeView.addHandlerRender(controlRecipes);
  // As soon as the program start, init() being executed. As soon as the event happen in the view module at addHandlerRender function, the controlRecipes function(as pass as an handler argument) will be EXECUTED!!
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerClick(controlPagination);

  addRecipeView.addHandlerUpload(controlAddRecipe);

  // sortView.addHandlerClickSort(controlSort);

  // controlServings(); // no recipe loaded to be test
};
init();
