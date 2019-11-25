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
  LOAD_DISCOVERY_SHOWS,
  LOAD_DISCOVERY_SHOWS_SUCCESS,
  LOAD_DISCOVERY_SHOWS_ERROR,
  LOAD_SHOW_DETAILS,
  LOAD_SHOW_DETAILS_SUCCESS,
  LOAD_SHOW_DETAILS_ERROR,
  LOAD_SIMILAR_SHOWS,
  LOAD_SIMILAR_SHOWS_SUCCESS,
  LOAD_SIMILAR_SHOWS_ERROR,
  LOAD_SHOW_SEASON,
  LOAD_SHOW_SEASON_SUCCESS,
  LOAD_SHOW_SEASON_ERROR,
} from './constants';

/**
 * Load the discovery shows, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DISCOVERY_SHOWS
 */
export function loadDiscoveryShows(page = 1) {
  return {
    type: LOAD_DISCOVERY_SHOWS,
    page
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
