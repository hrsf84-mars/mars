import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';

function Graph(props) {
  return <div id="graph">
    <LineChart width={800} height={400} data={props.data.longitudinal_data}>
    <Line type="monotone" dataKey="primary_google_trends_vol" stroke="#8884d8" />
    <Line type="monotone" dataKey="secondary_google_trends_vol" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="formattedAxisTime">
      <Label value="Weeks after release date" offset={0} position="insideBottom" />
    </XAxis>
    <YAxis label={{ value: 'Search Volume', angle: -90, position: 'insideLeft' }} />
    </LineChart>
  </div>
}

export default Graph;
