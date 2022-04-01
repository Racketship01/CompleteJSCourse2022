'use strict';

/*
// Constructor Function
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never create method inside constructor function --terrible to the performance of code for thousands of Person object --solution? use prototypes and prototypal inheritance
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
}; // simulated class --blueprint
const jonas = new Person('Jonas', 1991); // instance --actual with actual data
console.log(jonas);
console.log(jonas instanceof Person); // True -- operator to test instance

// 1. New {empty} is created
// 2. function is called, this keyword pointed to the new {}
// 3. empty new object {} linked to the prototype
// 4. function automatically return {} --no longer to be empty

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// Prototypes
console.log(Person.prototype); // any object has access to the method and properties from its prototype

// set method to prototype
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
}; // this keyword set to the object(created by constructor function) that is calling the method
jonas.calcAge(); // jonas object is connected to Person,prototype --prototypal inheritance
matilda.calcAge();
jack.calcAge();

console.log(jonas.prototype); // undefined
console.log(jonas.__proto__); // Step 3 --jonas variable --creates and link this proto property and it sets its value to the prototype property of the function (Person.prototype.calcAge()) that is being called.

console.log(jonas.__proto__ === Person.prototype); // True --  jonas object is essentially the prototype property of the constructor function
// jonas prototype is the prototype property of the Person constructor function.  

console.log(Person.prototype.isPrototypeOf(jonas)); // True
console.log(Person.prototype.isPrototypeOf(Person)); // False
console.log(jonas.__proto__.isPrototypeOf(jonas)); // True
console.log(jonas.__proto__.isPrototypeOf(Person)); // False

// NOTE: Person.prototype here is actually not the prototype of Person(variable--object). But instead, it is what's gonna be used as the prototype of all the objects that are created with the Person constructor function.

// can also set properties to prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

// NOTE: this property (hasOwnProperty) is not really directly in the object, so it's not its own property own properties are only the ones that are declared directly on the object itself. Not including the inherited properties

// Prototypal Inheritance on Built-In Objects

console.log(jonas.__proto__); // constructor: Person.prototype
console.log(jonas.__proto__.__proto__); // constructor: Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__.__proto__); // constructor: null

console.dir(Person.prototype.constructor); // constructor property points back at Person()

const arr = [3, 5, 9, 4, 5, 8, 5]; // Array Prototype
console.log(arr.__proto__); // all arrays get access to all method as arrays are object. Each array does not contain all of these methods but instead it will inherit those method

// same as creating new Array === []

console.log(arr.__proto__ === Array.prototype); // True

console.log(arr.__proto__.__proto__); // object constructor
console.log(arr.__proto__.__proto__.__proto__); // null
// console.dir(arr.__proto__.__proto__.__proto__);

// NOTE: the prototype property of the constructor (function) is gonna be the prototype of all the objects created by that constructor.

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

// TIP: extending the prototype of a built-in object is not a good idea if working in large project

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

///////////////////////////////////////////////////////

// Challenge 01

// 1.
const Car = function (made, speed) {
  this.made = made;
  this.speed = speed;
};

// 2.
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.made} is going at ${this.speed}km/h`);
};

// 3.
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.made} is decreasing speed at ${this.speed}km/h`);
};

// 4.
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
console.log(bmw, mercedes);

Car.prototype.cars = function () {
  this.accelerate();
  this.brake();
};
bmw.cars();
mercedes.cars();
*/
///////////////////////////////////////////////////////////////

// ES6 Classes

// class expression
//const PersonCl = class {};

// class declaration
class PersonCl {
  // similar way as constructor function --method of class called constructor
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // INSTANCE METHOD
  // Methods will be added to .prototype propert of the classes
  calcAge() {
    console.log(2037 - this.birthYear);
  } // -- will automatically be added to the prototype property of the class

  greet() {
    console.log(`Hi! I am ${this._fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // set a property that already exist
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a fullname`);
  }

  get fullName() {
    return this._fullName;
  }

  // STATIC METHOD
  static hey() {
    console.log('Hey there!');
    console.log(this);
  }
}
// to create new object, also uses "new" operator and constructor will automatically be called
const jonas = new PersonCl('Jonas Schedtmann', 1991);
console.log(jonas);
console.log(jonas.__proto__);
jonas.calcAge();
console.log(jonas.age);

console.log(jonas.__proto__ === PersonCl.prototype); // True --same with constructor function but the only difference is we can write the method inside the class

// adding method
// PersonCl.prototype.greet = function () {
//   console.log(`Hi! I am ${this.firstName}`);
// };
jonas.greet();
PersonCl.hey();

const walter = new PersonCl('Walter White', 1965);

// NOTE:
// 1. Classes are not hoisted --means we cannot use them before they are declared in the code
// 2. Classes are first class citizen --means we can pass them into functions and also return them a function
// 3. Classes are executed in strict mode

///////////////////////////////////////////////////////////////

// Setters and Getters
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);

account.latest = 50;
console.log(account.movements);

////////////////////////////////////////////////////////////////
/*
// Static Method

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const jonas1 = new Person('Jonas', 1991);

// add static method
Person.hey = function () {
  console.log('Hey there!');
  console.log(this); // Person object --whatever object is calling the method, will be the this key word inside of that function. And so here the this key word, is simply that entire constructor function.
};
Person.hey();
// jonas1.hey(); // Reference Error --not in the prototype of jonas1
*/
///////////////////////////////////////////////////////////

// Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }, // not a prototype property --just manual way of initializing the object
};
console.log(PersonProto.__proto__); // all objects has a prototype

const steven = Object.create(PersonProto); // manually set the prototype of an object, to any other object (PersonProto)
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__); // PersonProto
console.log(steven.__proto__ === PersonProto); // True
console.log(steven.__proto__ === PersonProto.prototype); // false --no new operator used thats why no prototype property created
console.log(PersonProto.hasOwnProperty('birthYear')); // false

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// NOTE:  Object.create creates a new object, and the prototype of that object will be the object that we passed in.

//////////////////////////////////////////////////////////////
/*
// Challenge 02

// 1.
class CarCl {
  constructor(made, speed) {
    this.made = made;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.made} is going at ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.made} is decreasing speed at ${this.speed}km/h`);
  }

  // 2.
  get speedUS() {
    return this.speed / 1.6;
  }

  // 3.
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
// 4.
const ford = new CarCl('Ford', 120);
console.log(ford); // 120
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();

ford.speedUS = 50;
console.log(ford); // 80
*/
//////////////////////////////////////////////////////////////

// Inheritance between Classes: Constructor Function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear); // we used call method to call person function pointing the this keyword in Student object --regular function calling this keyword is undefined
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`Hi! my name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 1997, 'Computer Studies');
mike.introduce();
mike.calcAge();

// the link between instance and prototype has been made automatically by creating new object with the **new operator**

console.log(mike.__proto__); // person.prototype
console.log(mike.__proto__.__proto__); // object.prototype

console.log(mike instanceof Object); // True
console.log(mike instanceof Student); // True
console.log(mike instanceof Person); // True --both true as we links two prototypes

Student.prototype.constructor = Student; // pointing back to student.prototype
console.dir(Student.prototype.constructor); //points to Person prototype as --reason for that is that we set the prototype property of the student using object.create. And so this makes it so that the constructor of student.prototype is still person.

///////////////////////////////////////////////////////////////

// Challenge 03
const Car = function (made, speed) {
  this.made = made;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.made} is going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.made} is decreasing speed at ${this.speed}km/h`);
};

const EV = function (made, speed, charge) {
  Car.call(this, made, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.made} going ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.accelerate();
tesla.accelerate();
tesla.brake();

// child class can overwrite a method that inherited from the parent class

// NOTE: when there are two methods or properties with the same name in a prototype chain, the first one that appears in the chain is the one that's gonna be used
