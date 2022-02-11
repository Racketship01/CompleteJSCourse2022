'use strict';

/*
// Default Parameters

const bookings = [];

const createBooking = function (
  flightNum,
  numPassenger = 1,
  price = 199 * numPassenger
) {
  // ES5
  //   numPassenger = numPassenger || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LG123');
createBooking('LG123', 2, 800);
createBooking('LG123', 2);
createBooking('LG123', 5);
createBooking('LG123', undefined, 1000);
// Note : skipping in argument is not allowed --tricks set to undefined (same as not even setting it)
*/
//////////////////////////////////////////////////
/*
// How Passing Arguments Works: Value vs Reference

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schedtmann',
  passport: 234567890,
};

const checkedIn = function (flightNum, pax) {
  flightNum = 'KH999';
  pax.name = 'Mr. ' + pax.name;

  if (pax.passport === 234567890) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};
// checkedIn(flight, jonas);
// console.log(flight);
// console.log(jonas); // when pass a ref type to a function, what is copied is really just a reference to the object in the memory heap

// flightNum here is a completely different variable. And therefore, as we changed it here,it did not get reflected in the outside flight variable.

// Is the same as doing...
// const flightnum = flight;
// const pax = jonas;

// KIM: Passing a primitive type to a function is really just the same as creating a copy outside of a function. On the other hand, when we pass object to a function, it is really just like copying an object -- whatever we change in a copy will also happen in the original

// two function manipulating one object -- it will create a bug
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};

// newPassport(jonas);
console.log(newPassport(jonas));
// checkedIn(flight, jonas);

console.log(jonas); // output: new passport number defined in newPassport function
*/
//////////////////////////////////////////////////
/*
// Functions Acceptipting Callback Function

const oneWord = function (string) {
  return string.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (string) {
  const [first, ...others] = string.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// console.log(oneWord('Say the name'));
// console.log(upperFirstWord('Say the name'));

// higher order function
const transformer = function (str, fn) {
  console.log(`Original str: ${str}`);
  console.log(`transformed str: ${fn(str)}}`);

  console.log(`transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// We abstracted this code away into other functions --we created a new level of abstraction by doinf the transformer function (delegating the string transformation to other lower level of function(oneWord and upperFirstWord))

// JS uses callbacks all the time
const high5 = function () {
  console.log('Hi!');
};

document.body.addEventListener('click', high5);
['Jonas', 'Jose', 'Adam'].forEach(high5);
*/
//////////////////////////////////////////////////
/*
// Functions Returning Functions

const greet = function (greeting) {
  return function (name) {
    // <--- return function of greet
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey!'); // greteerHey is a function (variable) that will produce a value of the greet function
greeterHey('Jonas'); // <---return function of name
greeterHey('Steven');

// easy way
greet('Hello')('Jonas');
// argument hello is for greet function parameter while Jonas is for return name function

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Helloooo')('Jonass');
*/
/////////////////////////////////////////////////
/*
// The Call and Apply Method

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} book a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, 'Jonas Schedtmann');
lufthansa.book(896, 'Mike Smith');
console.log(lufthansa);

const euroWings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams')

// Call method -- the first argument is exactly what we want the this keyword point to (in this case the eurowings object) Ans allows us to manually and explicitly set the this keyword of any function that we want to call

book.call(euroWings, 23, 'Sarah William'); // call the book function with the this keyword set to eurowings
console.log(euroWings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

// Apply method -- same as call methods, the only difference is that apply does NOT receive a list of arguments after the this keyword --instead gonna take an array of the arguments

const flightData = [234, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
// first argument is the this keyword (object that needs to pass in)and the second argument is list of arrays --the data need to pass in

// modern JS not use apply --instead can still use a call method
book.call(swiss, ...flightData);
console.log(swiss);

// Bind Method
const bookEW = book.bind(euroWings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(euroWings, 23);
bookEW23('Jonas Schedtmann');
bookEW23('Martha Cooper');

// with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // the this keyword is not pointing at the object lufthansa.buyPlane but in the element selected (buy) --but using bind will creates a copy of buyPlane() and sets the this keyword.

// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // preset arguments
// addVAT = value => value + value * 0.23;
console.log(addVAT(100));
// the first argument of the bind method is the this keyword --use null instead if this keyword not in the function
// if want want to preset the argument, it should always be the first argument

// Challenge
const taxAdd = function (rate) {
  return function (value) {
    console.log(value + value * rate);
  };
};

const taxAddReg = taxAdd(0.1);
taxAddReg(200);
const taxVAT = taxAdd.bind(null)(0.23);
taxVAT(100);

// Other Solution --w/o using bind
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const taxAddReg2 = addTaxRate(0.23);
console.log(taxAddReg2(100));
console.log(taxAddReg2(23));
*/
//////////////////////////////////////////////////
/*
// Challenge 01
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!

  // 1.1
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    //prompt(this.question);
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // short circuiting 'AND' operator
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');

    // console.log(this.answers);
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3, 5, 3, 9, 6, 1] });
*/
////////////////////////////////////////////////
/*
// IIFE
const runOnce = function () {
  console.log('This');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  console.log(runOnce());
})();

(() => console.log('This will ALSO never run again'))();

// Variable declared with let or const create their own scope inside a block
*/
//////////////////////////////////////////////
/*
// Closure
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passenger`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();

// secureBooking as being the birthplace of booker function

// NOTE: Any function always has access to the variable environment of the execution context in which the function was created

// the Booker function has access to the passengerCount variable(secureBooking function) because it's basically defined in the scope in which the Booker function was actually created. So in a sense, the scope chain is actually preserved through the closure, even when a scope has already been destroyed because its execution context is gone. This means that even though the execution context has actually been destroyed, the variable environment somehow keeps living somewhere in the engine.

console.dir(booker);

// More examples

// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // Execution context
f(); // Closure
console.dir(f);

// re-assigning f function
h();
f();
console.dir(f);
//Note: whenever re-assinged functions even without returning them this will create a CLOSURE

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);
// Closure --also includes the arguments because they are really just a local variables in the function

// Closure will execute variable element inside a function first , when no local variable declared in function, closure will execute variable in the global scope
*/
////////////////////////////////////////////////

// Challenge 2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
