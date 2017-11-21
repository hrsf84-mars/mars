import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';
import example from './exampleData.js';
const data = example.data;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      primary_movie: data,
      secondary_movie: {}, // this is where we will store data to graph a second line graph
      query: ''
    }

    // set this binding for onChange
    // set this binding for submitting
  }

  // handle change when typing in search box

  // handle submit when submiting search

  render() {
    return (
      <div>
        <h1>Cliff on Mars</h1>

        <div id="graph">
          <form>
            <label>
              Search for a movie in the last five years: 
              <input type="text" value="text" />
              <input type="submit" value="Submit" />
            </label>
          </form>

          <h1 id="title">{this.state.primary_movie.title}</h1>

          <LineChart width={800} height={400} data={data.longitudinal_data}>
          <Line type="monotone" dataKey="google_trends_vol" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="formattedAxisTime">
            <Label value="Weeks after release date" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: 'Search Volume', angle: -90, position: 'insideLeft' }} />
          </LineChart>
        </div>
      </div>
    );
  }
}

export default App;
