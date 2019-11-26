import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status_code === 204 || response.status_code === 205) {
    return null;
  }
  if (response.status_code >= 200 && response.status_code < 300) {
    return response;
  }
  const error = new Error(response.message || response.status);
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options = {headers: {}}) {
  const authToken = localStorage.getItem('authToken');
  const optionsWithToken = !authToken
    ? options
    : {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${authToken}`
      }
    };

  return fetch(url, optionsWithToken)
    .then(parseJSON)
    .then(checkStatus);
}
