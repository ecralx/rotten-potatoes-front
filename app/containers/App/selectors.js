import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;

const selectRoute = (state) => state.router;

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.currentUser
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const makeSelectDiscoveryShows = () => createSelector(
  selectGlobal,
  (globalState) => globalState.shows.discovery
);

const makeSelectSearchShows = () => createSelector(
  selectGlobal,
  (globalState) => globalState.shows.search
);

const makeSelectDetailedShows = () => createSelector(
  selectGlobal,
  (globalState) => globalState.shows.detailed
);

const makeSelectShowDetails = (showId) => createSelector(
  selectGlobal,
  (globalState) => (globalState.shows.detailed || []).find(({ tmdb_id: id }) => Number(id) === Number(showId))
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.location
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectDiscoveryShows,
  makeSelectSearchShows,
  makeSelectDetailedShows,
  makeSelectShowDetails,
  makeSelectLocation,
};
