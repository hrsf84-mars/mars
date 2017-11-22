import React from 'react';
import Graph from './Graph.js';
import Table from './Table.js';
import primaryTestData from './primaryTestData.js';
import secondaryTestData from './secondaryTestData.js';
import comparisonTestData from './comparisonTestData.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      primary_movie: primaryTestData.data,
      secondary_movie: secondaryTestData.data,
      comparison_obj: comparisonTestData.data,
      is_secondary: false,
      first_movie_query: '',
      second_movie_query: ''
    }

    this.handleFirstQuery = this.handleFirstQuery.bind(this);
    this.handleSecondQuery = this.handleSecondQuery.bind(this);

    this.handleFirstSubmit = this.handleFirstSubmit.bind(this);
    this.handleSecondSubmit = this.handleSecondSubmit.bind(this);
  }

  handleFirstQuery(e) {
    this.setState({first_movie_query: e.target.value});
  }

  handleSecondQuery(e) {
    this.setState({second_movie_query: e.target.value});
  }

  handleFirstSubmit(e) {
    // Replace with call to server
    console.log(this.state.first_movie_query, 'was sent to the server');
    // if the server sends back an object in its response
      // setState of primary_movie to that object
      // (?) update the comparison_obj
    // else, give the user an error
    e.preventDefault();
  }

  handleSecondSubmit(e) {
    if (!this.state.is_secondary) {
      this.setState({is_secondary: true});
    } else {
      // Replace with call to server
      console.log(this.state.second_movie_query, 'was sent to the server');
      // if the server sends back an object in its response
        // setState of secondary_movie to that object
        // (?) update the comparison_obj
      // else, give the user an error
    }
    e.preventDefault();
  }


  // To do:
    // Break into modular components
    // Refactor table section to be an actual table
    // Make some visual components conditional on secondary movie being present
  render() {
    return (
      <div>
        <h1>Cliff on Mars</h1>
        
        <div id="search">
          <form onSubmit={this.handleFirstSubmit}>
            <input type="text" value={this.state.first_movie_query} onChange={this.handleFirstQuery} />
            <input type="submit" value="Find First Movie" />
          </form>
          <form onSubmit={this.handleSecondSubmit}>
            {this.state.is_secondary && <input type="text" value={this.state.second_movie_query} onChange={this.handleSecondQuery} />}
            <input type="submit" value="Find Second Movie" />
          </form>
        </div>

        <h1 id="title">Comparing {this.state.primary_movie.title} and {this.state.secondary_movie.title}</h1>
        
        <Graph data={this.state.comparison_obj} secondary_movie={this.state.comparison_obj}/>

        <Table primary_movie={this.state.primary_movie} secondary_movie={this.state.secondary_movie} />

      </div>
    );
  }
}

export default App;
