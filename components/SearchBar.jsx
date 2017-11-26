import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

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
      <form onSubmit={this.onFormSubmit}>
        <TextField
          hintText="Insert Movie Name"
          floatingLabelText={this.props.floatingLabelText}
          value={this.state.term}
          onChange={this.onInputChange}
        />
      </form>
    );
  }
}
