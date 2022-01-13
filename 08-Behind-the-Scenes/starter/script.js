'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName} you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer's scope
      const firstName = 'Steven';

      const str = `Your'e a millenial, ${firstName} `;
      console.log(str);

      //reassigning variable from outer's scope
      output = 'NEEEEW!';

      function add(a, b) {
        return a + b;
      }
      console.log(add(2, 3));
    }
    console.log(millenial); //var is a function scope
    // add(2, 3); //reference error -- functions are block scope -- only true for strict mode
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);

//////////////////////////////////////////////////

// HOISTING

// VAR HOISTING
// var num;
// num = 6;
// console.log(num);

// FUNCTION DECLARATION HOISTING
// defineHoisted();
// function defineHoisted() {
//   console.log('hoisted');
// }

// LET & CONST HOISTING
// let num; //declaration
// num = 6; //initialization
// console.log(num);

// const num = 6;
// console.log(num);

// TDZ
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

// Variables
console.log(me);
//console.log(job);
//console.log(yr);

var me = 'Jonas';
let job = 'teacher';
const yr = 1991;

// Functions

console.log(addDec(2, 3));
//console.log(addExp(2, 3));
console.log(addArrow);
//console.log(addArrow(2, 3));

function addDec(a, b) {
  return a + b;
}

const addExp = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;
