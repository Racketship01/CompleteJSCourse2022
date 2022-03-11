'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2022-03-02T14:11:59.604Z',
    '2022-03-08T17:01:17.194Z',
    '2022-03-09T23:36:17.929Z',
    '2022-03-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency, // currency is completely independent from the locale itself
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]); // the current index in the movements array. And the same index is then gonna point to the equivalent date in this movements date array.
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMove = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMove}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  const formattedMove = formatCur(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = `${formattedMove}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Implementing a Countdown Timer
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0); // 1.666666667
    const sec = String(Math.trunc(time % 60)).padStart(2, 0); // 40 -- 1 * 60 + 40
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 second, stop timer and log out
    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease 1s -- timer logic
    time--;
  };

  // Set time to 5 mins
  let time = 120;

  // Call the timer every seconds
  tick(); // call function to start timer immediately
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Internationalizing Dates(Intl) --Experimenting with API
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };

// // location from users browser
// const locale = navigator.language;
// console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now); // we need to pass into this function here is a so-called locale string.And this locale is usually the language and then dash the country.
// day / month /year

// Internationalizing Number (intl) -- Experimenting
const num = 23564586.23;

const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('GERMANY: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('PH: ', new Intl.NumberFormat('en-US', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current Date and Time
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    // location from users browser
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); // we need to pass into this function here is a so-called locale string.And this locale is usually the language and then dash the country.
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date --Push new array at movement dates in every transfer
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// Converting and Checking Numbers
console.log(23 === 23.0);

// Base 10: 0 - 9 (1/10 = 0.1) (3/10 = 3.33333333 infinite fraction)

// Binary base 2: 0 - 1
console.log(0.1 + 0.2); //infinite fraction
console.log(0.1 + 0.2 === 0.3);

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
//  every function is also an object. And this number object here has some methods to do parsing.
console.log(Number.parseInt('30px', 10)); // 30
console.log(Number.parseInt('e23', 10)); // NaN

// the parseInt function actually accepts a second argument, which is the so-called radix. And the radix is the base of the numeral system that we are using.

// Floating
console.log(Number.parseInt(' 2.5rem ')); // 2
console.log(Number.parseFloat(' 2.5rem ')); // 2.5 -- uses whenever need to read value out of string

// Global function
console.log(parseFloat(' 2.5rem ')); // 2.5

// NaN -- use to check if value is NOT a number
console.log(Number.isNaN(23)); // F
console.log(Number.isNaN('23')); // F
console.log(Number.isNaN(+'23x')); // T
console.log(Number.isNaN(23 / 0)); // F

// isFinite -- ultimate method to check if any value is a real number not a string
console.log(Number.isFinite(23)); // T
console.log(Number.isFinite('23')); // F
console.log(Number.isFinite(+'23X')); // F
console.log(Number.isFinite(23 / 0)); // F

// isInteger --use to check if the value is integer
console.log(Number.isInteger(23)); // T
console.log(Number.isInteger(23.0)); // T
console.log(Number.isInteger(23 / 0)); // F
*/
/////////////////////////////////////////////////////
/*
// Math and Rounding

// Square root
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); // 2

// max
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2));

// min
console.log(Math.min(5, 18, 23, 11, 2));

// pie - calculate the area of a circle with (10px in css) radius
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Math.random() 0...1 -- starts with 0 * number need to randomize plus 1
console.log(Math.trunc(Math.random() * 6) + 1);

// generate random integers between two values
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...(max - min + min) -> min...max
console.log(randomInt(10, 20));
// how we end up with a nice function which will give us always a number that's going to stay between min and max.

// Rounding Integers -- all method does type coersion
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3)); // 23 -- rounded up
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.3)); //23 -- rounded down -- works with both positive and negative numbers
console.log(Math.floor(23.9)); // 23

console.log(Math.trunc(23.3)); // 23

console.log(Math.trunc(-23.3)); // -23 --same with floor in dealing positive number but never work negative numbers
console.log(Math.floor(-23.9)); // 23

// Rounding Decimals -- decimals it works differently than with integers
console.log((2.7).toFixed(0)); // '3' --toFixed always return a string and not a number
console.log((2.7).toFixed(3)); // '2.700' --adds two zeros for decimal place of 3
console.log((2.345).toFixed(2)); // '2.35'
console.log(+(2.345).toFixed(2)); // 2.35 --convert string into number

// Does this here works in a similar way than the string methods?
// primitives actually don't have methods. And so behind the scenes, JavaScript will do boxing.

// And boxing is to basically transform this to a number object, then call the method on that object. And then once the operation is finished it will convert it back to a primitive,
*/
//////////////////////////////////////////////////////////
/*
// Remainder Operator
console.log(5 % 2); // 1
console.log(5 / 2); // 5 =  2 * 2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 8 = 2 * 3 + 2

// When number is even ? if its divisible by two --divisible by two means that if we divide it by two,remainder is zero

console.log(6 % 2); // 0
console.log(6 / 2); // 3

console.log(7 % 2); // 1
console.log(7 / 2); // 3 * 2 + 1

const isEven = n => n % 2;
console.log(8);
console.log(23);
console.log(514);

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

// every Nth time, then it is a good idea to use the remainder operator for that.
*/
///////////////////////////////////////////////////////////
/*
// Numeric Separator

// 287, 460, 000, 000
const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00; // 15
const transferFee2 = 1_500; // 1500

const PI = 3.14_15;
console.log(PI); // 3.

console.log(Number('230_000')); // NaN
// should really only use, these numeric separators, when you are writing down numbers

// If you need to store a number in a string, for example, in an API, or if you get a number as a string from an API, you should not use underscores in there, because then JavaScript will not be able to parse the number correctly out of that string.

console.log(parseInt('230_000')); // 230 --Only the parts that is here in front of the underscore. Everything else will then be ignored.
*/
///////////////////////////////////////////////////////////
/*
// Working with BigInt

console.log(2 ** 53 - 1); // biggest number --2 base two
console.log(Number.MAX_SAFE_INTEGER); // stored into the number namspace -- any integer that is larger than this is not safe

// sometimes works some not
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// BigInt
console.log(123345454575484515484548448n); // --n transforms regular number into BigInt number
console.log(BigInt(123345454575484515484548448)); // this constructor function should only be used with small numbers

// Operations
console.log(10000n + 10000n);
console.log(123545699878744815454n * 10000000n);

const huge = 54156746534657545455n;
const num = 17;
// console.log(huge * num); // cannot mix BigInt and other types of data (regular number)
console.log(huge * BigInt(num)); // Solution

// console.log(Math.sqrt(16n)); // Error --math operation does not work in bigInt

// 2 exception -- comparison operators and plus operator when working with strings

// logical operator
console.log(20n > 15); // T
console.log(20n === 20); // F --different primitive type --triple operator does not do type coersion
console.log(typeof 20n); // bigInt
console.log(20n == '20'); // T --double operator does type coersion --coerce to a regular numnber

// string concatenation
console.log(huge + ' is REALLY HUGE!!!!');

// Division --bigInt indeed is an integer
console.log(10n / 3n); // 3n --simply retiurn the closest BigInt
console.log(10 / 3); // 3.333333333335

console.log(11n / 3n); // 3n -- simply cuts the decimal part offs
*/
////////////////////////////////////////////////////////////
/*
// Creating Dates

const now = new Date();
console.log(now);

// parse date from date string
console.log(new Date('Mar 08 2022 17:36:46'));
console.log(new Date('December 24, 2015'));

//  Z here means the UTC. So that's the Coordinated Universal Time, which is basically the time without any time zone in London and also without daylight savings.
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31)); // Dec 01, 2037

// ms
console.log(new Date(0)); // Jan 01, 1970 milliseconds after that initial Unix time

// convert days to milliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3days after in Unix time (3 days, 24hrs, 60 mins ===  hr, 60secs and 1000 ms)


// these date are special type of object --have own methods
// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // dont use getYear()
console.log(future.getMonth());
console.log(future.getDate()); // Day
console.log(future.getDay()); // day in present date
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

// convert particular date object into string that can store somewghere
console.log(future.toISOString()); //  follows some kinds of international standard

console.log(future.getTime()); // 2142228180000 (huge amount passed since 01-01-1970)--timestamp is the milliseconds which passed since 01-01-170

console.log(new Date(2142228180000)); // reverse of timestamp

// timestamp is a special method that we can use to get the timestamp for right now
console.log(Date.now());
console.log(new Date(1646734561871));

// set methods
future.setFullYear(2040);
console.log(future);
// also exist setMonth, setDate and so forth method
*/
//////////////////////////////////////////////////////////////
/*
// Operations with Dates

// convert date to a number will result a timestamp in milliseconds

const future = new Date(2037, 3, 14);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  (date2 - date1) / (1000 * 60 * 60 * 24);

const day1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(day1);

// Note: if need precise calculation e.g time changes due to daylight saving changes --use a date library like moment.js
*/
//////////////////////////////////////////////////////////////
/*
// Timers: setTimeOut and setInterval

// set time out -- this function receives a callback function. So just like some array methods, or DOM event handlers as the 1st paramter and specify a second argument when does the function to be called (e.g milliseconds)

// when the execution of our code reaches this point, it will simply call the set timeout function, it will then essentially register this callback function here to be called later. And then the code execution simply continues. And we can prove that by doing something after the set timeout.

// setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   'olives',
//   'spinach'
// ); // all the arguments here that we pass after the delay will be arguments to the function.

const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log('Waiting...');

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// Asynchronous JS -- as soon as JavaScript hits this line of code here, it will simply basically keep counting the time in the background, and register this callback function to be called after that time has elapsed, and then immediately, JavaScript will move on to the next line,

// setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

// Challenge
setInterval(function () {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const sec = now.getSeconds();
  const ms = now.getMilliseconds();

  const clock = `${hour}:${minute}:${sec}:${ms}`;

  console.log(clock);
}, 1000);
*/
///////////////////////////////////////////////////////////////
