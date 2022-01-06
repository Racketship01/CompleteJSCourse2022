"use strict";
/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive!");

// const interface = "Audio";
*/
///////////////////////////////////////////////
/*
// Function Declarations 

function logger() {
  console.log("May name is Jonas");
}

// calling / running / invoking a function
logger();
logger();
logger();

//generic function 
function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} orange.`;
  return juice;
}

// fruitProcessor(17, 17);  the result(output) of running this function here is the juice that we just returned then we need to save that value by creating a new variable : if we want to use the (juice) value that was returned we need to store it in a variable
const fruitJuices = fruitProcessor(17, 17);
console.log(fruitJuices);

console.log(fruitProcessor(17, 17)); //directly logged it to the console
*/
//////////////////////////////////////////////////
/*
// Function Declarations
function calcAge1(birthYear) {
  return 2037 - birthYear;
}
const age1 = calcAge1(1991);

// Function Expressions
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);
console.log(age1, age2);
*/
/////////////////////////////////////////////////
/*
// Function Expressions
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

// Arrow Function
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

// one parameter & multiple return value
// const yearsUntilRetirement = (birthYear) => {
//   const age = 2037 - birthYear;
//   const retirement = 65 - age;
//   return retirement;
// };

// console.log(yearsUntilRetirement(1991));

// multiple parameter & multiple return value
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retire in ${retirement} years`;
};

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1980, "Bob"));
*/
///////////////////////////////////////////////////
/*
// Function calling other function
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applesPieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applesPieces} pieces of apples and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitProcessor(2, 3));
*/
//////////////////////////////////////////////////
/*
// Review Function

// Convert from arrow to normal function (get rid of the arrow sign and write function keyword)

const age = function (birthYear) {
  return 2037 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstName) {
  const calcAge = age(birthYear);
  const retirement = 65 - calcAge;

  if (retirement > 0) {
    console.log(`${firstName} retire in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} is already retired!`);
    return -1;
  }
};

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1970, "Mike"));
*/
///////////////////////////////////////////////////
/*
// Coding Challenge 1
const calcAverage = (a, b, c) => (a + b + c) / 3;

// Test1
// const scoreDolphins = calcAverage(44, 23, 71);
// const scoreKoalas = calcAverage(65, 54, 49);
// console.log(scoreDolphins, scoreKoalas);

// Test2
const scoreDolphins = calcAverage(85, 54, 41);
const scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas);

const checkWinner = function (avgDolphin, avgKoalas) {
  const avgScoreDolphin = avgDolphin;
  const avgScoreKoalas = avgKoalas;

  if (avgScoreDolphin >= 2 * avgScoreKoalas) {
    console.log(`Dolphin win (${avgDolphin} vs ${avgKoalas})`);
    return avgScoreDolphin;
  } else if (avgScoreKoalas >= 2 * avgScoreDolphin) {
    console.log(`Koala win (${avgKoalas} vs ${avgDolphin})`);
    return avgScoreKoalas;
  } else {
    console.log("Draw match. No team WINS");
    return -1;
  }
};
// console.log(checkWinner(60, 28));
console.log(checkWinner(scoreDolphins, scoreKoalas));

// note: can use the variable name as an argument and can execute function buddy without return keyword by simply call the function
*/
///////////////////////////////////////////////////
/*
// Arrays
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";

const years = new Array(1991, 1992, 1993, 1994);

const friends = ["Michael", "Steven", "Peter"];
console.log(friends);
console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = "Jay;";
console.log(friends);

const firstName = "Jonas";
const jonas = [firstName, "Schedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);
console.log(jonas.length);

// Exercise
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const y = [1991, 1992, 1993, 1994];

const age1 = calcAge2(y[0]);
const age2 = calcAge2(y[1]);
const age4 = calcAge2(y[y.length - 1]);
console.log(age1, age2, age4);

//new array technique
const ages = [calcAge2(y[0]), calcAge2(y[1]), calcAge2(y[y.length - 1])];
console.log(ages);
*/
////////////////////////////////////////////////
/*
// Basic Array Operations (METHODS)
const friends = ["Michael", "Steven", "Peter"];

// Add elements
const newLength = friends.push("Jay");
console.log(friends);
console.log(newLength);

friends.unshift("John");
console.log(friends);

// Remove elements
friends.pop(); //last
const popped = friends.pop();
console.log(popped);
console.log(friends);

// **note: Pop method also return the removed element but doesnt return the length of new array

friends.shift(); //first
console.log(friends);

console.log(friends.indexOf("Steven"));
console.log(friends.indexOf("Bob"));

friends.push(23);
console.log(friends.includes("Steven"));
console.log(friends.includes("Bob"));
// console.log(friends.includes("23"));
console.log(friends.includes(23));

if (friends.includes("Steven")) {
  console.log("You have a friend called Steven");
}
*/
/////////////////////////////////////////////////
/*
// Coding Challeng 2

// const calcTip = function (bill) {
//   if (bill >= 50 && bill <= 300) {
//     const tip = bill * 0.15;
//     console.log(`The bill is ${bill}php and has a tip of ${tip}php`);
//     return tip;
//   } else {
//     const tip = bill * 0.2;
//     console.log(
//       `The bill is ${bill}php and not in the range of 50 - 300, therefore has a tip of ${tip}php`
//     );
//     return tip;
//   }
// };
// console.log(calcTip(100));

// const bills = [125, 555, 44];

// const bill1 = calcTip(bills[0]);
// const bill2 = calcTip(bills[1]);
// const bill3 = calcTip(bills[2]);
// console.log(bill1, bill2, bill3);

// Solution
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const bills = [125, 555, 44];

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

console.log(bills, tips);

const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(total);
*/
//////////////////////////////////////////////////
/*
// Object
const jonas1 = {
  firstName: "Jonas",
  lastName: "Schedmtmann",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
};

// Dot vs. Bracket Notation
const jonas = {
  firstName: "Jonas",
  lastName: "Schedmtmann",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
};

console.log(jonas);

console.log(jonas.lastName);
console.log(jonas["firstName"]); //in bracket, can put any expression

const nameKey = "Name";
console.log(jonas["first" + nameKey]);
console.log(jonas["last" + nameKey]);

const interestedIn = prompt(
  "What do you want to know about Jonas? Choose between firstName, lastName, age, job and friends"
);

if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);
} else {
  console.log(
    "Wrong request! Choose between firstName, lastName, age, job and friends"
  );
}

// add new properties object
jonas.location = "Portugal";
jonas["twitter"] = "@jonasschedtman";
console.log(jonas);

// Challenge
console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his bestfriend is called ${jonas.friends[0]}`
);
*/
//////////////////////////////////////////////////
/*
// Object Method
const jonas = {
  firstName: "Jonas",
  lastName: "Schedmtmann",
  birthYear: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  hasDriverLicense: true,

  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // }, function expression that needed an argument

  // calcAge: function () {
  //   return 2037 - this.birthYear;
  // }, uses to avoid repeated argument

  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },

  // Challenge
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${
      this.job
    } and he has ${
      this.hasDriverLicense ? "a" : "no"
    } drivers license. He also has ${this.friends.length} friends namely ${
      this.friends
    }`;
  },
};
console.log(jonas.calcAge());
console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.getSummary());

// console.log(jonas.calcAge()); // jonas.calcAge is computed first and become the function value, then with the parenthesis inputted argument and passed in 1991

// console.log(jonas["calcAge"](1991)); //we access the property using the brackets (jonas["calcAge"]) and then basically replaces with function, then we call the function (1991).
*/
//////////////////////////////////////////////////
/*
// Challenge 3
const john = {
  firstName: "John",
  lastName: "Smith",
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;
  },
};
console.log(john.calcBMI());

const mark = {
  firstName: "Mark",
  lastName: "Miller",
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;
  },
};
console.log(mark.calcBMI());

console.log(
  `${mark.firstName} ${
    mark.lastName
  }'s BMI (${mark.calcBMI()}) is higher than ${john.firstName} ${
    john.lastName
  }'s (${john.calcBMI()}) `
);

// solution
const mark1 = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;
  },
};

const john1 = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;
  },
};

mark1.calcBMI();
john1.calcBMI();
console.log(mark1.bmi, john1.bmi);

if (mark1.bmi > john1.bmi) {
  console.log(
    `${mark1.fullName}'s BMI (${mark1.bmi}) is higher than ${john1.fullName}'s (${john1.bmi}) `
  );
} else if (john1.bmi > mark1.bmi) {
  console.log(
    `${john1.fullName}'s BMI (${john1.bmi}) is higher than ${mark1.fullName}'s (${mark1.bmi}) `
  );
}
*/
/////////////////////////////////////////////////
/*
// For Loop

// for loop keeps running while condition is TRUE
//  rep = rep + 1
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep}!`);
}
*/

/*
// Looping Arrays, Breaking and Continuing
// show all arrays in console: for loop
const jonas = [
  "Jonas",
  "Schedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];
// create new arrays based on above original array
const types = [];

for (let i = 0; i < jonas.length; i++) {
  // reading from jonas array
  console.log(jonas[i], typeof jonas[i]);

  // filling types array
  // types[i] = typeof jonas[i];
  types.push(typeof jonas[i]); //its important that we add the new element to the end of array and not in beginning
}

console.log(types);

// computing ages in array: for loop
const years = [1990, 1991, 1992, 1993];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

// Continue Statement
console.log("--- ONLY STRING ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== "string") continue;
  console.log(jonas[i], typeof jonas[i]);
}

// Break Statement
console.log("--- BREAK WITH NUMBERS ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === "number") break;
  console.log(jonas[i], typeof jonas[i]);
}
*/

/*
// Looping Backwards
const jonas = [
  "Jonas",
  "Schedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];

// Loops in loops
for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(i, jonas[i]);
}

for (let exercise = 1; exercise <= 4; exercise++) {
  console.log(`--------Starting Exercise ${exercise}`);

  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep}`);
  }
}
*/

/*
// While Loop

// for loop
// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep}!`);
// }

// while loop
let rep = 1;
while (rep <= 10) {
  console.log(`WHILE: Lifting weights repetition ${rep}!`);
  rep++;
}

// Math.random() - create number between zero and one
// Math.trunc() - gives us a number between zero and five
let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("Loop is about to end....");
}
*/
//////////////////////////////////////////
/*
// Coding Challenge 4

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

const calcTip = (bill) =>
  bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

for (let i = 0; i < bills.length; i++) {
  console.log(bills[i]);

  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
}

console.log(tips);
console.log(totals);

const calcAverage = function () {
  const sum = [];
  for (let i = 0; i < bills.length; i++) {
    sum.push(bills[i] + sum[i]);

    const avg = sum[i] / (bills.length - 1);
  }
};
console.log(calcAverage);

// Solution
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

const calcTip = (bill) =>
  bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);

  tips.push(tip);
  totals.push(tip + bills[i]);
}

console.log(bills, tips, totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // sum = sum + arr[i];
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(calcAverage(totals));
*/
//////////////////////////////////////////////////
