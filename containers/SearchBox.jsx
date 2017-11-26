import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { fetchMovie1, fetchMovie2 } from '../actions/MovieAction';

class SearchBox extends Component {
  constructor() {
    super();

    this.state = {
      primaryMovieList: [],
      secondaryMovieList: [],
    };

    this.style = {
      padding: '25px',
    };

    this.onMovieSearch = this.onMovieSearch.bind(this);
    this.fetchPrimaryMovie = this.fetchPrimaryMovie.bind(this);
    this.fetchSecondaryMovie = this.fetchSecondaryMovie.bind(this);
  }

  onMovieSearch(query, type) {
    axios.get(`/search/${query}`)
      .then((response) => {
        if (type === 'primary') this.setState({ primaryMovieList: response.data.results });
        else if (type === 'secondary') this.setState({ secondaryMovieList: response.data.results });
      })
      .catch(err => console.error(err));
  }

  fetchPrimaryMovie(id) {
    this.setState({ primaryMovieList: [] });
    this.props.fetchMovie1(id);
  }

  fetchSecondaryMovie(id) {
    this.setState({ secondaryMovieList: [] });
    this.props.fetchMovie2(id);
  }

  render() {
    const hasPrimaryMovieList = this.state.primaryMovieList.length > 0;
    const hasSecondaryMovieList = this.state.secondaryMovieList.length > 0;
    return (
      <Paper zDepth={2} style={this.style}>
        <SearchBar
          onMovieSearch={this.onMovieSearch}
          floatingLabelText="Search Primary Movie"
          type="primary"
        />
        {hasPrimaryMovieList &&
        <MovieList
          movies={this.state.primaryMovieList}
          fetchMovie={this.fetchPrimaryMovie}
        />}
        {this.props.isPrimarySelected &&
        <SearchBar
          onMovieSearch={this.onMovieSearch}
          floatingLabelText="Search Secondary Movie"
          type="secondary"
        />}
        {hasSecondaryMovieList &&
        <MovieList
          movies={this.state.secondaryMovieList}
          fetchMovie={this.fetchSecondaryMovie}
        />}
      </Paper>
    );
  }
}

function mapStateToProps({ isPrimarySelected }) {
  return { isPrimarySelected };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMovie1, fetchMovie2 }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
