import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Title from '../components/Title';
import Graph from './Graph';
import MovieInfo from '../components/MovieInfo';
import Financials from './Financials'

const style = { padding: '35px' };

function MovieDetail(props) {
  return (
    <Paper zDepth={1} style={style}>
      <Title
        primaryMovie={props.primaryMovie}
        secondaryMovie={props.secondaryMovie}
      />
      <Graph
        primaryMovie={props.primaryMovie}
        secondaryMovie={props.secondaryMovie}
      />
      <Financials/>
      <MovieInfo
        primaryMovie={props.primaryMovie}
        secondaryMovie={props.secondaryMovie}
      />
    </Paper>
  );
}

MovieDetail.propTypes = {
  primaryMovie: PropTypes.shape({}).isRequired,
  secondaryMovie: PropTypes.shape({}).isRequired,
};

function mapStateToProps({ primaryMovie, secondaryMovie }) {
  return { primaryMovie, secondaryMovie };
}

export default connect(mapStateToProps)(MovieDetail);
