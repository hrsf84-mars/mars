import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Title from '../components/Title';
import Graph from './Graph';
import MovieInfo from '../components/MovieInfo';

class MovieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.style = {
      padding: '25px',
    };
  }

  render() {
    return (
      <Paper zDepth={2} style={this.style}>
        <Title
          primaryMovie={this.props.primaryMovie}
          secondaryMovie={this.props.secondaryMovie}
        />
        <Graph />
        <MovieInfo
          primaryMovie={this.props.primaryMovie}
          secondaryMovie={this.props.secondaryMovie}
        />
      </Paper>
    );
  }
}

function mapStateToProps({ primaryMovie, secondaryMovie }) {
  return { primaryMovie, secondaryMovie };
}

export default connect(mapStateToProps)(MovieDetail);
