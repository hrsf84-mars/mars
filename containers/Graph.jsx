import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend } from 'recharts';

function Graph(props) {
  return (
    <div id="graph">
      <LineChart width={1000} height={400} data={props.graphData}>
        <Line name={props.primaryMovie.title || ' '} type="monotone" dataKey="primaryTrendVolume" stroke="#8884d8" />
        <Line name={props.secondaryMovie.title || ' '} type="monotone" dataKey="secondaryTrendVolume" stroke="#FF0000" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date">
          <Label value="Weeks after release date" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: 'Search Volume', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend verticalAlign="top" />
      </LineChart>
    </div>
  );
}

function mapStateToProps({ graphData }) {
  return { graphData };
}

export default connect(mapStateToProps)(Graph);
