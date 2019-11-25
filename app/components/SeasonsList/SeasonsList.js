import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EpisodesList from '../EpisodesList';
import LoadingIndicator from '../LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SeasonsList({ seasons, fetchSeason }) {
  const classes = useStyles();

  const loadSeason = (number) => {
    const season = (seasons || []).find(({ season_number: seasonNumber }) => Number(number) === Number(seasonNumber));
    if (season && !season.episodes) {
      fetchSeason(number);
    }
  };

  return (
    <div className={classes.root}>
      {seasons
        .filter(({ season_number: seasonNumber }) => !!seasonNumber)
        .sort(({season_number: seasonNumberA}, {season_number: seasonNumberB}) => Number(seasonNumberA) - Number(seasonNumberB))
        .map(({ name, season_number: seasonNumber, loadingEpisodes, episodes, air_date: airDate, poster_path: mediaPath} ) => (
        <ExpansionPanel key={`season-${seasonNumber}`} onChange={() => loadSeason(seasonNumber)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{name} ({airDate.slice(0,4)})</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {loadingEpisodes
              ? (
                <LoadingIndicator />
              ) : (
                <EpisodesList episodes={episodes || []} />
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

SeasonsList.propTypes = {
  fetchSeason: PropTypes.func,
  seasons: PropTypes.array
};