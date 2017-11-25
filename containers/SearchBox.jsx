import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

    this.onMovieSearch = this.onMovieSearch.bind(this);
  }

  onMovieSearch(query) {
    axios.get(`/search/${query}`)
      .then((response) => {
        if (this.state.primaryMovieList.length) {
          this.setState({ secondaryMovieList: response.data.results });
        } else this.setState({ primaryMovieList: response.data.results });
      })
      .catch(err => console.error(err));
  }

  render() {
    const hasPrimary = this.state.primaryMovieList.length > 0;
    const hasSecondary = this.state.secondaryMovieList.length > 0;
    return (
      <div>
        <SearchBar onMovieSearch={this.onMovieSearch} />
        {hasPrimary &&
        <MovieList movies={this.state.primaryMovieList} fetchMovie={this.props.fetchMovie1} />}
        {hasPrimary && <SearchBar onMovieSearch={this.onMovieSearch} />}
        {hasSecondary &&
        <MovieList movies={this.state.secondaryMovieList} fetchMovie={this.props.fetchMovie2} />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMovie1, fetchMovie2 }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBox);
