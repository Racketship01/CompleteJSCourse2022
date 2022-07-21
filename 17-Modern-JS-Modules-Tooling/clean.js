'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
// budget[0].value = 10000; // mutable
// budget[9] = 'jonas'; // immutable

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;

const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // if (!user) user = 'jonas'; // just like setting default parameters

  // avoid data mutation
  // user = user.toLowerCase();
  const cleanUser = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // using ternary operator
  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  // using optional chaining(?.) and nullish operator (??)
  // const limit = spendingLimits?.[user] ?? 0;

  // const limit = getLimit(user);

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state; // we use spread operator to create copy of the state object which budget object by returning it. --using turnary operator if the condition is false

  // budget.push({ value: -value, description, user: cleanUser }); // budget.push --cannot use because object is freeze
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕'); // calling add expense function will no longer mutate the budget object --storing in a variable is like using array.push() method
console.log(newBudget1);

const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
console.log(newBudget2);

const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// const checkExpenses = function (state, limits) {
//   return state.map(entry =>
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'Limits' }
//       : entry
//   );
//   // const limit = spendingLimits?.[entry.user] ?? 0;
//   // for (const entry of budget)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };
// NOTE: in the map method, whatever returned from the callback will be the element in tha same position of the new array

// Pure Function
const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'Limits' }
      : entry
  );
// const limit = spendingLimits?.[entry.user] ?? 0;
// for (const entry of budget)
//   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure Function --doing console.log that create input-output
const logBigExpenses = function (state, bigLimit) {
  // functional version
  const bigExpense = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');
  console.log(bigExpense);

  // let output = '';
  // for (let entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)}  / ` : '';

  // if (entry.value <= -bigLimit) {
  //   output += `${entry.description.slice(-2)}  / `; // Emojis are count as 2 chars
  // }

  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};
logBigExpenses(finalBudget, 1000);
// console.log(budget);

// NOTE: in a real world, big functional application, we would use composing to create one function, which will then perform all of these operations at once.
// NOTE: we should always pass all the data that we need for a certain function to work right into that function so that it doesnt not depend on any outside data
// NOTE: immutability is not just for objects and array but also in regular variable. In funcitonal code never use let variable
