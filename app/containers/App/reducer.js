import {
  LOAD_DISCOVERY_SHOWS,
  LOAD_DISCOVERY_SHOWS_SUCCESS,
  LOAD_DISCOVERY_SHOWS_ERROR,
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

// The initial state of the App
export const initialState = {
  user: {
    error: false
  },
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
    case RESET_SEARCH_SHOWS: {
      const newState = { ...state };
      newState.shows.search = false;

      return newState;
    }
    case LOAD_SEARCH_SHOWS: {
      const newState = { ...state };
      newState.shows.search = newState.shows.search
        ? {
          ...newState.shows.search,
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
    case LOAD_SEARCH_SHOWS_SUCCESS: {
      const newState = { ...state };
      newState.shows.search = {
        ...state.shows.search,
        loading: false,
        results: [...state.shows.search.results, ...action.shows.results],
        totalResults: action.shows.total_results
      };
      return newState;
    }
    case LOAD_SEARCH_SHOWS_ERROR: {
      const newState = { ...state };
      newState.shows.search = {
        ...state.shows.search,
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
    case LOAD_SHOW_SEASON: {
      const newState = { ...state };
      const show = (newState.shows.detailed || [])
        .find(({ tmdb_id: id }) => Number(id) === Number(action.id));
      if (!show || !show.seasons) {
        return newState;
      }
      const season = show.seasons
        .find(({season_number: seasonNumber}) => Number(seasonNumber) === Number(action.seasonNumber));
      show.seasons = show.seasons
        .filter(({season_number: seasonNumber}) => Number(seasonNumber) !== Number(action.seasonNumber));
      show.seasons.push({
        ...season,
        loadingEpisodes: true,
      });
      
      newState.shows.detailed = (newState.shows.detailed || [])
        .filter(({ tmdb_id: id }) => Number(id) !== Number(action.id));
      newState.shows.detailed.push({
        ...show,
      });
      return newState;
    }
    case LOAD_SHOW_SEASON_SUCCESS: {
      const newState = { ...state };
      const show = (newState.shows.detailed || [])
        .find(({ tmdb_id: id }) => Number(id) === Number(action.id));
      if (!show || !show.seasons) {
        return newState;
      }
      const season = show.seasons
        .find(({season_number: seasonNumber}) => Number(seasonNumber) === Number(action.seasonNumber));
      show.seasons = show.seasons
        .filter(({season_number: seasonNumber}) => Number(seasonNumber) !== Number(action.seasonNumber));
      show.seasons.push({
        ...season,
        episodes: action.episodes,
        loadingEpisodes: false,
      });
      
      newState.shows.detailed = (newState.shows.detailed || [])
        .filter(({ tmdb_id: id }) => Number(id) !== Number(action.id));
      newState.shows.detailed.push({
        ...show,
      });
      return newState;
    }
    case LOAD_SHOW_SEASON_ERROR: {
      const newState = { ...state };
      const show = (newState.shows.detailed || [])
        .find(({ tmdb_id: id }) => Number(id) === Number(action.id));
      if (!show || !show.seasons) {
        return newState;
      }
      const season = show.seasons
        .find(({season_number: seasonNumber}) => Number(seasonNumber) === Number(action.seasonNumber));
      show.seasons = show.seasons
        .filter(({season_number: seasonNumber}) => Number(seasonNumber) !== Number(action.seasonNumber));
      show.seasons.push({
        ...season,
        loadingEpisodes: false,
      });
      
      newState.shows.detailed = (newState.shows.detailed || [])
        .filter(({ tmdb_id: id }) => Number(id) !== Number(action.id));
      newState.shows.detailed.push({
        ...show,
        error: action.error,
      });
      return newState;
    }
    case POST_LOGIN_USER: {
      return state;
    }
    case POST_LOGIN_USER_ERROR: {
      return {
        ...state,
        user: {
          error: action.error
        }
      };
    }
    case POST_REGISTER_USER: {
      return state;
    }
    case POST_REGISTER_USER_ERROR: {
      return {
        ...state,
        user: {
          error: action.error
        }
      };
    }
    case POST_ADD_FAVOURITE: {
      const newState = { ...state };
      return newState;
    }
    case POST_ADD_FAVOURITE_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      const { shows: { discovery, search, favourites, detailed } } = newState;
      
      let copyShow = {};
      
      [discovery, search].forEach((showsOf) => {
        if (showsOf) {
          const show = showsOf.results
            .find(({ tmdb_id: id}) => Number(id) === Number(action.id))
          if (show) {
            show.is_liked = true;
            copyShow = {...show};
          }
        }
      });
      if(detailed) {
        const show = detailed
          .find(({ tmdb_id: id}) => Number(id) === Number(action.id))
        if (show) {
          show.is_liked = true;
          copyShow = {...show};
        }
      }

      if(favourites) {
        favourites.results.push(copyShow)
        favourites.loading = false;
        favourites.totalResults = (favourites.totalResults || 0) + 1;
      }

      return newState;
    }
    case POST_ADD_FAVOURITE_ERROR: {
      const newState = { ...state };
      return newState;
    }
    case POST_REMOVE_FAVOURITE_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      const { shows: { discovery, search, favourites, detailed } } = newState;
      [discovery, search].forEach((showsOf) => {
        if (showsOf) {
          const show = showsOf.results
            .find(({ tmdb_id: id}) => Number(id) === Number(action.id))
          if (show) {
            show.is_liked = false;
          }
        }
      });
      if(detailed) {
        const show = detailed
          .find(({ tmdb_id: id}) => Number(id) === Number(action.id))
        if (show) {
          show.is_liked = false;
        }
      }
      if(favourites) {
        favourites.results = favourites.results.filter(({ tmdb_id: id }) => Number(id) !== Number(action.id) )
        favourites.loading = false;
        favourites.totalResults = Math.min((favourites.totalResults || 0) - 1, 0);
      }
      return newState;
    }
    default:
      return state;
  }
}

export default appReducer;
