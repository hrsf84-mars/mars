import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Title from '../components/Title';
import Graph from './Graph';
import MovieInfo from '../components/MovieInfo';

const style = { padding: '35px' };

const MovieDetail = props => (
  <Paper zDepth={2} style={style}>
    <Title
      primaryMovie={props.primaryMovie}
      secondaryMovie={props.secondaryMovie}
    />
    <Graph
     primaryMovie={props.primaryMovie}
     secondaryMovie={props.secondaryMovie}
    />
    <MovieInfo
      primaryMovie={props.primaryMovie}
      secondaryMovie={props.secondaryMovie}
    />
  </Paper>
);

function mapStateToProps({ primaryMovie, secondaryMovie }) {
  return { primaryMovie, secondaryMovie };
}

export default connect(mapStateToProps)(MovieDetail);
