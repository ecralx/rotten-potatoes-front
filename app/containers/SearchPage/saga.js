/**
 * Gets the shows for the user to discover
 */

import {
  call, put, takeLatest
} from 'redux-saga/effects';
import { LOAD_SEARCH_SHOWS } from 'containers/App/constants';
import { searchShowsLoaded, searchShowsLoadingError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Api discover shows request/response handler
 */
export function* getSearchShows(action) {
  const requestedQuery = action.query;
  const requestedPage = action.page || 1;
  // todo : env variables 
  const requestURL = `http://127.0.0.1:5000/show/search?query=${requestedQuery}&page=${requestedPage}`;
  
  try {
    // Call our request helper (see 'utils/request')
    const shows = yield call(request, requestURL);
    yield put(searchShowsLoaded(shows));
  } catch (err) {
    yield put(searchShowsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* searchShowsData() {
  // Watches for LOAD_DISCOVERY_SHOWS actions and calls getDiscoveryShows when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_SEARCH_SHOWS, getSearchShows);
}
