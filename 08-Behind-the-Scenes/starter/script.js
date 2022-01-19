'use strict';

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     let output = `${firstName} you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       // Creating NEW variable with same name as outer's scope
//       const firstName = 'Steven';

//       const str = `Your'e a millenial, ${firstName} `;
//       console.log(str);

//       //reassigning variable from outer's scope
//       output = 'NEEEEW!';

//       function add(a, b) {
//         return a + b;
//       }
//       console.log(add(2, 3));
//     }
//     console.log(millenial); //var is a function scope
//     // add(2, 3); //reference error -- functions are block scope -- only true for strict mode
//     console.log(output);
//   }
//   printAge();

//   return age;
// }

// const firstName = 'Jonas';
// calcAge(1991);

//////////////////////////////////////////////////

// // HOISTING

// // VAR HOISTING
// var num;
// num = 6;
// console.log(num);

// // FUNCTION DECLARATION HOISTING
// defineHoisted();
// function defineHoisted() {
//   console.log('hoisted');
// }

// // LET & CONST HOISTING
// let num; //declaration
// num = 6; //initialization
// console.log(num);

// const num = 6;
// console.log(num);

// // TDZ
// const myName = 'Jane';

// if (myName === 'Jane') {
//   const age = 2037 - 1991;
//   console.log(`${myName} is a ${job}`); //TDZ
//   console.log(age);
//   const job = 'teacher';
//   console.log(x);
// }

// console.log(myName);

// Practice Hoisting

// // Variables
// console.log(me);
// //console.log(job);
// //console.log(yr);

// var me = 'Jonas';
// let job = 'teacher';
// const yr = 1991;

// // Functions

// console.log(addDec(2, 3));
// //console.log(addExp(2, 3));
// console.log(addArrow);
// //console.log(addArrow(2, 3));

// function addDec(a, b) {
//   return a + b;
// }

// const addExp = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// // Example
// console.log(deleteShoppingCart());
// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x);
// console.log(y === window.y);
// console.log(z === window.z);

//////////////////////////////////////////////////

// 'this' keyword practice

// console.log(this); //parent/globe scope

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this); // undefined w/o attached to any object --in strict mode
// };
// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this); // window -- because of this in the lexical scoping (parent/globe scope)
// };
// calcAgeArrow(1991);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this); // attached to object jonas
//     console.log(2037 - this.year);
//   },
// };
// jonas.calcAge();

// // Method borrowing
// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = jonas.calcAge; //method borrow
// matilda.calcAge(); // calling the method on matilda --this keyword will point to matilda, object which called the method

// const f = jonas.calcAge;
// //f(); // this keyword attached to jonas is now undefine because function f calling jonas is just a regular function

//////////////////////////////////////////////////

// // Regular vs Arrow

// // var firstName = 'Matilda';

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     // console.log(this);
//     console.log(2037 - this.year);

//     // Solution 1
//     // const self = this; // self or that
//     // const isMillenial = function () {
//     //   console.log(self);
//     //   console.log(self.year >= 1981 && self.year <= 1996);
//     // };

//     // Solution 2
//     // arrow function inside parent scope --jonas object
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial();
//     // inside regular function call, this keyword is undefined
//   },

//   // arrow functon in a method
//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
//   // Note: for best practice, never use arrow funtion as method in object

//   // greet: function () {
//   //   console.log(this);
//   //   console.log(`Hey ${this.firstName}`);
//   // },
// };
// jonas.greet();
// jonas.calcAge();

// // arguments keywords is only available in regular function not in arrow function
// const addExp = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExp(2, 3);
// addExp(2, 5, 3, 8);

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 3, 8); // Reference Error

//////////////////////////////////////////////////

// // Primitive vs Objects(Primitive vs Reference Types)

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };
// const friend = me;
// friend.age = 27;
// console.log('Friend: ', friend);
// console.log('Me: ', me);
//////////////////////////////////////////////////

// Primitives vs Object Practice

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

// reference type
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// copying object
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'], // array is an object -- deeply nested object
};

const jessicaCopy = Object.assign({}, jessica2); // only property copy not array object -- only creates shallow copy not deep clone
jessicaCopy.lastName = 'Davis';

// Note: shallow copy only copy the properties while deep clone copy everything

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
