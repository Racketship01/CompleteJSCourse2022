'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// First AJAX call: XMLHttpRequest

const getCountryData = function (country) {
  // old way of AJAX calls
  const request = new XMLHttpRequest(); // allows to make request to the server
  request.open('GET', `https://restcountries.com/v2/name/${country}`); //  open method --basically open the request 1st: request method(GET, POST, HEAD,) to GET data, 2nd: URL --this get method uses to open the request
  request.send(); // send method --sending off request (will send of request in the URL declare at open method)

  //  AJAX call that we just send off here, is being done in the background, while the rest of the code keeps running. And so this is the asynchronous, non-blocking behavior. (same with img src --need to wait for load event, once done it will emit the fetched data in the load event)

  // to get the result being sent --need to register a callback on the new object created (request) for the load event.
  request.addEventListener('load', function () {
    // using this event listener we are waiting for that event. as data arrices, callback functionn will be called

    //console.log(this.responseText); // responseText property --only gonna be set once the data has actually arrived.

    // when data arrived --need to convert the JSON(big string of text) into JS object
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = ` <article class="country">
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
  });
};
getCountryData('philippines');
getCountryData('japan');
getCountryData('australia');

// NOTE: basically having 3 AJAX calls as we called function at same time, they might appear in different order because of data arrives slightly different time.
