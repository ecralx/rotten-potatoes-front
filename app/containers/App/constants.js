/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_DISCOVERY_SHOWS = 'rotten-potatoes/App/LOAD_DISCOVERY_SHOWS';
export const LOAD_DISCOVERY_SHOWS_SUCCESS = 'rotten-potatoes/App/LOAD_DISCOVERY_SHOWS_SUCCESS';
export const LOAD_DISCOVERY_SHOWS_ERROR = 'rotten-potatoes/App/LOAD_DISCOVERY_SHOWS_ERROR';
export const LOAD_FAVOURITE_SHOWS = 'rotten-potatoes/App/LOAD_FAVOURITE_SHOWS';
export const LOAD_FAVOURITE_SHOWS_SUCCESS = 'rotten-potatoes/App/LOAD_FAVOURITE_SHOWS_SUCCESS';
export const LOAD_FAVOURITE_SHOWS_ERROR = 'rotten-potatoes/App/LOAD_FAVOURITE_SHOWS_ERROR';
export const RESET_SEARCH_SHOWS = 'rotten-potatoes/App/RESET_SEARCH_SHOWS';
export const LOAD_SEARCH_SHOWS = 'rotten-potatoes/App/LOAD_SEARCH_SHOWS';
export const LOAD_SEARCH_SHOWS_SUCCESS = 'rotten-potatoes/App/LOAD_SEARCH_SHOWS_SUCCESS';
export const LOAD_SEARCH_SHOWS_ERROR = 'rotten-potatoes/App/LOAD_SEARCH_SHOWS_ERROR';
export const LOAD_SHOW_DETAILS = 'rotten-potatoes/App/LOAD_SHOW_DETAILS';
export const LOAD_SHOW_DETAILS_SUCCESS = 'rotten-potatoes/App/LOAD_SHOW_DETAILS_SUCCESS';
export const LOAD_SHOW_DETAILS_ERROR = 'rotten-potatoes/App/LOAD_SHOW_DETAILS_ERROR';
export const LOAD_SIMILAR_SHOWS = 'rotten-potatoes/App/LOAD_SIMILAR_SHOWS';
export const LOAD_SIMILAR_SHOWS_SUCCESS = 'rotten-potatoes/App/LOAD_SIMILAR_SHOWS_SUCCESS';
export const LOAD_SIMILAR_SHOWS_ERROR = 'rotten-potatoes/App/LOAD_SIMILAR_SHOWS_ERROR';
export const LOAD_SHOW_SEASON = 'rotten-potatoes/App/LOAD_SHOW_SEASON';
export const LOAD_SHOW_SEASON_SUCCESS = 'rotten-potatoes/App/LOAD_SHOW_SEASON_SUCCESS';
export const LOAD_SHOW_SEASON_ERROR = 'rotten-potatoes/App/LOAD_SHOW_SEASON_ERROR';

export const POST_ADD_FAVOURITE = 'rotten-potatoes/App/POST_ADD_FAVOURITE';
export const POST_ADD_FAVOURITE_SUCCESS = 'rotten-potatoes/App/POST_ADD_FAVOURITE_SUCCESS';
export const POST_ADD_FAVOURITE_ERROR = 'rotten-potatoes/App/POST_ADD_FAVOURITE_ERROR';
export const POST_REMOVE_FAVOURITE = 'rotten-potatoes/App/POST_REMOVE_FAVOURITE';
export const POST_REMOVE_FAVOURITE_SUCCESS = 'rotten-potatoes/App/POST_REMOVE_FAVOURITE_SUCCESS';
export const POST_REMOVE_FAVOURITE_ERROR = 'rotten-potatoes/App/POST_REMOVE_FAVOURITE_ERROR';


export const POST_REGISTER_USER = 'rotten-potatoes/App/POST_REGISTER_USER';
export const POST_REGISTER_USER_SUCCESS = 'rotten-potatoes/App/POST_REGISTER_USER_SUCCESS';
export const POST_REGISTER_USER_ERROR = 'rotten-potatoes/App/POST_REGISTER_USER_ERROR';
export const POST_LOGIN_USER = 'rotten-potatoes/App/POST_LOGIN_USER';
export const POST_LOGIN_USER_SUCCESS = 'rotten-potatoes/App/POST_LOGIN_USER_SUCCESS';
export const POST_LOGIN_USER_ERROR = 'rotten-potatoes/App/POST_LOGIN_USER_ERROR';

export const DEFAULT_LOCALE = 'en';
