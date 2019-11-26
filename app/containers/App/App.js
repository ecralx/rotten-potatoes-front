/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import LoginPage from 'containers/LoginPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import ShowPage from 'containers/ShowPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import theme from './theme.js';
import './style.scss';

const rotten_potatoes_theme = createMuiTheme(theme);

const App = () => (
  <React.Fragment>
    <Helmet
      titleTemplate="%s - Rotten Potatoes"
      defaultTitle="Rotten Potatoes"
    >
      <meta name="description" content="A simple website to save your favourite shows" />
    </Helmet>
    <MuiThemeProvider theme={rotten_potatoes_theme}>
      <Header />
      <div className="app-wrapper">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/search/:query" component={SearchPage} />
          <Route exact path="/show/:id" component={ShowPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </React.Fragment>
);

export default App;
