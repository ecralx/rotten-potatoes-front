/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  RESET_DISCOVERY_SHOWS,
  LOAD_DISCOVERY_SHOWS,
  LOAD_DISCOVERY_SHOWS_SUCCESS,
  LOAD_DISCOVERY_SHOWS_ERROR,
  LOAD_FAVOURITE_SHOWS,
  LOAD_FAVOURITE_SHOWS_SUCCESS,
  LOAD_FAVOURITE_SHOWS_ERROR,
  RESET_SEARCH_SHOWS,
  LOAD_SEARCH_SHOWS,
  LOAD_SEARCH_SHOWS_SUCCESS,
  LOAD_SEARCH_SHOWS_ERROR,
  LOAD_SHOW_DETAILS,
  LOAD_SHOW_DETAILS_SUCCESS,
  LOAD_SHOW_DETAILS_ERROR,
  LOAD_SIMILAR_SHOWS,
  LOAD_SIMILAR_SHOWS_SUCCESS,
  LOAD_SIMILAR_SHOWS_ERROR,
  LOAD_SHOW_SEASON,
  LOAD_SHOW_SEASON_SUCCESS,
  LOAD_SHOW_SEASON_ERROR,
  
  POST_ADD_FAVOURITE,
  POST_ADD_FAVOURITE_SUCCESS,
  POST_ADD_FAVOURITE_ERROR,
  POST_REMOVE_FAVOURITE,
  POST_REMOVE_FAVOURITE_SUCCESS,
  POST_REMOVE_FAVOURITE_ERROR,

  POST_REGISTER_USER,
  POST_REGISTER_USER_SUCCESS,
  POST_REGISTER_USER_ERROR,
  POST_LOGIN_USER,
  POST_LOGIN_USER_SUCCESS,
  POST_LOGIN_USER_ERROR,
} from './constants';

export function resetDiscoveryShows() {
  return {
    type: RESET_DISCOVERY_SHOWS,
  };
}

/**
 * Load the discovery shows, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DISCOVERY_SHOWS
 */
export function loadDiscoveryShows(page = 1, genres = '') {
  return {
    type: LOAD_DISCOVERY_SHOWS,
    page,
    genres
  };
}

/**
 * Dispatched when the discovery shows are loaded by the request saga
 *
 * @param  {array} shows The discovery shows data
 *
 * @return {object}      An action object with a type of LOAD_DISCOVERY_SHOWS_SUCCESS passing the discovery shows
 */
export function discoveryShowsLoaded(shows) {
  return {
    type: LOAD_DISCOVERY_SHOWS_SUCCESS,
    shows,
  };
}

/**
 * Dispatched when loading the discovery shows fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_DISCOVERY_SHOWS_ERROR passing the error
 */
export function discoveryShowsLoadingError(error) {
  return {
    type: LOAD_DISCOVERY_SHOWS_ERROR,
    error,
  };
}

export function loadFavouriteShows(page = 1) {
  return {
    type: LOAD_FAVOURITE_SHOWS,
    page
  };
}

export function favouriteShowsLoaded(shows) {
  return {
    type: LOAD_FAVOURITE_SHOWS_SUCCESS,
    shows,
  };
}

export function favouriteShowsLoadingError(error) {
  return {
    type: LOAD_FAVOURITE_SHOWS_ERROR,
    error,
  };
}

export function resetSearchShows() {
  return {
    type: RESET_SEARCH_SHOWS,
  };
}

export function loadSearchShows(query, page = 1) {
  return {
    type: LOAD_SEARCH_SHOWS,
    query,
    page
  };
}

export function searchShowsLoaded(shows) {
  return {
    type: LOAD_SEARCH_SHOWS_SUCCESS,
    shows,
  };
}

export function searchShowsLoadingError(error) {
  return {
    type: LOAD_SEARCH_SHOWS_ERROR,
    error,
  };
}

export function loadShowDetails(id) {
  return {
    type: LOAD_SHOW_DETAILS,
    id
  };
}

export function detailedShowLoaded(show) {
  return {
    type: LOAD_SHOW_DETAILS_SUCCESS,
    id: show.tmdb_id,
    show,
  };
}

export function detailedShowLoadingError(id, error) {
  return {
    type: LOAD_SHOW_DETAILS_ERROR,
    id,
    error,
  };
}

export function loadShowSimilars(id) {
  return {
    type: LOAD_SIMILAR_SHOWS,
    id
  };
}

export function similarShowsLoaded(id, shows) {
  return {
    type: LOAD_SIMILAR_SHOWS_SUCCESS,
    id,
    shows,
  };
}

export function similarShowsLoadingError(id, error) {
  return {
    type: LOAD_SIMILAR_SHOWS_ERROR,
    id,
    error,
  };
}

export function loadShowSeason(id, seasonNumber) {
  return {
    type: LOAD_SHOW_SEASON,
    id,
    seasonNumber
  };
}

export function seasonShowLoaded(id, seasonNumber, episodes) {
  return {
    type: LOAD_SHOW_SEASON_SUCCESS,
    id,
    seasonNumber,
    episodes
  };
}

export function seasonShowLoadingError(id, seasonNumber, error) {
  return {
    type: LOAD_SHOW_SEASON_ERROR,
    id,
    seasonNumber,
    error,
  };
}

export function registerUser(email, password) {
  return {
    type: POST_REGISTER_USER,
    email,
    password
  };
}

export function registerUserLoadingError(error) {
  return {
    type: POST_REGISTER_USER_ERROR,
    error,
  };
}

export function loginUser(email, password) {
  return {
    type: POST_LOGIN_USER,
    email,
    password
  };
}

export function loginUserLoadingError(error) {
  return {
    type: POST_LOGIN_USER_ERROR,
    error,
  };
}

export function addFavourite(id) {
  return {
    type: POST_ADD_FAVOURITE,
    id
  };
}

export function addedFavourite(id) {
  return {
    type: POST_ADD_FAVOURITE_SUCCESS,
    id,
  };
}

export function addedFavouriteLoadingError(error) {
  return {
    type: POST_ADD_FAVOURITE_ERROR,
    error,
  };
}

export function removeFavourite(id) {
  return {
    type: POST_REMOVE_FAVOURITE,
    id
  };
}

export function removedFavourite(id) {
  return {
    type: POST_REMOVE_FAVOURITE_SUCCESS,
    id,
  };
}

export function removedFavouriteLoadingError(error) {
  return {
    type: POST_REMOVE_FAVOURITE_ERROR,
    error,
  };
}