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
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
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

/*
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
*/
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
////////////////////////////////////////
/*
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
*/
///////////////////////////////////////////

// Promisifying the Geolocation API
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// const getPositon = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPositon().then(pos => console.log(pos));
/*
const whereAmI = function () {
  getPositon()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
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

// btn.addEventListener('click', whereAmI);

/*
// Challenge 02 --Promisifying source attribute of an image in asynchronously
const images = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      images.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image is not found'));
    });
  });
};

const wait = function (secs) {
  return new Promise(function (resolve) {
    setTimeout(resolve, secs * 1000);
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(res => {
    console.log('Image 1 loaded');
    currentImg = res;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';

    return createImage('img/img-2.jpg');
  })
  .then(img => {
    console.log('Image 2 loaded');
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';

    return createImage('img/img-3.jpg');
  })
  .then(img => {
    console.log('Image 3 loaded');
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(`${err.message}  💥💥💥`));
*/
///////////////////////////////////////////////////////

// function doStep1(init) {
//   return init + 1;
// }

// function doStep2(init) {
//   return init + 2;
// }

// function doStep3(init) {
//   return init + 3;
// }

// function doOperation() {
//   let result = 0;
//   result = doStep1(result);
//   result = doStep2(result);
//   result = doStep3(result);
//   console.log(`result: ${result}`);
// }

// doOperation();

///////////////////////////////////////////
/*
// Consuming Promises with Async/Await
const getPositon = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  const position = await getPositon();
  const { latitude: lat, longitude: lng } = position.coords;

  // Reverse Geocoding
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  // Country Data
  // fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res)); --is the same as below
  const response = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  ); // using await we can wait for the result of the promise --wait will stop execution at this point until promise is fulfilled --as soon as the promise resolved, it will be the value of the await expression
  console.log(response);
  const data = await response.json(); // same as before, no need then method for the new promise of json method
  console.log(data);
  renderCountryData(data[0]);
};
whereAmI();
// console.log('FIRST');
*/
/////////////////////////////////////////////////////
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

/*
// Error Handling With Try & Catch
const getPositon = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const position = await getPositon();
    const { latitude: lat, longitude: lng } = position.coords; // we dont need to throw manual error here because in case something went wrong with Geolocation, we already built promise that auto rejects and eventual get that error at the catch block

    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country Data
    const response = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!response.ok) throw new Error('Problem getting country data');
    console.log(response);
    const data = await response.json();
    console.log(data);
    renderCountryData(data[0]);

    // Returning values from Async Functions --the value that we return by the async function will become the fulfilled value of promise
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}💥💥💥`);
    renderError(`Something went wrong! 💥 ${err.message}`);

    // Reject promise returned from async function
    // rethrowing error basically throw error again to propagate it down in the catch
    throw err;
  }
};
console.log('1: Will get location');

// whereAmI()
//   .then(res => console.log(`2: ${res}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location')); // can use then metod to get the fulfilled value of the promise

// use IIFE for the async function
(async function () {
  try {
    const country = await whereAmI();
    console.log(`2: ${country}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();
*/
////////////////////////////////////////////////////////////
/*
// Running Promises in Parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    // Combinator function --allows to combine multiple promises
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]); // this will return a new promise --a promise that runs all these promises at the same time NOTE: if one of the promises rejects then the whole promises will be rejects as well (promise will short circuit if one promises rejects)
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};
get3Countries('philippines', 'thailand', 'mexico');

// NOTE: whenever you have a situation in which you need to do multiple asynchronous operations at the same time, and operations that don't depend on one another, then you should always, always run them in parallel, just like we did here using promise.all.
*/

/*
// Other Promise Combinators

// Promise.race --receives an array of promises and it also returns a promise (one result) --settled(value is available but doesnt matter if the promise got rejected or fulfilled) as soon as one of the input promises settles --the first settled promise wins the race(either fulfilled or reject)
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/philippines`),
    getJSON(`https://restcountries.com/v2/name/thailand`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res[0]);
})(); // KIM: Promise.race --we only get one result and not an array of the results of all the three
// in the real world Promise.race is actually very useful to prevent against never ending promises or also very long running promises.

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};
Promise.race([getJSON(`https://restcountries.com/v2/name/japan`), timeout(1)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled --takes an array of promises and will simply return an array of all the settled promises --no matter if the promises got rejected or not.
// similar to Promise.all in regard that it also returns an array of all the results, but the difference is that Promise.all will short circuit as soon as one promise rejects, but Promise.allSettled, simply never short circuits. So it will simply return all the results of all the promises.
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021] -- takes in an array of multiple promises and this one will then return the first fulfilled promise and it will simply ignore rejected promises. --similar with Promise.race but with the difference that rejected promises are ignored
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/
//////////////////////////////////////////////////////////

// Challenge 03
// Part 1
const images = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      images.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image is not found'));
    });
  });
};

const wait = function (secs) {
  return new Promise(function (resolve) {
    setTimeout(resolve, secs * 1000);
  });
};

let currentImg;

const loadNPause = async function () {
  try {
    const img1 = await createImage('img/img-1.jpg');
    console.log(`Loaded 1`);
    currentImg = img1;
    await wait(2); // wait function does resolved value, no need to save as variable
    currentImg.style.display = 'none';

    const img2 = await createImage('img/img-2.jpg');
    console.log(`Loaded 2`);
    currentImg = img2;
    await wait(2);
    currentImg.style.display = 'none';

    const img3 = await createImage('img/img-3.jpg');
    console.log(`Loaded 3`);
    currentImg = img3;
    await wait(2);
    currentImg.style.display = 'none';
  } catch (err) {
    console.error(`${err.message}  💥💥💥`);
  }
};
// loadNPause();

// Part 2
// const loadAll = async function (img1, img2, img3) {
//   try {
//     const imgArr = await Promise.allSettled(
//       [createImage(img1), createImage(img2), createImage(img3)],
//       wait(2)
//     );
//     console.log(imgArr.map(imgs => imgs));
//   } catch (err) {
//     console.error(`${err.message}  💥💥💥`);
//   }
// };

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img)); // createImage() returns a promise and we should await otherwise nothing will happen--we can use async and await -- and we can run the promises in parallel and use promise combinator
    console.log(imgs); // array of promises not images themselves

    // NOTE: once you need to use async await in a map method like this, which believe me is pretty common, then you end up with an array of promises that you can then as a next step handle like this.
    const image = await Promise.all(imgs); //get image elements themselves out of the promise? --awaits using promise combinator
    console.log(image);
    image.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(`${err.message}  💥💥💥`);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
