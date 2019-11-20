import { LOAD_DISCOVERY_SHOWS, LOAD_DISCOVERY_SHOWS_SUCCESS, LOAD_DISCOVERY_SHOWS_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  shows: {
    discovery: false,
    search: false,
    favourites: false,
    browse: false
  },
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DISCOVERY_SHOWS: {
      const newState = { ...state };
      newState.shows.discovery = newState.shows.discovery
        ? {
          ...newState.shows.discovery,
          loading: true,
          page: action.page
        }
        : {
          loading: true,
          results: [],
          totalResults: false,
          page: action.page,
          error: false
        };

      return newState;
    }
    case LOAD_DISCOVERY_SHOWS_SUCCESS: {
      const newState = { ...state };
      newState.shows.discovery = {
        ...state.shows.discovery,
        loading: false,
        results: [...state.shows.discovery.results, ...action.shows.results],
        totalResults: action.shows.total_results
      };
      return newState;
    }

    case LOAD_DISCOVERY_SHOWS_ERROR: {
      const newState = { ...state };
      newState.shows.discovery = {
        ...state.shows.discovery,
        loading: false,
        error: action.error
      };
      return newState;
    }
    default:
      return state;
  }
}

export default appReducer;
