'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountryData = function (data, className = '') {
  const html = ` <article class="country ${className}" >
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫 </span>${(
        +data.population / 1000000
      ).toFixed(2)}</p>
      <p class="country__row"><span>🗣️ </span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰 </span>${data.currencies[0].name}</p>
  </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
///////////////////////////////////////

/*
const getCountry = function (country) {
  // First AJAX call: XMLHttpRequest
  // old way of AJAX calls

  // AJAX call country 1
  const request = new XMLHttpRequest(); // allows to make request to the server
  request.open('GET', `https://restcountries.com/v2/name/${country}`); //  open method --basically open the request 1st: request method(GET, POST, HEAD,) GET -> requesting data, 2nd: URL --address where reqs sending
  request.send(); // send method --sending off request (will send of request in the URL declare at open method)

  //  AJAX call that we just send off here, is being done in the background, while the rest of the code keeps running. And so this is the asynchronous, non-blocking behavior. (same with img src --need to wait for load event, once done it will emit the fetched data in the load event)

  // to get the result being sent --need to register a callback on the new object created (request) for the load event.
  request.addEventListener('load', function () {
    // using this event listener we are waiting for that event. as data arrices, callback functionn will be called

    //console.log(this.responseText); // responseText property --only gonna be set once the data has actually arrived.

    // when data arrived --need to convert the JSON(big string of text) into JS object
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country data 1
    renderCountryData(data);

    // get neighbour country (2)
    const neighbour = data.borders?.[0];
    if (!neighbour) return;
    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    // Callback Hell
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountryData(data2, 'neighbour');
    });
  });
};
getCountry('philippines');
getCountry('portugal');
getCountry('germany');

// NOTE: basically having 3 AJAX calls as we called function at same time, they might appear in different order because of data arrives slightly different time.


// Callback Hell --nested callback (function inside function) in order to execute asynch tasks in sequence. This happens for all asynch task handled by callbacks not just AJAX calls --easily identify by the triangular shape form in vscode
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
// NOTE:  bad code, because it will have more bugs, because the harder it is to understand code and to reason about the code, the more difficult it will be to add new features and to add more functionality to the application. -- SOLUTION FOR CALLBACK HELL -> PROMISES
*/
////////////////////////////////////////////////////
// Promises and Fetch API
// const request = fetch('https://restcountries.com/v2/name/philippines');
// console.log(request); // return a promise

// Consuming Promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);

//       return response.json(); // JSON is a method that is available on all the response objects that is coming from the fetch function, so all of the resolved values, NOTE: json is also asynch function and will return a new promise --thats why we need another then method
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountryData(data[0]);
//     }); // fetch will return a promise --assumed fulfilled state we can use the 'then' method that available on all promises --argument in the callback function at then method is the resulting value of the fulfilled promise
// };

// Chaining Promises
/*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => {
    // throwing errors manually
    console.log(response);
    if (!response.ok) {
      throw new Error(`Country not found (${response.status})`); // throw --will immediately terminiate current function just like return does
    } // the effect of creating and throwing an error in any of these then method is that the promise will immediately reject --the return rejected promise will be propogate down to the catch handler
    return response.json();
  })
    .then(data => {
      console.log(data);
      renderCountryData(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;
      
      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`) // then method will always returns a promise no matter if we actually return it or not. But if we do return a value, that value will become the fulfillment value of the next then method --the fulfilled value of the promise wil become the body --any error will cause any promise to reject
      .then(response => response.json())
        .then(data => renderCountryData(data, 'neighbour'));
      })
      .catch(err => {
        console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}.Try again!`); // error generated here is a real JS object --we can create errors in JS with a constructor like map or set.
    }) // catch method also returns a promise --can also be chain
    .finally(() => {
      countriesContainer.style.opacity = 1;
    }); // finally method called whatever happens to the promise either fulfilled or rejected is always be called
    // always return to promise and then handle it outside by simply continuing the chain
    
    //  NOTE: fetch promise only rejects when there is no internet connection --with the real error of 404 the fetch promise will still get fulfilled so there's no rejection(error) that catch handler can catch
};
// getCountryData('philippines');
// getCountryData('portugal');
*/

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data);
      renderCountryData(data[0]);
      const neighbour = data[0].borders?.[0];
      // if (!neighbour) throw new Error('No neighbour found!');
      if (!neighbour) return;

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        ' Country not found'
      ).then(data => renderCountryData(data, 'neighbour'));
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}.Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// Handling Rejected Promises
btn.addEventListener('click', function () {
  getCountryData('portugal');
});

// Throwing Errors Manually
// getCountryData('philippines');
// NOTE: whenever we want to create some error that we want to handle down here, in the catch handler, all we need to do is to throw, and create a new error

// Coding Challenge 01:

// 1.
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`Problem! Geocoding not found(${response.status})`);
      }
      //  console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`No country found! (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderCountryData(data[0]);
    })
    .catch(err => {
      console.error(`${err.message} 💥💥💥`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
///////////////////////////////////////////////////////
/*
// Event Loop

// 1
console.log('Test start');

// 4
setTimeout(() => console.log('0 sec timer'), 0);

// 3
Promise.resolve('Resolved Promise 1').then(res => console.log(res)); // allows us to build a promise --create a promise that is immediately has a success value(fulfilled) --this will executed first before timer because of microtasks queue

Promise.resolve('Resolved Promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

// 2
console.log('Test end');

// NOTE: --code outside any callback will run first --Both timer and a promise will finish at the same time
*/
/////////////////////////

// Building Simple Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening!');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN!');
    } else {
      reject(new Error('You LOST!'));
    }
  }, 2000);
}); // the executor function has two argument function of resolve and reject

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (secs) {
  return new Promise(function (resolve) {
    setTimeout(resolve, secs * 1000);
  });
};
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
    return wait(1);
  })
  .then(() => console.log('5 seconds passed'));

// Static method of Promise Constructor
Promise.resolve('Resolved Promise 1').then(res => console.log(res));

Promise.reject(new Error('Rejected Promise 1')).catch(res =>
  console.error(res)
);
