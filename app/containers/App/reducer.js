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
} from './constants';

// The initial state of the App
export const initialState = {
  shows: {
    discovery: false,
    search: false,
    favourites: false,
    detailed: false
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
    case LOAD_SHOW_DETAILS: {
      const newState = { ...state };
      const show = (newState.shows.detailed || [])
        .find(({ tmdb_id: id }) => Number(id) === Number(action.id)) || {};
      newState.shows.detailed = (newState.shows.detailed || [])
        .filter(({ tmdb_id: id }) => Number(id) !== Number(action.id));
      newState.shows.detailed.push({
        tmdb_id: action.id,
        ...show,
        loading: true
      });
      return newState;
    }
    case LOAD_SHOW_DETAILS_SUCCESS: {
      const newState = { ...state };
      const show = (newState.shows.detailed || [])
        .find(({ tmdb_id: id }) => Number(id) === Number(action.id));
      newState.shows.detailed = newState.shows.detailed
        .filter(({ tmdb_id: id }) => Number(id) !== Number(action.id));      
      newState.shows.detailed.push({
        tmdb_id: action.id,
        ...show,
        ...action.show, 
        loading: false
      });
    return newState;
    }
    case LOAD_SHOW_DETAILS_ERROR: {
      const newState = { ...state };
      const show = (newState.shows.detailed || [])
        .find(({ tmdb_id: id }) => Number(id) === Number(action.id));
      newState.shows.detailed = newState.shows.detailed
        .filter(({ tmdb_id: id }) => Number(id) !== Number(action.id));
      newState.shows.detailed.push({
        tmdb_id: action.id,
        ...show,
        error: action.error,
        loading: false
      });
      return newState;
    }
    case LOAD_SIMILAR_SHOWS: {
      const newState = { ...state };
      const show = (newState.shows.detailed || [])
        .find(({ tmdb_id: id }) => Number(id) === Number(action.id)) || {};
      newState.shows.detailed = (newState.shows.detailed || [])
        .filter(({ tmdb_id: id }) => Number(id) !== Number(action.id));
      newState.shows.detailed.push({ ...show, loadingSimilar: true });
      return newState;
    }
    case LOAD_SIMILAR_SHOWS_SUCCESS: {
      const newState = { ...state };
      const show = (newState.shows.detailed || [])
        .find(({ tmdb_id: id }) => Number(id) === Number(action.id));
      newState.shows.detailed = newState.shows.detailed
        .filter(({ tmdb_id: id }) => Number(id) !== Number(action.id));      
      newState.shows.detailed.push({
        tmdb_id: action.id,
        ...show,
        similars: action.shows,
        loadingSimilar: false
      });
    return newState;
    }
    case LOAD_SIMILAR_SHOWS_ERROR: {
      const newState = { ...state };
      const show = (newState.shows.detailed || [])
        .find(({ tmdb_id: id }) => Number(id) === Number(action.id));
      newState.shows.detailed = newState.shows.detailed
        .filter(({ tmdb_id: id }) => Number(id) !== Number(action.id));
      newState.shows.detailed.push({
        tmdb_id: action.id,
        ...show,
        error: action.error,
        loadingSimilar: false
      });
      return newState;
    }
    default:
      return state;
  }
}

export default appReducer;
