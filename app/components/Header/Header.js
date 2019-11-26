import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { resetSearchShows } from 'containers/App/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  titleText : {
    "&:hover" : {
      cursor: 'pointer',
    },
  },
  titleIcon: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    "span &:hover" : {
      cursor: 'pointer',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },

}));

const SearchAppBar = ({ resetShows }) => {
  const history = useHistory();
  const classes = useStyles();
  
  const [query, setQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('authToken'));
  });

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const goToHome = () => {
    history.push('/');
  }
  
  const goToFavs = () => {
    history.push('/favourites');
  }

  const goToLogin = () => {
    setIsLoggedIn(false);
    history.push('/login');
  }

  const goToSearch = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      resetShows();
      history.push(`/search/${query}`);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
          >
            <span className={classes.titleText} onClick={goToHome}>Rotten Potatoes</span>
          </Typography>
          <HomeIcon className={classes.titleIcon} onClick={goToHome}/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Rechercher…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={handleChange}
              onKeyDown={goToSearch}
            />
          </div>
          {isLoggedIn && (
            <Button color="inherit" onClick={goToFavs}>
              Favourites
            </Button>
          )}
          <Button color="inherit" onClick={goToLogin}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetShows: () => dispatch(resetSearchShows()),
})

export default connect(null, mapDispatchToProps)(SearchAppBar);