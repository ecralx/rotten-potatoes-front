/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ShowsDisplay from 'components/ShowsDisplay';
import { SHOWS_GENRES } from '../App/constants';

import './style.scss';
import { resetSearchShows } from '../App/actions';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function HomePage({ fetchShows, resetShows, addToFavourites, removeFromFavourites, discoveryShows }) {
  const classes = useStyles();
  const [genres, setGenres] = React.useState([]);
  
  /**
   * Go fetch the shows
   */

  useEffect(() => {
    const genreIds = genres
      .map((genre) => SHOWS_GENRES.find(({name}) => name === genre).id)
      .join();
    resetShows();
    fetchShows(1, genreIds);
  }, [genres])

  const handleChange = event => {
    setGenres(event.target.value);
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Discover new tv shows" />
      </Helmet>
      <div className="home-page">
        <section className="centered">
          <h2>Welcome to Rotten Potatoes</h2>
          <p>
            A minimalistic website to never forget about your favourite <i>tv-shows</i>
          </p>
        </section>
        <section>
          <h2>Discovery</h2>
          <p>Discover new tv-shows</p>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Genres</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={genres}
              onChange={handleChange}
              input={<Input />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {SHOWS_GENRES.map(({name}) => (
                <MenuItem key={name} value={name}>
                  <Checkbox color="primary" checked={genres.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ShowsDisplay
            {...(discoveryShows || {})}
            showMore={() => fetchShows((discoveryShows || {page : 0}).page + 1)}
            addToFavourites={addToFavourites}
            removeFromFavourites={removeFromFavourites}
          />
        </section>
      </div>
    </article>
  );
};

HomePage.propTypes = {
  discoveryShows: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  fetchShows: PropTypes.func,
};
