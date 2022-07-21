// Helpers Module
// goal: contain a couple of functions that being reuse over and over again in our project

import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// setting time after the request fail -- important in order to prevent bad internet connections
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}; // this function will return a new promise

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

/*
// one great candidate is to actually create a function (async function to do the fetching and also converting to JSON all in one step) --a function which encapsulates all of this and also some of the error handling
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(
      //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
      url
    );
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // as soon as any of these promises either rejects or fulfilled win race. If rejected promulgated down to catch handler and throw error to model module

    const data = await response.json(); // this response object is the return response of the fetch function and then this json method which returns another promise also need to await to get data

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    // if error occuring here: need to catch and throw in the catch handler
    return data;
  } catch (err) {
    // any error occuring here still return successful promise to the model module. Solution? Re-throwing the error being catch here by simply throw this new error
    throw err; // with this throw new error, the promise being returned from getJSON will now be rejected
  }
};

//------------------------------------------
// Upload new recipe

// sending data to API --using POST request
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // tell API the specific request being send is in the JSON format
      }, //some snippets of text which are like information about the reqs itself.
      body: JSON.stringify(uploadData), //payload of the reqs --data that will be send is called body --should be in JSON and using stringifu will convert data into JSON
    }); // fetch reqs funtion for POSTING(sending) data on to the API
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
*/
