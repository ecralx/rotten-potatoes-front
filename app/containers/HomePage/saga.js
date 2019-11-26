/**
 * Gets the shows for the user to discover
 */

import {
  call, put, takeLatest
} from 'redux-saga/effects';
import { LOAD_DISCOVERY_SHOWS, POST_ADD_FAVOURITE, POST_REMOVE_FAVOURITE } from 'containers/App/constants';
import {
  addedFavourite,
  addedFavouriteLoadingError,
  removedFavourite,
  removedFavouriteLoadingError,
  discoveryShowsLoaded,
  discoveryShowsLoadingError
} from 'containers/App/actions';

import request from 'utils/request';

/**
 * Api discover shows request/response handler
 */
export function* getDiscoveryShows(action) {
  const requestedPage = action.page || 1;
  const requestedGenres = action.genres || '';
  // todo : env variables 
  const requestURL = `http://127.0.0.1:5000/show/discover?page=${requestedPage}&genres=${requestedGenres}`;
  
  try {
    // Call our request helper (see 'utils/request')
    const shows = yield call(request, requestURL);
    yield put(discoveryShowsLoaded(shows));
  } catch (err) {
    yield put(discoveryShowsLoadingError(err));
  }
}

export function* addFavourite(action) {
  const requestedId = action.id;
  // todo : env variables 
  const requestURL = `http://127.0.0.1:5000/user/favourite/add`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({tmdb_id : requestedId})
  }
  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, options);
    yield put(addedFavourite(requestedId));
  } catch (err) {
    yield put(addedFavouriteLoadingError(err));
  }
}

export function* removeFavourite(action) {
  const requestedId = action.id;
  // todo : env variables 
  const requestURL = `http://127.0.0.1:5000/user/favourite/remove`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({tmdb_id : requestedId})
  }
  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, options);
    yield put(removedFavourite(requestedId));
  } catch (err) {
    yield put(removedFavouriteLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* discoveryShowsData() {
  // Watches for LOAD_DISCOVERY_SHOWS actions and calls getDiscoveryShows when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield* [
    takeLatest(LOAD_DISCOVERY_SHOWS, getDiscoveryShows),
    takeLatest(POST_ADD_FAVOURITE, addFavourite),
    takeLatest(POST_REMOVE_FAVOURITE, removeFavourite)
  ];
}
