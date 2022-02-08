'use strict';

// Enhanced Object Literals

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 Enhance object literals --methods (function)
  openingHours,

  // DESTRUCTURING ARRAY -- method
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // DESTRUCTURING OBJECT --method
  // calling a method with an object --function destructure the object arguments --can also set default values as arguments
  orderDelivery({ time = '20:00', address, mainIndex = 0, starterIndex = 1 }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} at ${time} in ${address}`
    );
  },

  // SPREAD OPERATOR --method
  orderPasta(ing1, ing2, ing3) {
    console.log(`You order pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  // REST PARAMETER --method
  orderPizza(mainIngredients, ...otherIngredients) {
    console.log(mainIngredients);
    console.log(otherIngredients);
  },
};

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
/*
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
*/
//////////////////////////////////////////////////
/*
// Rest Pattern and Parameters

// SPREAD -- because on the RIGHT side of the assignment operator
const arr = [1, 2, ...[3, 4]];

// 1) Destructuring

// REST -- on the LEFT side of assign operator
const [a, b, c, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, c, others); //called rest because it will take the rest of the elements

// BOTH spread and rest
const [pizza, , risotto, ...otherFoods] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFoods);
// rest pattern always must be the last in destructuring assignment
// only one rest in any destructuring assignment

// Object
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2)  Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(5, 3, 7, 2, 5, 8, 9);

const x = [23, 4, 7];
add(...x); // x values being spread will enter add function then be pass into number array by the rest parameters

// rest parameters --real application at restaurant object
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinash');
restaurant.orderPizza('mushrooms');
*/
/////////////////////////////////////////////////////
/*
// Short Circuit (&& and ||)

console.log('------- OR --------');
// OR operator -- return truthy values even if first operand is truthy other operand will not even be evaluated
console.log(3 || 'Joe'); // 3
console.log('' || 'Joe'); // Joe
console.log(true || 0); // true
console.log(undefined || null); //null --no short circuit last operand will return even falsy

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello

// checking if has property in restaurant obj
restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guest2 = restaurant.numGuests || 10;
console.log(guest2); // 10 --restaurant.numGuest was undefined --falsy

console.log('------- AND --------');

// AND operator--opposite of OR operator, if the 1st value is falsy then immediately return falsy value w/o evaluating 2nd value --if both truthy, the last value return
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'jonas'); // result will always be the falsy value even in multiple values

// practical practice
if (restaurant.orderPizza) {
  console.log('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/
/////////////////////////////////////////////////////
/*
// Nullish Coalesing Operator (??)
restaurant.numGuests = 0;
const guest = restaurant.numGuests || 10;
console.log(guest);

// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/
///////////////////////////////////////////////////
/*
// Logical Assignment Operator
const rest1 = {
  name: 'Mama Sita',
  //numGuest: 20,
  numGuest: 0,
};

const rest2 = {
  name: 'Mang Kanor',
  owner: 'Nicanor Knorr',
};

// OR assignment operator --will assign a value to variable if that exact variable is currently falsy
// rest1.numGuest = rest1.numGuest || 10;
// rest2.numGuest = rest2.numGuest || 10;

// rest1.numGuest ||= 10;
// rest2.numGuest ||= 10; //--assigns a value to a variable if that variable is currently falsy

// Nullish assignment operator --assign a value to a variable if that exact variable is currently nullish(null or undefined)
rest1.numGuest ??= 10;
rest2.numGuest ??= 10;

// AND assignment operator
//rest1.owner = rest1.owner && 'Anonymous'; // undefined
rest1.owner &&= 'Anonymous';
rest2.owner &&= 'Anonymous';

console.log(rest1);
console.log(rest2);
*/
/////////////////////////////////////////////////////
/*
// Challenge 01
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
const [players1] = game.players;
console.log(players1);
const [[], players2] = game.players;
console.log(players2);

// 2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3
const [...allPlayers] = game.players;
console.log(allPlayers);

const allPlayers1 = [...players1, ...players2];
console.log(allPlayers);
// 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// 6
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} scored goals`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
console.log(printGoals(...game.scored));

// 7

team1 < team2 && console.log('team1 WINS!');
team2 < team1 && console.log('team2 WINS!');
*/
//////////////////////////////////////////////////
/*
// Looping Arrays: The FOR-OF LOOP
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// regular for loop
for (let i = 0; i < menu.length; i++) {
  console.log(menu[i]);
}

console.log(menu);

// for of --will automatically loop over the entire array and in each iteration gives acces to current array
for (const item of menu) console.log(item);
// variable item is always the current element

// current index
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

//console.log([...menu.entries()]);
// menu.entries() --basically an array which in each position contain a new array that has both element and index number of that element in the original array
*/
//////////////////////////////////////////////////
/*
// Optional Chaining (?.)

if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

// with OC
console.log(restaurant.openingHours.mon?.open); // undefined --property before ? (mon) the one being read if exist, if not undefined is the result
console.log(restaurant.openingHours?.mon?.open); //  if restaurant.openingHours does not even exist,well, then the Monday property will not even be read

// example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  //console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} , we are open at ${open}`);
}
// remember if we want to use a variable name as the property name, basically, we need to use the brackets notation. --for arrays

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method not exist');
console.log(restaurant.orderSalad?.(0, 1) ?? 'Method not exist');

// Array
const user = [{ name: 'jonas', email: 'helloa@jonas,io' }];

// const user = [];
console.log(user[0]?.email ?? 'User array empty');

// if else
if (user.length > 0) console.log(user[0].name);
else {
  console.log('User array empty');
}
*/
/////////////////////////////////////////////////
/*
// Looping Objects: Object Keys, Values and Entries

// Propperty NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open in ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES

const values = Object.values(openingHours);
console.log(values);

// Entries --names plus the values together --Entire object --distinction between array and object is important as we loop over the entire object

const entries = Object.entries(openingHours);
console.log(entries);

// [key, value]
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} to ${close}`);
}
*/
/////////////////////////////////////////////////
/*
// Challenge 2

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
const scored = [...game.scored];
console.log(scored);

for (const [i, goal] of scored.entries()) {
  console.log(`Goal ${i + 1}: ${goal}`);
}

// 2

const odds = game.odds;

const oddValues = Object.values(odds);
console.log(oddValues);

let ave = 0;
for (const value of oddValues) ave += value;
ave /= oddValues.length;
console.log(ave);

// 3
const oddEntries = Object.entries(odds);
console.log(oddEntries);

for (const [team, odd] of oddEntries) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;

  console.log(`Odd of ${teamStr} ${odd}`);
}

// Note: we only use [array].entries in an array while in the object we have to use object.entries and then pass into the function

// Bonus
const scorers = {};
for (const player of game.scored)
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
console.log(scorers);
*/
/////////////////////////////////////////////////
/*
// SETS
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Pasta',
  'Pasta',
  'Risotto',
]);
console.log(ordersSet);

console.log(new Set('Jonnaas')); // J o n a s

console.log(ordersSet.size); //3
console.log(ordersSet.has('Pizza')); // true
console.log(ordersSet.has('Bread')); // false

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

console.log(new Set('jonasschedtmann').size);
*/
//////////////////////////////////////////////////
/*
// MAPS
const rest = new Map();
rest.set('name', 'Classico Italiano'); //set method is similar to add -- allows to add new element

rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');
// calling set method returns the updated map

console.log(rest.get('name'));
console.log(rest.get(true));
// to read data from the map, use get method

const time = 12;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories')); // check method
rest.delete(2);
//rest.clear();

// Solution --define a variable to return an identifier from call stack
// array
const arr = [1, 2]; // refer to the same place in memory

rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr)); // Refernce error --array are store in heap, therefore the key[1,2] will be a value in call stack. Address will be undefined as key will be a value at call stack

// object
const me = { name: 'Jonas', age: 30 };
rest.set(me, 'Name');

console.log(rest.get(me)); //use the same object/array to read the value out of the map
*/
/////////////////////////////////////////////////
/*
// Maps: Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);
// question.set(['best teacher', 'Jonas']); // Refernce error
console.log(question);

// convert object to maps
console.log(Object.entries(openingHours));

const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// iteration - quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

//const answer = Number(prompt('Your answer'));
//console.log(question.get(question.get('correct') === answer));

// console.log(
//   question.get(
//     answer === question.get('correct') ?? answer !== question.get('correct')
//   )
// );

// convert map back to array
console.log([...question]); // unpack value by using spread operator

// methods in arrays
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);
*/
/////////////////////////////////////////////////
/*
// Challenge 3

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

// 1.
// const events = new Set([...gameEvents.values()]);
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2.
gameEvents.delete(64);
console.log(gameEvents);

// 3.
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

const time = [...gameEvents.keys()].pop(); // pop method also returns that deleted array
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

// 4.
console.log(gameEvents);
for (const [min, event] of gameEvents) {
  const half =
    min <= 45
      ? `[FIRST HALF] ${min}: ${event}`
      : `[SECOND HALF] ${min}: ${event}`;

  console.log(half);
}

// for (const [min, event] of gameEvents) {
//   const half = min <= 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${half} HALF] ${min}: ${event}`);
// }
*/
//////////////////////////////////////////////////
/*
// Working with Strings - Part 1

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

// lenght
console.log(airline.length);
console.log('B737'.length);

// methods
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal')); // case-sensitive

// SLICE METHOD

// Note: one good use case is to extract part of a string using slice method
console.log(airline.slice(4)); // Air Portugal (sub-string) --zero-based and spacing is counted

console.log(airline.slice(4, 7));
// KIM: basically stops extracting before reaching index bumber 7 (declared in parameter) --also the length of extracted string is always going to be last parameter minus first

// extract string w/o knowing its index --using slice method
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2)); // al --negative index ill start extracting from the end

console.log(airline.slice(1, -1)); // cutoff the first letter at positon one and last letter at position -1

const checkMiddleSeat = function (seat) {
  // const s = seat.slice(seat.lastIndexOf(' '));
  const s =
    seat.slice(-1) === 'B' || seat.slice(-1) === 'E'
      ? `You're in middle seat`
      : `You're not on middle seat`;
  console.log(s);
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas')); // conversion string to object
console.log(typeof new String('jonas')); //object

console.log(typeof new String('jonas').slice(1));
// Note: When the operation is done --the object is converted back to primitive string --all string methods return primitives even if called on a string object
*/
//////////////////////////////////////////////////
/*
// Working with Strings - Part 2
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization Name
const pax = 'jOnAs';
const paxLower = pax.toLowerCase();
const paxUpper = paxLower[0].toUpperCase() + paxLower.slice(1);

console.log(paxUpper);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim(); //start in ES2019 --can trim white space from start and at end
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replace method  --relace method also return a brand new string(doesnt mutate original) --case sensitive
const price = '₱100,000';
const priceUS = price.replace('₱', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));

// using regular expression
console.log(announcement.replace(/door/g, 'gate')); // g stands for global

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of NEW Airbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('WELCOME aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');
*/
//////////////////////////////////////////////////
/*
// Working with Strings - Part 3

// Split and join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  console.log(names);

  const namesUpper = [];

  for (const n of names) {
    //namesUpper.push(n[0].toUpperCase() + n.slice(1));

    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23';
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Jonas'.padStart(25, '+').padEnd(35, '+'));

const maskCreditCard = function (number) {
  const str = String(number);
  const last = str.slice(-4);

  return last.padStart(str.length, '*');
  //console.log(last.padStart(str.length, '*'));
};
console.log(maskCreditCard(12345678));
console.log(maskCreditCard(12345678912345));
console.log(maskCreditCard('12345678912345678912345'));

// Repeat
const message2 = 'Bad weather... All Departures delayed';

console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);
*/
//////////////////////////////////////////////////
/*
// Challenge 4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  //console.log(text);
  const line = text.split('\n');
  //console.log(line);

  for (const [index, value] of line.entries()) {
    const [first, second] = value.toLowerCase().trim().split('_'); //destructing the value of [b] -- underscore in the divider
    //console.log(first, second);

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    const camelCase = `${output.padEnd(25, '.')}${'✅'.repeat(index + 1)}`;
    console.log(camelCase);
  }
});
*/
//////////////////////////////////////////////////
/*
// String Method Practice

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`;
  console.log(output.padStart(50));
}
*/
//////////////////////////////////////////////////
