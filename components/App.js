import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';
import example from './exampleData.js';
const data = example.data;

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Cliff on Mars</h1>
        <div id="graph">
          <h1 id="title">Beauty and the Beast</h1>
          <LineChart width={800} height={400} data={data}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
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
