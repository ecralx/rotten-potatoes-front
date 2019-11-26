/**
 * Gets the shows for the user to discover
 */

import {
  call, put, takeLatest
} from 'redux-saga/effects';
import { push } from 'connected-react-router'
import { POST_LOGIN_USER, POST_REGISTER_USER } from 'containers/App/constants';
import { registerUserLoadingError, loginUserLoadingError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Api discover shows request/response handler
 */
export function* postRegisterUser(action) {
  const { email, password } = action;
  // todo : env variables 
  const requestURL = `http://127.0.0.1:5000/auth/register`;
  const options = {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers:{ 
      "Content-Type": "application/json"
    }
  }
  try {
    // Call our request helper (see 'utils/request')
    const { auth_token: authToken } = yield call(request, requestURL, options);
    if(!!authToken){
      localStorage.setItem('authToken', authToken);
      yield put(push('/'));
    } else {
      yield put(registerUserLoadingError({ message: 'User already exists. Please Log in.' }));
    }
  } catch (err) {
    yield put(registerUserLoadingError(err));
  }
}

export function* postLoginUser(action) {
  const { email, password } = action;
  // todo : env variables 
  const requestURL = `http://127.0.0.1:5000/auth/login`;
  const options = {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers:{ 
      "Content-Type": "application/json"
    }
  }
  try {
    // Call our request helper (see 'utils/request')
    const { auth_token: authToken } = yield call(request, requestURL, options);
    localStorage.setItem('authToken', authToken);
    yield put(push('/'));
  } catch (err) {
    yield put(loginUserLoadingError(err));
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
    takeLatest(POST_LOGIN_USER, postLoginUser),
    takeLatest(POST_REGISTER_USER, postRegisterUser),
  ];
}
