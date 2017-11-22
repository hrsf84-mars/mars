import React from 'react';
import Axios from 'axios';
import Graph from './Graph.js';
import PrimaryTable from './PrimaryTable.js';
import SecondaryTable from './SecondaryTable.js';
import Title from './Title.js';

import comparisonTestData from './_comparisonTestData.js';
import primaryTestData from './_primaryTestData.js';
import secondaryTestData from './_secondaryTestData.js';

// To do:
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

    this.setGraphingObj = this.setGraphingObj.bind(this);
  }

  handleFirstQuery(e) {
    this.setState({first_movie_query: e.target.value});
  }

  handleSecondQuery(e) {
    this.setState({second_movie_query: e.target.value});
  }

  // Uncomment below AND remove this.setGraphingObj(false) to test server
  handleFirstSubmit(e) {
    this.setGraphingObj(false);
    // Axios.post('/', {search: this.state.first_movie_query})
    //   .then(function(response) {
    //     this.setPrimary(response);
    //   })
    //   .then(function() {
    //     this.setGraphingObj(false);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //     alert('It looks like we couldn\'t find', this.state.first_movie_query);
    //   });
    e.preventDefault();
  }

  // Uncomment below AND remove this.setGraphingObj(true) to test server
  handleSecondSubmit(e) {
    if (!this.state.is_secondary) {
      this.setState({is_secondary: true});
    } else {
      this.setGraphingObj(true);
      // Axios.post('/', {search: this.state.second_movie_query})
      //   .then(function(response) {
      //     this.setSecondary(response);
      //   })
      //   .then(function() {
      //     this.setGraphingObj(true);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //     alert('It looks like we couldn\'t find', this.state.second_movie_query);
      //   });
    }
    e.preventDefault();
  }

  setGraphingObj(buildWithBoth) {
    const cv = this.state.graphing_obj.longitudinal_data;
    const pm = this.state.primary_movie.longitudinal_data;
    const sm = this.state.secondary_movie.longitudinal_data;
    if (!buildWithBoth) {
      console.log('here we are');
      this.setState({graphing_obj: {
          longitudinal_data: [
            {formattedAxis: cv[0].formattedAxisTime, primary_google_trends_vol: pm[0].google_trends_vol},
            {formattedAxis: cv[1].formattedAxisTime, primary_google_trends_vol: pm[1].google_trends_vol},
            {formattedAxis: cv[2].formattedAxisTime, primary_google_trends_vol: pm[2].google_trends_vol},
            {formattedAxis: cv[3].formattedAxisTime, primary_google_trends_vol: pm[3].google_trends_vol},
            {formattedAxis: cv[4].formattedAxisTime, primary_google_trends_vol: pm[4].google_trends_vol},
            {formattedAxis: cv[5].formattedAxisTime, primary_google_trends_vol: pm[5].google_trends_vol},
            {formattedAxis: cv[6].formattedAxisTime, primary_google_trends_vol: pm[6].google_trends_vol},
            {formattedAxis: cv[7].formattedAxisTime, primary_google_trends_vol: pm[7].google_trends_vol},
            {formattedAxis: cv[8].formattedAxisTime, primary_google_trends_vol: pm[8].google_trends_vol}
          ]
        }
      });
    } else {
      this.setState({graphing_obj: {
          longitudinal_data: [
            {formattedAxis: cv[0].formattedAxisTime, primary_google_trends_vol: pm[0].google_trends_vol, secondary_google_trends_vol: sm[0].google_trends_vol},
            {formattedAxis: cv[1].formattedAxisTime, primary_google_trends_vol: pm[1].google_trends_vol, secondary_google_trends_vol: sm[1].google_trends_vol},
            {formattedAxis: cv[2].formattedAxisTime, primary_google_trends_vol: pm[2].google_trends_vol, secondary_google_trends_vol: sm[2].google_trends_vol},
            {formattedAxis: cv[3].formattedAxisTime, primary_google_trends_vol: pm[3].google_trends_vol, secondary_google_trends_vol: sm[3].google_trends_vol},
            {formattedAxis: cv[4].formattedAxisTime, primary_google_trends_vol: pm[4].google_trends_vol, secondary_google_trends_vol: sm[4].google_trends_vol},
            {formattedAxis: cv[5].formattedAxisTime, primary_google_trends_vol: pm[5].google_trends_vol, secondary_google_trends_vol: sm[5].google_trends_vol},
            {formattedAxis: cv[6].formattedAxisTime, primary_google_trends_vol: pm[6].google_trends_vol, secondary_google_trends_vol: sm[6].google_trends_vol},
            {formattedAxis: cv[7].formattedAxisTime, primary_google_trends_vol: pm[7].google_trends_vol, secondary_google_trends_vol: sm[7].google_trends_vol},
            {formattedAxis: cv[8].formattedAxisTime, primary_google_trends_vol: pm[8].google_trends_vol, secondary_google_trends_vol: sm[8].google_trends_vol}
          ]
        }
      });
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

        {this.state.is_secondary ? <Title primary_movie={this.state.primary_movie} secondary_movie={this.state.secondary_movie} /> : <h1>{this.state.primary_movie.title}</h1>}
        
        <Graph is_secondary={this.state.is_secondary} data={this.state.graphing_obj.longitudinal_data} />

        <PrimaryTable primary_movie={this.state.primary_movie} />
        <br></br><br></br>
        {this.state.is_secondary && <SecondaryTable secondary_movie={this.state.secondary_movie} />}
      </div>
    );
  }
}

export default App;
