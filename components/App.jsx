import React from 'react';
import axios from 'axios';
// import Graph from './Graph';
// import PrimaryTable from './PrimaryTable';
// import SecondaryTable from './SecondaryTable';
// import Title from './Title';
import SearchBox from '../containers/SearchBox';
import MovieDetail from '../containers/MovieDetail';

// To do:
// Refactor table section to be an actual table

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      graphing_obj: {},
      primary_movie: {},
      secondary_movie: {},
      is_secondary: false,
      first_movie_query: '',
      second_movie_query: '',
    };

    this.handleFirstQuery = this.handleFirstQuery.bind(this);
    this.handleSecondQuery = this.handleSecondQuery.bind(this);

    this.setPrimary = this.setPrimary.bind(this);
    this.setSecondary = this.setSecondary.bind(this);

    this.handleFirstSubmit = this.handleFirstSubmit.bind(this);
    this.handleSecondSubmit = this.handleSecondSubmit.bind(this);

    this.setGraphingObj = this.setGraphingObj.bind(this);
  }

  setGraphingObj(buildWithBoth) {
    const cv = this.state.graphing_obj.longitudinal_data;
    const pm = this.state.primary_movie.trendData;
    const sm = this.state.secondary_movie.trendData;

    if (!buildWithBoth) {
      this.setState({
        graphing_obj: {
          longitudinal_data: [
            {
              formattedAxis: pm[0].formattedAxisTime,
              primary_google_trends_vol: pm[0].value,
            },
            {
              formattedAxis: pm[1].formattedAxisTime,
              primary_google_trends_vol: pm[1].value,
            },
            {
              formattedAxis: pm[2].formattedAxisTime,
              primary_google_trends_vol: pm[2].value,
            },
            {
              formattedAxis: pm[3].formattedAxisTime,
              primary_google_trends_vol: pm[3].value,
            },
            {
              formattedAxis: pm[4].formattedAxisTime,
              primary_google_trends_vol: pm[4].value,
            },
            {
              formattedAxis: pm[5].formattedAxisTime,
              primary_google_trends_vol: pm[5].value,
            },
            {
              formattedAxis: pm[6].formattedAxisTime,
              primary_google_trends_vol: pm[6].value,
            },
            {
              formattedAxis: pm[7].formattedAxisTime,
              primary_google_trends_vol: pm[7].value,
            },
            {
              formattedAxis: pm[8].formattedAxisTime,
              primary_google_trends_vol: pm[8].value,
            },
          ],
        },
      });
    } else {
      this.setState({
        graphing_obj: {
          longitudinal_data: [
            {
              formattedAxis: cv[0].formattedAxisTime,
              primary_google_trends_vol: pm[0].value,
              secondary_google_trends_vol: sm[0].value,
            },
            {
              formattedAxis: cv[1].formattedAxisTime,
              primary_google_trends_vol: pm[1].value,
              secondary_google_trends_vol: sm[1].value,
            },
            {
              formattedAxis: cv[2].formattedAxisTime,
              primary_google_trends_vol: pm[2].value,
              secondary_google_trends_vol: sm[2].value,
            },
            {
              formattedAxis: cv[3].formattedAxisTime,
              primary_google_trends_vol: pm[3].value,
              secondary_google_trends_vol: sm[3].value,
            },
            {
              formattedAxis: cv[4].formattedAxisTime,
              primary_google_trends_vol: pm[4].value,
              secondary_google_trends_vol: sm[4].value,
            },
            {
              formattedAxis: cv[5].formattedAxisTime,
              primary_google_trends_vol: pm[5].value,
              secondary_google_trends_vol: sm[5].value,
            },
            {
              formattedAxis: cv[6].formattedAxisTime,
              primary_google_trends_vol: pm[6].value,
              secondary_google_trends_vol: sm[6].value,
            },
            {
              formattedAxis: cv[7].formattedAxisTime,
              primary_google_trends_vol: pm[7].value,
              secondary_google_trends_vol: sm[7].value,
            },
            {
              formattedAxis: cv[8].formattedAxisTime,
              primary_google_trends_vol: pm[8].value,
              secondary_google_trends_vol: sm[8].value,
            },
          ],
        },
      });
    }
  }

  setPrimary(movieObj) {
    this.setState({ primary_movie: movieObj });
  }

  setSecondary(movieObj) {
    this.setState({ secondary_movie: movieObj });
  }

  handleFirstQuery(e) {
    this.setState({ first_movie_query: e.target.value });
  }

  handleSecondQuery(e) {
    this.setState({ second_movie_query: e.target.value });
  }

  handleFirstSubmit(e) {
    e.preventDefault();
    axios.get(`/search/${this.state.first_movie_query}`)
      .then(response => axios.get(`/movie/${response.data.results[0].id}`))
      .then(response => this.setPrimary(response.data))
      .then(() => this.setGraphingObj(false))
      .catch(err => console.error(err));
  }

  handleSecondSubmit(e) {
    if (!this.state.is_secondary) {
      this.setState({ is_secondary: true });
    } else {
      axios.get(`/search/${this.state.second_movie_query}`)
        .then(response => axios.get(`/movie/${response.data.results[0].id}`))
        .then(response => this.setSecondary(response.data))
        .then(() => this.setGraphingObj(true))
        .catch(err => console.error(err));
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Cliff on Mars</h1>

        {/* <div id="search">
          <form onSubmit={this.handleFirstSubmit}>
            <input
              type="text"
              value={this.state.first_movie_query}
              onChange={this.handleFirstQuery}
            />
            <input type="submit" value="Find First Movie" />
          </form>

          <form onSubmit={this.handleSecondSubmit}>
            {this.state.is_secondary &&
              <input
                type="text"
                value={this.state.second_movie_query}
                onChange={this.handleSecondQuery}
              />}
            <input type="submit" value="Find Second Movie" />
          </form>
        </div> */}

        <SearchBox />
        <MovieDetail />

        {/* {this.state.is_secondary ?
          <Title
            primary_movie={this.state.primary_movie}
            secondary_movie={this.state.secondary_movie}
          /> :
          <h1>{this.state.primary_movie.title}</h1>}

        <Graph
          is_secondary={this.state.is_secondary}
          data={this.state.graphing_obj.longitudinal_data}
        />

        <PrimaryTable primary_movie={this.state.primary_movie} />
        <br /><br />
        {this.state.is_secondary && <SecondaryTable secondary_movie={this.state.secondary_movie} />} */}
      </div>
    );
  }
}

export default App;
