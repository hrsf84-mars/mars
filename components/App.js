import React from 'react';
import Axios from 'axios';
import Graph from './Graph.js';
import PrimaryTable from './PrimaryTable.js';
import SecondaryTable from './SecondaryTable.js';

import comparisonTestData from './_comparisonTestData.js';
import primaryTestData from './_primaryTestData.js';
import secondaryTestData from './_secondaryTestData.js';

// To do:
  // Make line conditionally render OR render diferent Graph types based on whether there is data for two obj
  // Make some visual components conditional on secondary movie being present
  // Refactor table section to be an actual table

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      graphing_obj: comparisonTestData.data,
      primary_movie: primaryTestData.data,
      secondary_movie: secondaryTestData.data,
      is_secondary: false,
      first_movie_query: '',
      second_movie_query: ''
    }

    this.handleFirstQuery = this.handleFirstQuery.bind(this);
    this.handleSecondQuery = this.handleSecondQuery.bind(this);

    this.handleFirstSubmit = this.handleFirstSubmit.bind(this);
    this.handleSecondSubmit = this.handleSecondSubmit.bind(this);

    this.setPrimary = this.setPrimary.bind(this);
    this.setSecondary = this.setSecondary.bind(this);

    this.setLongitudinal = this.setLongitudinal.bind(this);
  }

  setPrimary(movieObj) {
    this.setState({graphing_obj: {
      primary_movie: movieObj
      }
    });
  }

  setSecondary(movieObj) {
    this.setState({graphing_obj: {
      secondary_movie: movieObj
      }
    });
  }

  handleFirstQuery(e) {
    this.setState({first_movie_query: e.target.value});
  }

  handleSecondQuery(e) {
    this.setState({second_movie_query: e.target.value});
  }

  handleFirstSubmit(e) {
    this.setLongitudinal('primary');
    // Axios.post('/', {search: this.state.first_movie_query})
    //   .then(function(response) {
    //     this.setPrimary(response);
    //   })
    //   .then(function() {
    //     this.setLongitudinal('primary');
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //     alert('It looks like we couldn\'t find', this.state.first_movie_query);
    //   });
    e.preventDefault();
  }

  handleSecondSubmit(e) {
    if (!this.state.is_secondary) {
      this.setState({is_secondary: true});
    } else {
      this.setLongitudinal('primary');
      // Axios.post('/', {search: this.state.second_movie_query})
      //   .then(function(response) {
      //     this.setSecondary(response);
      //   })
      //   .then(function() {
      //     this.setLongitudinal('secondary');
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //     alert('It looks like we couldn\'t find', this.state.second_movie_query);
      //   });
    }
    e.preventDefault();
  }

  setLongitudinal(whichObj) {
    if (whichObj === 'primary') {
      this.setState({graphing_obj: {
        // to fill in
      }});
    } else if (whichObj === 'secondary') {
      this.setState({graphing_obj: {
        // to fill in
      }});
    }
  }

  // To do:
    // Make Title section show secondary movie title conditional on it existing
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

        <h1 id="title">{this.state.primary_movie.title} and {this.state.secondary_movie.title}</h1>
        
        <Graph is_secondary={this.state.is_secondary} data={this.state.graphing_obj.longitudinal_data} />

        <PrimaryTable primary_movie={this.state.primary_movie} />
        <br></br><br></br>
        {this.state.is_secondary && <SecondaryTable secondary_movie={this.state.secondary_movie} />}
      </div>
    );
  }
}

export default App;
