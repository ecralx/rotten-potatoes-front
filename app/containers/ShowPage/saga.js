/**
 * Gets the shows for the user to discover
 */

import {
  call, put, takeLatest
} from 'redux-saga/effects';
import { LOAD_SHOW_DETAILS, LOAD_SIMILAR_SHOWS, LOAD_SHOW_SEASON } from 'containers/App/constants';
import {
  detailedShowLoaded,
  detailedShowLoadingError,
  similarShowsLoaded,
  similarShowsLoadingError,
  seasonShowLoaded,
  seasonShowLoadingError,
} from 'containers/App/actions';

import request from 'utils/request';

/**
 * Api discover shows request/response handler
 */
export function* getShowDetails(action) {
  const requestedId = action.id;
  // todo : env variables 
  const requestURL = `http://127.0.0.1:5000/show/${requestedId}`;

  try {
    // Call our request helper (see 'utils/request')
    const show = yield call(request, requestURL);
    yield put(detailedShowLoaded(show));
  } catch (err) {
    yield put(detailedShowLoadingError(requestedId, err));
  }
}

export function* getShowSimilars(action) {
  const requestedId = action.id;
  // todo : env variables 
  const requestURL = `http://127.0.0.1:5000/show/${requestedId}/similar`;
  
  try {
    // Call our request helper (see 'utils/request')
    const shows = yield call(request, requestURL);
    yield put(similarShowsLoaded(requestedId, shows.results));
  } catch (err) {
    yield put(similarShowsLoadingError(requestedId, err));
  }
}

export function* getShowSeason(action) {
  const requestedId = action.id;
  const requestedSeason = action.seasonNumber;
  // todo : env variables 
  const requestURL = `http://127.0.0.1:5000/show/${requestedId}/season/${requestedSeason}`;
  
  try {
    // Call our request helper (see 'utils/request')
    const shows = yield call(request, requestURL);
    yield put(seasonShowLoaded(requestedId, requestedSeason, shows.episodes));
  } catch (err) {
    yield put(seasonShowLoadingError(requestedId, requestedSeason, err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* detailedShowData() {
  // Watches for LOAD_SHOW_DETAILS actions and calls getShowDetails when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield* [
    takeLatest(LOAD_SHOW_DETAILS, getShowDetails),
    takeLatest(LOAD_SIMILAR_SHOWS, getShowSimilars),
    takeLatest(LOAD_SHOW_SEASON, getShowSeason)
  ];
}