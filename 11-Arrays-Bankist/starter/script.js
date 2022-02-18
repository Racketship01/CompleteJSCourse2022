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
    
    <div class="movements__value">${Math.abs(mov)}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html); // method used to display/attach in webpage(DOM tree) --accepts two string 1st: position of new element we want to attach HTML (function) 2nd: text (string containing the HTML that we want to insert)

    // afterbegin position --order of the element in the array would be inverted (*end to begin) --new child element will appear before all the other child elements

    // beforeend position -- (*begin to end) simply be added after the previous one
  });
};
displayMovements(account1.movements);
// Good practice: a lot better to pass data directly into the function than global variables --each function should actually receive the data that it should work with, instead of using a global variable.

// console.log(containerMovements.innerHTML); // text content: simply returns text itself while HTML: returns everything, including the html (all HTML tags will be included)
/////////////////////////////////////////////////////

// Computing balance --reduce method

const calcPrintBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    const money = (acc += mov);
    return money;
  }, 0);

  // const html = `
  //   <p class="balance__value">${balance}€</p>
  // </div>`;

  // labelBalance.insertAdjacentHTML('afterend', html);

  labelBalance.textContent = `${balance}€`;
};
calcPrintBalance(account1.movements);

/////////////////////////////////////////////////////

// Statistics -- using chain method

const calcDisplaySummary = function (movements) {
  const income = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //console.log(income);
  labelSumIn.textContent = `${income}€`;

  const outcome = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interestDeposit = 1.2 / 100;
  const summary = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * interestDeposit)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(summary)}€`;
};
calcDisplaySummary(account1.movements);
//////////////////////////////////////////////////////
// Computing Username

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  }); // forEach is a great case to produce some so called side effects --simply do dome work without returning anything
};
createUsernames(accounts);
//console.log(accounts);

// const createUsernames = function (user) {
//   const username = user
//     .toLowerCase()
//     .split(' ')
//     .map(name => name[0])
//     .join('');
//   return username;
// };
// createUsernames('Steven Thomas Williams');

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
/*
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
*/
/////////////////////////////////////////////////////
/*
// the MAP method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

const moveToUsd = movements.map(function (mov) {
  return mov * euroToUsd;
});

console.log(movements);
console.log(moveToUsd);

// for of
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
console.log(movementsUSDfor);

// arrow
const movementToUsd = movements.map(mov => mov * euroToUsd);
console.log(movements);
console.log(movementToUsd);

// map with 3 parameters
const movementDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`

  // if (mov > 0) {
  //   return `Movement ${i + 1}: You deposite ${mov}`;
  // } else {
  //   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  // }
);
console.log(movementDescription);

// KIM: completely acceptable to have even more return statement as long as only one of them is executed
*/
////////////////////////////////////////////////
/*
// Filter Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposit = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposit);

// for of
const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/
//////////////////////////////////////////////////////
/*
// The Reduce Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);

const balance3 = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance3);
// 1st parameter: function (accumulator --(current sum of all the previous values) is the value that keep adding to the current value --acc + curr)
// 2nd: initial value of the accumulator --(0)

// for of
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// in for of loop --we always need an external variable

// Maximum value --  it doesn't have to be a sum. It could be a multiplication or even something completely different, like a string or an object,
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
*/
//////////////////////////////////////////////////////
/*
// Challenge 2
// const age1 = [5, 2, 4, 1, 15, 8, 3];
// const age2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (dogAges) {
  // 1
  const dogAgeMap = dogAges.map(function (age) {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
    }
  });
  // console.log(dogAgeMap);

  // 2
  const dogAgeFilter = dogAgeMap.filter(age => age >= 18);
  console.log(dogAgeFilter);

  // 3
  const aveHumanAgeReduce = dogAgeFilter.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  console.log(aveHumanAgeReduce);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/
//////////////////////////////////////////////////////
/*
// The Chaining Method

const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
// PIPELINE
const totalDeposits = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * euroToUsd;
  })
  //.map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDeposits);

// we can only chain a method after another if the first one returns an array

// reminders: 1st --not overuse chaining 2nd --try to optimize it 3rd --it is bad practice to chain methods that mutate the underlying original array
// if we have a huge chain of methods, chained one after the other, we should try to compress all the functionality that they do into as little methods as possible.
*/
//////////////////////////////////////////////////////
/*
// Challenge 3

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// const array = [15, 16, 17, 18, 19];

// function reducer(previous, current, index, array) {
//   const returns = previous + current;
//   console.log(
//     `previous: ${previous}, current: ${current}, index: ${index}, returns: ${returns}`
//   );
//   return returns;
// }

// array.reduce(reducer);
*/
//////////////////////////////////////////////////////

// The Find Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// using the Find method, we can then search this array basically to find an object that matches a certain property that we already know.

// for of
const unique = [];
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    unique.push(acc);
  }
}
console.log(unique);
