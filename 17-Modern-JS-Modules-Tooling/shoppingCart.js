// Exporting module

// Name Export
console.log('Exporting module'); // cart modules will be executed first at the importing module

// Blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

const shoppingCart = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 286;
const totalQuantity = 73;
export { totalPrice, totalQuantity as tq };

// Default Exports --when we only want to export one thing per module. if we want to export the same function we would simply export the value itself not the variable
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
