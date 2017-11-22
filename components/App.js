import React from 'react';
import Axios from 'axios';
import Graph from './Graph.js';
import PrimaryTable from './PrimaryTable.js';
import SecondaryTable from './SecondaryTable.js';

import comparisonTestData from './comparisonTestData.js';

// To do:
  // Make line conditionally render OR render diferent Graph types based on whether there is data for two obj
  // Make some visual components conditional on secondary movie being present
  // Refactor table section to be an actual table

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      comparison_obj: comparisonTestData.data,
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
    this.setState({comparison_obj: {
      primary_movie: movieObj
      }
    });
  }

  setSecondary(movieObj) {
    this.setState({comparison_obj: {
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
    Axios.post('/', {search: this.state.first_movie_query})
      .then(function(response) {
        this.setPrimary(response);
      })
      .then(function() {
        this.setLongitudinal('primary');
      })
      .catch(function(error) {
        console.log(error);
        alert('It looks like we couldn\'t find', this.state.first_movie_query);
      });
    e.preventDefault();
  }

  handleSecondSubmit(e) {
    if (!this.state.is_secondary) {
      this.setState({is_secondary: true});
    } else {
      Axios.post('/', {search: this.state.second_movie_query})
        .then(function(response) {
          this.setSecondary(response);
        })
        .then(function() {
          this.setLongitudinal('secondary');
        })
        .catch(function(error) {
          console.log(error);
          alert('It looks like we couldn\'t find', this.state.second_movie_query);
        });
    }
    e.preventDefault();
  }

  setLongitudinal(whichObj) {
    if (whichObj === 'primary') {
      const longData = this.state.comparison_obj.primary_movie.longitudinal_data;

      // this can be cleaned up if we can interate through arrays within setState.
      this.setState({comparison_obj: {
        longitudinal_data: [
          {primary_google_trends_vol: longData[0].google_trends_vol},
          {primary_google_trends_vol: longData[1].google_trends_vol},
          {primary_google_trends_vol: longData[2].google_trends_vol},
          {primary_google_trends_vol: longData[3].google_trends_vol},
          {primary_google_trends_vol: longData[4].google_trends_vol},
          {primary_google_trends_vol: longData[5].google_trends_vol},
          {primary_google_trends_vol: longData[6].google_trends_vol},
          {primary_google_trends_vol: longData[7].google_trends_vol},
          {primary_google_trends_vol: longData[8].google_trends_vol}
        ]
      }});
    } else if (whichObj === 'secondary') {
      const longData = this.state.comparison_obj.secondary_movie.longitudinal_data;

      this.setState({comparison_obj: {
        longitudinal_data: [
          {secondary_google_trends_vol: longData[0].google_trends_vol},
          {secondary_google_trends_vol: longData[1].google_trends_vol},
          {secondary_google_trends_vol: longData[2].google_trends_vol},
          {secondary_google_trends_vol: longData[3].google_trends_vol},
          {secondary_google_trends_vol: longData[4].google_trends_vol},
          {secondary_google_trends_vol: longData[5].google_trends_vol},
          {secondary_google_trends_vol: longData[6].google_trends_vol},
          {secondary_google_trends_vol: longData[7].google_trends_vol},
          {secondary_google_trends_vol: longData[8].google_trends_vol}
        ]
      }});
    }
  }

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

        <h1 id="title">{this.state.comparison_obj.primary_movie.title} and {this.state.comparison_obj.secondary_movie.title}</h1>
        
        <Graph is_secondary={this.state.is_secondary} data={this.state.comparison_obj.longitudinal_data} />

        <PrimaryTable primary_movie={this.state.comparison_obj.primary_movie} />
        <br></br><br></br>
        {this.state.is_secondary && <SecondaryTable secondary_movie={this.state.comparison_obj.secondary_movie} />}
      </div>
    );
  }
}

export default App;
