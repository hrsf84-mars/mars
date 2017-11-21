import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';
import example from './exampleData.js';
import Graph from './Graph.js';
import Search from './Search.js';
import Table from './Table.js';

const data = example.data;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      primary_movie: data,
      secondary_movie: data, // this is where we will store data to graph a second line graph
      comparison_obj: {},
      is_comparing: false,
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
    // Replace with call to server
    console.log(this.state.second_movie_query, 'was sent to the server');
    // if the server sends back an object in its response
      // setState of secondary_movie to that object
      // (?) update the comparison_obj
    // else, give the user an error
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

        <div id="graph">
          <div id="search">
            <form onSubmit={this.handleFirstSubmit}>
              <input type="text" value={this.state.first_movie_query} onChange={this.handleFirstQuery} />
              <input type="submit" value="Find First Movie" />
            </form>
            <form onSubmit={this.handleSecondSubmit}>
              <input type="text" value={this.state.second_movie_query} onChange={this.handleSecondQuery} />
              <input type="submit" value="Find Second Movie" />
            </form>
          </div>

          <h1 id="title">Comparing {this.state.primary_movie.title} and {this.state.secondary_movie.title}</h1>

          <LineChart width={800} height={400} data={data.longitudinal_data}>
          <Line type="monotone" dataKey="google_trends_vol" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="formattedAxisTime">
            <Label value="Weeks after release date" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: 'Search Volume', angle: -90, position: 'insideLeft' }} />
          </LineChart>
          <Table primary_movie={this.state.primary_movie} secondary_movie={this.state.secondary_movie} />
        </div>
      </div>
    );
  }
}

export default App;
