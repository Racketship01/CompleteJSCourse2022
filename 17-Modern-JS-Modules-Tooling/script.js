// Importing module

// Name Import
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing module');

/*
// import * as ShoppingCart from './shoppingCart.js'; // * --everything
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// Importing Default Export --can give any name
import add from './shoppingCart.js';
add('pizza', 8);
// NOTE: not advisable to import module twice

// Mix Name and Default Exports
// import added, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// added('pasta', 5);
// NOTE: never mix this both in the same module --preferred style is just one default export per module then import that here (main module)

// Import is a life connection to exports --import is not simply copy of the value exported
import added, { cart } from './shoppingCart.js';
added('pasta', 5);
added('salad', 9);
added('gelato', 7);

console.log(cart);

/////////////////////////////////////////////////////
// TOP-LEVEL AWAIT --blocks the execution of the entire module

// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('End Fetching');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //   console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body }; // using .at(-1) basically getting the last array
};
const lastPost = getLastPost();
console.log(lastPost); // result: Pending Promise not object of array we expecting NOTE: Reason: calling async function will always retutn a promise not the return of the actual data itself. Solution: to get the data(object) instead of the promise was to simply use regular promises

// Not very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);

// Importing with blocking code --the importing module (script.js) has to wait for the code exporting module(shoppingCart.js) to finish
// one module imports a module that has top level await --importing module wait for the exporting module to finish blocking code

// NOTE: using top-level await --await outside of any async function will block the entire module
*/
/////////////////////////////////////////////////////
/*
// The module pattern
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  }; // We are simply using cart without using this keyword because of closures. So here we could also log something that is indeed private to this module. So something that will not be visible in the exported object (ShoppingCart2).
  // so in order to produce this string here, the function will also have to use this variable that was only present at its birthplace, but which no longer does exist besides that.

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier `);
  };

  // variable are private as per inside a function --need to return variales in order to basically return a public API
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

// how do we have access to the cart variable and able to manipulate? how we able to do that even if it called in IIFE and return function long ago? answer: closures --allow a function to have access to all the variables that were present at its birthplace
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('orange', 8);
console.log(ShoppingCart2);
console.log(ShoppingCart2.cart);
console.log(ShoppingCart2.shippingCost); // undefined --as properties are only private inside module and cannot show in the console --this called implementation of module pattern
*/
/////////////////////////////////////////////////////
/*
// Common JS modules

// Export
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
  );
}; //this is not going to woek in the browser but it will work in node.js --export keyword is an object

// Import
const {addToCart} = require('./shoppingCart.js'); // require still not defined in browser environment but defined in node.js because this is part of the commonJS specification
*/
/////////////////////////////////////////////////////

/////////////////////////

// Intro to NPM

// Importing cloneDeep module at lodash-es
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// in module bunder --no need to specifying entire path to any module --just lodash library(package) and parcel will automatically find the path to this module --also works with all kinds of assest (html, css, sass) and all kind of module
// import cloneDeep from 'lodash-es'; --no need for -es parcel is smart enough to automatically install package here --sadly not working with my browser
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

// Object.assign to copy an object
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);
///////////////////////////////////////

////////////////
// Bundling with parcel and NPM scripts
import added, { cart } from './shoppingCart.js';
added('pasta', 5);
added('salad', 9);
added('gelato', 7);

console.log(cart);

// npx parcel index.html --index.html is an entry point as where we include our script.js which is the file we want to bundle up modules imported script.js module
// as this command finishes, it will result to give link of localhost that our project runs
// NOTE: development step: in order for us to be able to check the code during development it will not compress everything

// Hot module reloading
if (module.hot) {
  module.hot.accept();
}

/////////////////////////////////////////

// Configuring babel and polyfiling

// transpile a class fields
class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');
console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));

// if not working in importing, we manually installed <npm i core-js> & <npm i regenerator-runtime>
// ** polyfilling features in ES6 ** //
import 'core-js/stable';
// import 'core-js/stable/array/find'; // specific importing features in polfill
// import 'core-js/stable/promise';

// ** polyfilling async function ** //
import 'regenerator-runtime/runtime';
