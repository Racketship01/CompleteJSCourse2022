// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
// PROBLEM 01:
// We work for a company building a smart home thermometer.Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error"

// Solving Problems
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understand the Problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temp?
// - Whats a sensor error? And what to do?

// 2) Breaking up into sub-problems
//  - How to ignore errors?
//  - Find max value in temp array
//  - Find min value in temp array
//  - Subtract min from max (amp) and return it

const calcTempAmp = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];

    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) {
      max = curTemp;
    } else if (curTemp < min) {
      min = curTemp;
    }
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmp(temperatures);
console.log(amplitude);

// PROBLEM 02:
//  Function should now receive 2 arrays of temps

// 1) Understanding the problems
//  - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

//  2) Breaking up into sub-problems
//  - How to merge 2 arrays?

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

const temperatures1 = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const temperatures2 = [-1, 'error', 9, 9, 5];

const calcTempAmpNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];

    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) {
      max = curTemp;
    } else if (curTemp < min) {
      min = curTemp;
    }
  }
  console.log(max, min);
  return max - min;
};

const amplitudeNew = calcTempAmpNew(temperatures1, temperatures2);
console.log(amplitudeNew);
*/
//////////////////////////////////////////////////
/*
// Debugging (Fixing Errors) Console and Breakpoints

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',

    // C) FIX
    value: Number(prompt('Degree celsius:')),
  };

  //   B) FIND BUG
  //   console.table(measurement);

  //   console.log(measurement.value);
  //   console.warn(measurement.value);
  //   console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A) IDENTIFY
// console.log(measureKelvin());

//  Note: Prompt function always return a string value

// Using a debugger
const temperatures1 = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const temperatures2 = [-1, 'error', 9, 9, 5];

const calcTempAmpBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];

    debugger; //same as breakpoint in source debugger
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) {
      max = curTemp;
    } else if (curTemp < min) {
      min = curTemp;
    }
  }
  console.log(max, min);
  return max - min;
};

// A) IDENTIFY
const amplitudeBug = calcTempAmpBug(temperatures1, temperatures2);
console.log(amplitudeBug);
*/
//////////////////////////////////////////////////

/*
// Challenge 01:
//  1) Understanding problem
//      - Displays a string with array?
//      - Create function that takes array and logs a string

//  2) Breaking up into sub-problem
//      - How to display a string?
//      - How to print dots in string?

// for (i = 0; i < array.length; i++)
//   document.writeln((i+1) + ": " + array[i]);

const printForecast = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log('... ' + arr[i] + '°C in ' + (i + 1) + ' days' + '...');
  }
};

const week1 = [17, 21, 23];
const week2 = [12, 5, -5, 0, 4];

const weekForecast = week1.concat(week2);
// console.log(printForecast(weekForecast));

// Solution:
//  1) Understanding problem
//      - Array transformed to string, seperated by ...
//      - What is X days? Anser: index + 1;

//  2) Breaking up into sub-problem
//      - Transform arrays into string
//      - Transform each elements to string with °C
//      - String needs to contain da (index + 1)
//      - Add ... between elements and start and end of string
//      - Log str to console

const printForecast1 = function (arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}°C in ${i + 1} days ...`;
  }
  console.log('...' + str);
};
printForecast1(week1);
printForecast1(week2);

// 2+3+5+4 = 9
// [2, 3, 4]
// Note: same with sum, string can also add to current str. (add multiple strs to a bigger str hthat kept growing after each iteration)
*/
