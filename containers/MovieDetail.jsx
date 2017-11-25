import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import Graph from './Graph';
import MovieInfo from '../components/MovieInfo';

class MovieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Title
          primaryMovie={this.props.primaryMovie}
          secondaryMovie={this.props.secondaryMovie}
        />
        <Graph />
        <MovieInfo
          primaryMovie={this.props.primaryMovie}
          secondaryMovie={this.props.secondaryMovie}
        />
      </div>
    );
  }
}

function mapStateToProps({ primaryMovie, secondaryMovie }) {
  return { primaryMovie, secondaryMovie };
}

export default connect(mapStateToProps)(MovieDetail);
