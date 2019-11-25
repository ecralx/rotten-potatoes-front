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
export const LOAD_SHOW_DETAILS = 'rotten-potatoes/App/LOAD_SHOW_DETAILS';
export const LOAD_SHOW_DETAILS_SUCCESS = 'rotten-potatoes/App/LOAD_SHOW_DETAILS_SUCCESS';
export const LOAD_SHOW_DETAILS_ERROR = 'rotten-potatoes/App/LOAD_SHOW_DETAILS_ERROR';
export const DEFAULT_LOCALE = 'en';
