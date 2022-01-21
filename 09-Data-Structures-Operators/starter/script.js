'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  // calling a method with an object --function destructure the object arguments --can also set default values as arguments
  orderDelivery: function ({
    time = '20:00',
    address,
    mainIndex = 0,
    starterIndex = 1,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} at ${time} in ${address}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`You order pasta with ${ing1}, ${ing2} and ${ing3}`);
  },
};
// practical application --we can pass an object into the function as argument then function destructure that object
restaurant.orderDelivery({
  time: '22:30',
  address: 'Manila,Ph',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Manila,Ph',
  starterIndex: 1,
});

/*
// Destructuring Object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// variable names differ from property name(still need to reference property names)
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags); // helpful when dealing with third part data

// default values feature --helpful when we do not have hard-coded data in application --third party app
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating variables while destructuring objects
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); //uses parenthesis()
console.log(a, b);

// nested object
const { fri } = openingHours;
console.log(fri);

const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
*/
//////////////////////////////////////////////////
/*
// destructing array

const arr = [2, 3, 4];
const a = [0];
const b = [1];
const c = [2];

const [x, y, z] = arr; // destructuring assignment
console.log(x, y, z);

let [main, , secondary] = restaurant.categories; // use , to skip element in arr
console.log(main, secondary);

// switch variable using destructuring
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested array -- one array inside another
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

// destructuring insice destructuring
const [i, , [j, k]] = nested;
console.log(i, j, k);

// default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
//////////////////////////////////////////////////

// Spread Operator

// array
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr]; // using spread operator write them individually as wrote as manually
console.log(newArr);
console.log(...newArr); // write individually array element

const newMenu = [...restaurant.mainMenu, 'Gnocci']; // creating complete new array
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 array
const joinArray = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(joinArray);

// iterables: arrays, strings, maps, sets. NOT object
const str = 'Jonas';
const letters = [...str, '', 'S'];
console.log(letters);
console.log(...str);
//console.log(`${...str} Schedtmann`); //cannot use spread using template literal

// Note: multiple values separated by a comma are usually only expected when we pass arguments into function or building new array

// multiple arguments in function -- real work example
const ingredients = [
  // prompt('Lets make pasta! Ingredient 1?'),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];
console.log(ingredients);
restaurant.orderPasta(...ingredients);

// objects - ES 2018, spread operator actually works on objects even obj are not iterables
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

// copy object --aside from using object.assign
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
