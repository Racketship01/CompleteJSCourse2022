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
