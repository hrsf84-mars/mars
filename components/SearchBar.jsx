import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor() {
    super();

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ term: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    this.props.onMovieSearch(this.state.term, this.props.type);
    this.setState({ term: '' });
  }

  render() {
    return (
      <form className="input-group" onSubmit={this.onFormSubmit}>
        <input
          placeholder={this.props.placeholderText || 'Search Movie'}
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Search</button>
        </span>
      </form>
    );
  }
}
