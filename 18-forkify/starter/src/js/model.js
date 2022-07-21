import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

//-----------------------------------------------------
// State --contain all data in application
export const state = {
  recipe: {}, // recipes loaded
  search: {
    query: '', // value from the search query
    results: [], // entire array of the search results of query
    resultsPerPage: RES_PER_PAGE, // config constant set for 10 recipes render in search result
    page: 1,
  },
  bookmarks: [],
};

//-----------------------------------------------------
// HTTP Library --Ajax Called

const createRecipe = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), // TRICK -- to conditionally add properties to an object using AND operator as it will short circuits --if recipe has a property of key (truthy value), second operant (key object) will be executed and returned. But if not has key (falsy) nothing will happen
    // 2nd operand will become the object of the expression then we can spread that object to put values in recipe object
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    // console.log(data);

    state.recipe = createRecipe(data);

    // bookmark feature
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    // console.log(state.recipe);
  } catch (err) {
    // temporary error handling
    console.error(`${err} 💥💥`);

    // rendering error in the view (UI) --same as  re-throwing error
    throw err;
  }
};
// NOTE: if there is an error in the async function being called inside another async function, the return promise is still fulfilled. Solution? propagated the error down from one async function to the other by re-throwing the error here   who called other async

//-----------------------------------------------------
// Implementing Search Feature
export const loadRecipeResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`); // adding key in search results will load all the recipes including one that contain own key (generated API key)
    console.log(data);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥`);
    throw err;
  }
};
// loadRecipeResults('pizza'); --need to call in the controller

//-----------------------------------------------
// // Sort
// export const sortResults = function (sort = false) {
//   const sortTitle = state.search.results.title;

//   const sortRes = sort
//     ? sortTitle.sort(function (a, b) {
//         const nameA = a.name.toUpperCase(); // ignore upper and lowercase
//         const nameB = b.name.toUpperCase(); // ignore upper and lowercase
//         if (nameA < nameB) {
//           return -1;
//         }
//         if (nameA > nameB) {
//           return 1;
//         }

//         // names must be equal
//         return 0;
//       })
//     : state.search.results;

//   return sortRes;
// };

//------------------------------------------------
// Implementing Pagination
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  // console.log(start);

  const end = page * state.search.resultsPerPage; // 9
  // console.log(end);

  const resultsPage = state.search.results.slice(start, end);

  return resultsPage;
}; // function that will take in the page that we want to render which will only return the results --this function is not an async as we  already have the search results

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
};

//-----------------------------------------------------
// Implementing Bookmark Feature
export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true; //setting new property on the empty recipe object

  persistBookmarks();
};

// NOTE: when we add something, we get the entire data and when we want to delete something, we only get to the ID

export const deleteBookmark = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // unmark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

//----------------------------------------------------
// Storing Bookmarks with LocalStorage

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks)); // convert object to JSON string
};

//----------------------------------------------------
// Debugging

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

//----------------------------------------------------
// Initialization -- Local Storage Bookmark

const init = function () {
  const storage = localStorage.getItem('bookmarks'); // cant directly set localStorage.getItem to state.bookmark --need first to store in a variable
  if (storage) state.bookmarks = JSON.parse(storage); // convert back from JSON string to object
};
init();
// console.log(state.bookmarks);

//--------------------------------------------------
// Upload New Recipe --responsible for sending data recipe to the forkify API

export const uploadRecipe = async function (newRecipe) {
  try {
    // console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim()); // destructure array to unpack values
        //const ingArr = ing[1].replaceAll(' ', '').split(','); // destructure array to unpack values
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredients format! Please use  the correct format :)'
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description }; // destructure object the unpack values --inside one array
      }); // Object.entries() --use to convert object to entries of array --replaceAll use to replace white space into empty str then split into a new array
    // console.log(ingredients);

    // take raw input data (ingredients) and transform with same data format with the recipe API  -- map method is always good to create new arrays based on some existing data

    // Upload data (newRecipe)
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // console.log(recipe);

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);
    state.recipe = createRecipe(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
}; // an async function that will make a request to the APO and will receive the data for a new recipe

// const arr = [2, 3, 4];
// const [x, y, z] = arr; // destructuring assignment
// console.log({ x, y, z });
