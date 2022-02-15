'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Project: BANKIST APP

// Creating DOM elements
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // use to clear/empty entire container then start adding new elements

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    
    <div class="movements__value">${Math.abs(mov)}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html); // method used to display/attach in webpage(DOM tree) --accepts two string 1st: position of new element we want to attach HTML (function) 2nd: text (string containing the HTML that we want to insert)

    // afterbegin position --order of the element in the array would be inverted (*end to begin) --new child element will appear before all the other child elements

    // beforeend position -- (*begin to end) simply be added after the previous one
  });
};
displayMovements(account1.movements);
// Good practice: a lot better to pass data directly into the function than global variables

// console.log(containerMovements.innerHTML); // text content: simply returns text itself while HTML: returns everything, including the html (all HTML tags will be included)

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// Simple Array METHODS

// SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // end parameter is not included in the output just like strings --length of the array will be end minus begin paramter (2)

console.log(arr.slice(-2)); // --we can define a negative begin parameter then will start to copy from the end of array

console.log(arr.slice(1, 2)); // starts extracting at position 1 and extracts everything except the last two (-2)

console.log(arr.slice()); // shallow copy of exact array

console.log([...arr]); // shallow copy using spread operator

// SPLICE
// console.log(arr.splice(2)); //--output: c, d, e
// console.log(arr); // original array will be the first two element as we extracted from the postion 2 --output: a, b

arr.splice(-1); // minus one here is the last element
console.log(arr);

arr.splice(1, 2); // delete count (position) as declared in arguments --1st parameter here works the same at slice but the 2nd is really the number of elements that we want to delete
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

arr2.reverse(); // simply reverse the order from end to begin --also does mutate the original array
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // using spread operator

// JOIN
console.log(letters.join(' - ')); // result is a string with a separtor specified
*/
////////////////////////////////////////////////
/*
// The NEW at Method
const arr = [23, 11, 64];
console.log(arr[0]); // old way
console.log(arr.at(0)); // ES2020

// old way getting the last element
console.log(arr[arr.length - 1]); // old way --know the array length
console.log(arr.slice(-1)[0]); // using slice --take out values using bracket

// modern ES2020
console.log(arr.at(-1)); // negative makes the counting from the right side (end)

// Note: if want to get the last element of the array, use AT method and to do something called method chaining (combining multiple methods)

//if you just want to quickly get a value from an array, so just like the first element, then of course you can keep using the brackets notation.

// String
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/
/////////////////////////////////////////////////
/*
// Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposite ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('-----------FOREACH-----------');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposite ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// ...

// forEach does is to loop over the array and in each iteration it will pass in the current element as an argument and execute the callback function

// 1st parameter: current element
// 2nd parameter: current index
// 3rd parameter: entire array that we loop
*/
////////////////////////////////////////////////
/*
// forEach with Maps and Sets

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// 1st parameter: current value
// 2nd parameter: key
// 3rd parameter: entire map that we loop over

// Sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

// key is exactly same as value because SET don't have key and indexes
// (_) --means a throwaway variable --variable taht completely unnecessary
*/
////////////////////////////////////////////////

// Coding Challenge 1

// Data 1
const dogsJulia1 = [3, 5, 2, 12, 7];
const dogsKate1 = [4, 1, 15, 8, 3];

// Data 2
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];

const checkDogs = function (juliaDogs, kateDogs) {
  // 1
  juliaDogs.slice();
  juliaDogs.splice(0, 1);
  juliaDogs.splice(-2);
  // console.log(juliaDogs);

  // 2
  const arr = [...juliaDogs, ...kateDogs];
  // const dogs = juliaDogs.concat(kateDogs);
  console.log(arr);

  // 3
  arr.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult and is ${age} years old `);
    } else {
      console.log(`Dog number ${i + 1} is still a pup!`);
    }
  });
};
checkDogs(dogsJulia1, dogsKate1);
checkDogs(dogsJulia2, dogsKate2);
