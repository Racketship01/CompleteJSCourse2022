/*
let js = "amazing";

console.log(40 + 8 + 23 - 10);

console.log("Jonas");

let firstName = "Jonas";
console.log(firstName);

// Variable name conventions
let jonas_matilda = "JM";
let $function = 27;

let person = "jonas";
let PI = 3.1415;

let myFirstJob = "Coder";
let myCurrentJob = "Teacher";

let job1 = "programmer";
let job2 = "teacher";
console.log(myFirstJob);
//////////////////////////////////////
*/

/*
// DATA TYPE
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof "Jonas");

javascriptIsFun = "YES!";
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);
*/

/*
// LET, CONST & VAR
let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990;

/////////////////////////////////////////

// Arithmetic Operator
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = "Jonas";
const lastName = "Schedtmann";
console.log(firstName + " " + lastName);

// Assignment Operator
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x +1 = 101
x--;
x--;
console.log(x);

// Comparison Operator
console.log(ageJonas > ageSarah); // > , < , >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);

// Operator Precedence
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);
//////////////////////////////////////////
*/

/*
// Coding Challenge 1

// MINE - TEST DATA 1:
let markMass = 78;
let markHeight = 1.69;

let markBMI = markMass / (markHeight * markHeight);
console.log(markBMI);

let johnMass = 92;
let johnHeight = 1.95;

let johnBMI = johnMass / johnHeight ** 2;
console.log(johnBMI);

let higherBMI = markBMI > johnBMI;
console.log(higherBMI);

// TEST DATA 2:
markMass = 95;
markHeight = 1.88;
markBMI = markMass / (markHeight * markHeight);
console.log(markBMI);

johnMass = 85;
johnHeight = 1.76;
johnBMI = johnMass / johnHeight ** 2;
console.log(johnBMI);

higherBMI = markBMI > johnBMI;
console.log(higherBMI);


// JONAS
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / heightJohn ** 2;
const markHigherBMI = BMIMark > BMIJohn;
console.log(BMIMark, BMIJohn, markHigherBMI);
*/

/*
const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

const jonas =
  "I'm " +
  firstName +
  ", a " +
  (year - birthYear) +
  " years old" +
  " " +
  job +
  "!";
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(jonasNew);

console.log(`Just a regular string...`);

console.log("String with \n\
multiple \n\
lines");

console.log(`String
multiple
lines`);
*/
////////////////////////////////////////////////

/*
// IF ELSE CONDITION
const age = 15;
// const isOldEnough = age >= 18;

if (age >= 18) {
  console.log("Sarah can start driving license 🚗");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait for another ${yearsLeft} years`);
}

const birthYear = 2021;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);
*/
//////////////////////////////////////////////////

/*
// Coding Challenge #2

// const massMark = 95;
// const heightMark = 1.88;
// const massJohn = 85;
// const heightJohn = 1.76;

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / heightJohn ** 2;

if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI is higher than John's!`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher that Mark's (${BMIMark})`);
}
*/
/////////////////////////////////////////////

/*
// Type Conversion
const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(inputYear + 18);

console.log(Number("Jonas"));
console.log(typeof NaN);

console.log(String(23), 23);

// Type Coercion
console.log("I am " + 23 + " years old");
console.log("23" - "10" - 3);
console.log("23" / "2");

let n = "1" + 1; // '11'
n = n - 1;
console.log(n);
*/
///////////////////////////////////////////
/*
// Truth or False (Boolean Coersion)
// 5 Falsey Values: 0, '', undefined, null and NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Jonas"));
console.log(Boolean({}));

const money = 0;
if (money) {
  console.log("Dont spend it all!");
} else {
  console.log("You should get a job !");
}

let height;
if (height) {
  console.log("YAY! Height is define");
} else {
  console.log("Height is UNDEFINED");
}
*/
///////////////////////////////////////////////
/*
// Equality Operator
const age = "18";
if (age === 18) console.log("You just became an adult (strict)");

if (age == 18) console.log("You just became an adult (loose)");

const favorite = Number(prompt("What's your favorite number?"));
console.log(favorite);
console.log(typeof favorite);

if (favorite === 23) {
  console.log("Cool!");
} else if (favorite === 7) {
  console.log("Amazing");
} else {
  console.log("Number neither 23 nor 7");
}

if (favorite !== 23) console.log("Why not 23?");
*/
////////////////////////////////////////////////
/*
// Boolean Logic
const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

if (hasDriversLicense && hasGoodVision) {
  console.log("Sarah is able to drive");
} else {
  console.log("Someone else should drive..");
}

const isTired = true; // C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Sarah is able to drive");
} else {
  console.log("Someone else should drive..");
}
*/
//////////////////////////////////////////////////
/*
// CODING CHALLENGE #3
// const scoreDolphins = (96 + 108 + 89) / 3;
// console.log(scoreDolphins);

// const scoreKoalas = (88 + 91 + 110) / 3;
// console.log(scoreKoalas);

// if (scoreDolphins > scoreKoalas) {
//   console.log("Team Dolphins wins the trophy!");
// } else if (scoreKoalas > scoreDolphins) {
//   console.log("Team Koalas wins the trophy");
// } else if (scoreDolphins === scoreKoalas) {
//   console.log("Both wins!");
// } else {
//   console.log("No one wins");
// }

// BONUS 1
const scoreDolphins = (97 + 112 + 81) / 3;
console.log(scoreDolphins);

const scoreKoalas = (109 + 95 + 86) / 3;
console.log(scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
  console.log("Team Dolphins wins the trophy!");
} else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
  console.log("Team Koalas wins the trophy");
} else if (
  scoreDolphins === scoreKoalas &&
  scoreDolphins >= 100 &&
  scoreKoalas >= 100
) {
  console.log("Both wins!");
} else {
  console.log("No one wins");
}
*/
//////////////////////////////////////////////////
/*
// Switch Statement
// const day = "thursday";
//day === "thursday";

// switch (day) {
//   case "monday":
//     console.log("Plan course structure");
//     console.log("Go to coding meetup");
//     break;
//   case "tuesday":
//     console.log("Prepare theory videos");
//     break;
//   case "wednesday":
//   case "thursday":
//     console.log("Write code examples");
//     break;
//   case "friday":
//     console.log("Record videos");
//     break;
//   case "saturday":
//   case "sunday":
//     console.log("Enjoy the weekends");
//     break;
//   default:
//     console.log("Not a valid day!");
// }

const day = "thursday";

if (day === "monday") {
  console.log("Plan course structure");
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Write code examples");
} else if (day === "friday") {
  console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("Enjoy the weekends");
} else {
  console.log("Not a valid day!");
}
*/
/////////////////////////////////////////////////
/*
// CONDIIONAL OPERATOR (TERNARY)
const age = 23;
age >= 18 ? console.log("Can drink wine") : console.log("Only water");

const drink = age >= 18 ? "wine" : "water";
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = "wine";
} else {
  drink2 = "water";
}
console.log(drink2);

console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);
*/
//////////////////////////////////////////////////

//  CODING CHALLENGE #4

// const value1 = 275;
// const value2 = 40;
// const value3 = 430;

// let tip;
// let total;
// if (value1 >= 50 && value1 <= 300) {
//   tip = value1 * 0.3;
//   total = value1 + tip;
//   console.log(
//     `The bill was ${value1}, the tip is ${tip}, and the total value ${total}`
//   );
// } else if (value1 > 300) {
//   tip = value1 * 0.2;
//   total = value1 + tip;
//   console.log(
//     `The bill was ${value1}, the tip is ${tip}, and the total value ${total}`
//   );
// } else {
//   console.log("The bill is too small, no tip required!");
// }
// const value = 275;
// const tip = value * 0.15;
// const tip2 = value * 0.2;
// const total = value + tip;

// value >= 50 && value <= 300
//   ? console.log(
//       `The bill was ${value}, the tip is ${tip}, and the total value ${total}`
//     )
//   : console.log(
//       `The bill was ${value}, the tip is ${tip2}, and the total value ${total}`
//     );

const bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(
  `The bill was ${bill}, the tip is ${tip}, and the total value ${bill + tip}`
);
