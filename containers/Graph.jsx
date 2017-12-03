// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend } from 'recharts';

// function Graph(props) {
//   return (
//     <div id="graph">
//       <LineChart width={1000} height={400} data={props.graphData}>
//         <Line name={props.primaryMovie.title || ' '} type="monotone" dataKey="primaryTrendVolume" stroke="#8884d8" />
//         <Line name={props.secondaryMovie.title || ' '} type="monotone" dataKey="secondaryTrendVolume" stroke="#FF0000" />
//         <CartesianGrid stroke="#ccc" />
//         <XAxis dataKey="date">
//           <Label value="Date" offset={0} position="insideBottom" />
//         </XAxis>
//         <YAxis label={{ value: 'Relative Search Volume', angle: -90, position: 'insideLeft' }} />
//         <Tooltip />
//         <Legend verticalAlign="top" />
//       </LineChart>
//     </div>
//   );
// }

// Graph.propTypes = {
//   graphData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
//   primaryMovie: PropTypes.shape({
//     title: PropTypes.string,
//   }).isRequired,
//   secondaryMovie: PropTypes.shape({
//     title: PropTypes.string,
//   }).isRequired,
// };

// function mapStateToProps({ graphData }) {
//   return { graphData };
// }

// export default connect(mapStateToProps)(Graph);


import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BarChart, Bar, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend } from 'recharts';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import Toggle from 'material-ui/Toggle';




class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      charts: ['lineChartShowing', 'areaChartShowing', 'barChartShowing'],
      chartName: ['Line Chart', 'Area Chart', 'Bar Chart'],
      current: 0,
      showing: 'lineChartShowing',
      focus: 'monthly',
      timeframe: 'year',
      bargraphType: 'standard',
      cleanData: this.props.graphData,
      leftChart: 'Bar Chart',
      rightChart: 'Area Chart'
    };
  }

  changeDataShownFn (e) {
    this.setState({focus: e.target.id});
  }


  changeChartRight (e) {
    var counterNum = this.state.current;
    var chartOnLeft = this.state.chartName[counterNum];
    var chartOnRight = '';
    if(counterNum + 1 === this.state.charts.length) {
      counterNum = 0;
    } else {
      counterNum += 1;
    }
    if (this.state.charts[counterNum] === 'lineChartShowing') {
      chartOnLeft = 'Bar Chart';
      chartOnRight = 'Area Chart';
    }
    if (this.state.charts[counterNum] === 'areaChartShowing') {
      chartOnLeft = 'Line Chart';
      chartOnRight = 'Bar Chart';
    }
    if (this.state.charts[counterNum] === 'barChartShowing') {
      chartOnLeft = 'Area Chart';
      chartOnRight = 'Line Chart';
    }
    // if(counterNum + 1 === this.state.charts.length) {
    //   chartOnRight = this.state.chartName[0];
    //   counterNum = 0;
    // } else {
    //   counterNum += 1;
    //   chartOnRight = this.state.chartName[counterNum += 1];
    // }
    this.setState({current: counterNum, leftChart: chartOnLeft, rightChart: chartOnRight});
  }


  changeChartLeft (e) {
    var chartOnLeft = this.state.chartName[counterNum];
    var chartOnRight = '';
    var counterNum = this.state.current;
    if(counterNum - 1 < 0) {
      counterNum = this.state.charts.length -1;
    } else {
      counterNum -=1;
    }
    if (this.state.charts[this.state.current] === 'lineChartShowing') {
      chartOnLeft = 'Bar Chart';
      chartOnRight = 'Area Chart';
    }
    if (this.state.charts[this.state.current] === 'areaChartShowing') {
      chartOnLeft = 'Line Chart';
      chartOnRight = 'Bar Chart';
    }
    if (this.state.charts[this.state.current] === 'barChartShowing') {
      chartOnLeft = 'Area Chart';
      chartOnRight = 'Line Chart';
    }
    this.setState({current: counterNum, leftChart: chartOnLeft, rightChart: chartOnRight})
  }



  changeDataTimeFrameShown(e) {
    this.setState({timeframe: e.target.id});
  }
  

  render() {
    
    //CREATE 2 CLEAN DATASETS
    var dataCleanerMovie1 = function(data) {
      var cleanArray = [];
      for (var i = 0; i < data.length ; i++) {
        if (data[i] && data[i].primaryTrendVolume !== undefined) {
          var temp = {}
          temp.date = data[i].date
          temp.primaryTrendVolume = data[i].primaryTrendVolume
          cleanArray.push(temp);
        }
      }
      return cleanArray;
    }

    var dataCleanerMovie2 = function(data) {
      var cleanArray = [];
      for (var i = 0; i < data.length ; i++) {
        if (data[i] && data[i].secondaryTrendVolume !== undefined) {
          var temp = {}
          temp.date = data[i].date
          temp.secondaryTrendVolume = data[i].secondaryTrendVolume
          cleanArray.push(temp);
        }
      }
      return cleanArray;
    }

    //console.log('GRAPH DATA BEING CLEANED 1 2 = ', this.props.graphData)
    var Movie1CleanData = dataCleanerMovie1(this.props.graphData);
    //console.log('CLEAN MOVIE 1 DATA = ', Movie1CleanData);
    var Movie2CleanData = dataCleanerMovie2(this.props.graphData);
    //console.log('CLEAN MOVIE 2 DATA = ', Movie2CleanData);


    var zipperInMovies = function (movie1Data, movie2Data) {
      if (movie2Data.length < 1) { return movie1Data }
      if(movie1Data.length > 1 && movie2Data.length > 1) {
        var cleanCombinedMovieData = [];
        var temp = {};
        for (var i = 0; i < 52; i ++) {
          temp.date = movie1Data[i].date;
          temp.primaryTrendVolume = movie1Data[i].primaryTrendVolume;
          temp.secondaryTrendVolume = movie2Data[i].secondaryTrendVolume;
          cleanCombinedMovieData.push(temp);
          temp = {};
        }
        return cleanCombinedMovieData;
      }
      return movie1Data;
    }

    
    var sortedBetweenMoveiesData = [...zipperInMovies(Movie1CleanData, Movie2CleanData)];
    console.log('COMBINED CLEAN DATA PERFECT!!! = ', sortedBetweenMoveiesData);

    var context = this;
    var makeTimeFocusedData = function(countWeeks, data) {
      var answer = [];
      var tempPeriod = [];
      var tempPeriodFormatted = {};
      var tempTotal = 0;
      var tempTotal2 = 0;
      var tempSecond = 0;
      var tempTotalSecond = 0;
      var averageTemp = 0;
      var counter = 0;
      var periodCounter = 1;

      //HANDLE 1 MOVIES
      if(data.length === undefined) {return data}
      if (data[0] && data[0].secondaryTrendVolume === undefined) {
        for (var i = 0; i < data.length; i ++) {
            tempPeriod.push(data[i]);
            tempTotal += data[i].primaryTrendVolume;
            counter +=1;
            
          if (counter === countWeeks ) {
            if(context.state.focus === 'monthly' && periodCounter === 13) {
              break;
            }
            tempPeriodFormatted.primaryTrendVolume = tempTotal/countWeeks;
            tempPeriodFormatted.date = periodCounter;
            answer.push(tempPeriodFormatted);
            tempPeriodFormatted = {};
            tempPeriod = [];
            tempTotal = 0;
            counter = 0;
            periodCounter +=1;
          }
        }
        return answer;
      }

    //HANDLE 2 MOVIES
    if (data[0] && data[0].hasOwnProperty("secondaryTrendVolume")) {
      for (var i = 0; i < data.length; i ++) {
          tempPeriod.push(data[i]);
          tempTotal += data[i].primaryTrendVolume;
          tempTotal2 += data[i].secondaryTrendVolume;
          counter +=1;
        
        if (counter === countWeeks ) {
          if(context.state.focus === 'monthly' && periodCounter === 13) {
            break;
          }
          tempPeriodFormatted.primaryTrendVolume = tempTotal/countWeeks;
          tempPeriodFormatted.secondaryTrendVolume = tempTotal2/countWeeks;
          tempPeriodFormatted.date = periodCounter;
          tempPeriodFormatted.deltaDataKey = Math.abs(tempPeriodFormatted.primaryTrendVolume - tempPeriodFormatted.secondaryTrendVolume);
          answer.push(tempPeriodFormatted);
          tempPeriodFormatted = {};
          tempPeriod = [];
          tempTotal = 0;
          counter = 0;
          periodCounter +=1;
        }
      }
        return answer;
      }
      return data;
    };


    var presentationData = sortedBetweenMoveiesData;
    //TRIM DATA TO CHOSEN TIMEFRAME
    if (this.state.timeframe === 'year') { presentationData = sortedBetweenMoveiesData }
    if (this.state.timeframe === 'q1') { presentationData = sortedBetweenMoveiesData.slice(0, sortedBetweenMoveiesData.length/4) }
    if (this.state.timeframe === 'q2') { presentationData = sortedBetweenMoveiesData.slice(sortedBetweenMoveiesData.length/4, sortedBetweenMoveiesData.length/2) }
    if (this.state.timeframe === 'q3') { presentationData = sortedBetweenMoveiesData.slice(sortedBetweenMoveiesData.length/2, sortedBetweenMoveiesData.length - sortedBetweenMoveiesData.length/4) }
    if (this.state.timeframe === 'q4') { presentationData = sortedBetweenMoveiesData.slice(sortedBetweenMoveiesData.length - sortedBetweenMoveiesData.length/4, sortedBetweenMoveiesData.length) }

    //PARSE OUT AVERAGE DATA UNITS FROM SELECTED TIMEFRAME
    if(this.state.focus === 'weekly') {
      presentationData = makeTimeFocusedData(1, presentationData);
    }
    if(this.state.focus === 'monthly') {
      presentationData = makeTimeFocusedData(4, presentationData);
    }
    if(this.state.focus === 'quarterly') {
      presentationData = makeTimeFocusedData(12, presentationData);
      //console.log('DATA YOU ARE USING = ', presentationData);
    }

    if (this.props.graphData && this.props.primaryMovie.title) {var Movie1Release = moment(this.props.primaryMovie.releaseDate).format('MMMM Do YYYY')}
    if (this.props.graphData && this.props.secondaryMovie.title) {var Movie2Release = moment(this.props.secondaryMovie.releaseDate).format('MMMM Do YYYY')}
    
    var weeklyfocusButtonStyle = {backgroundColor: '#337AFF', padding: '5px', border: '2px #337AFF', borderRadius: '10px'};
    var monthlyfocusButtonStyle = {backgroundColor: '#337AFF', padding: '5px'}; 
    var quarterlyfocusButtonStyle = {backgroundColor: '#337AFF', padding: '5px'};
    (this.state.focus === 'weekly') ? weeklyfocusButtonStyle = {backgroundColor: '#337AFF', padding: '5px'} : weeklyfocusButtonStyle = {backgroundColor: '#33CEFF', padding: '5px'} ;
    (this.state.focus === 'monthly') ? monthlyfocusButtonStyle = {backgroundColor: '#337AFF', padding: '5px'} : monthlyfocusButtonStyle = {backgroundColor: '#33CEFF', padding: '5px'} ;
    (this.state.focus === 'quarterly') ? quarterlyfocusButtonStyle = {backgroundColor: '#337AFF', padding: '5px'} : quarterlyfocusButtonStyle = {backgroundColor: '#33CEFF', padding: '5px'} ;

    var yearlyButtonStyle = {backgroundColor: '#337AFF', padding: '5px'};
    var q1ButtonStyle = {backgroundColor: '#337AFF', padding: '5px'}; 
    var q2ButtonStyle = {backgroundColor: '#337AFF', padding: '5px'};
    var q3ButtonStyle = {backgroundColor: '#337AFF', padding: '5px'};
    var q4ButtonStyle = {backgroundColor: '#337AFF', padding: '5px'};
    (this.state.timeframe === 'year') ? yearlyButtonStyle = {backgroundColor: '#337AFF', padding: '5px'} : yearlyButtonStyle = {backgroundColor: '#33CEFF', padding: '5px'} ;
    (this.state.timeframe === 'q1') ? q1ButtonStyle = {backgroundColor: '#337AFF', padding: '5px'} : q1ButtonStyle = {backgroundColor: '#33CEFF', padding: '5px'} ;
    (this.state.timeframe === 'q2') ? q2ButtonStyle = {backgroundColor: '#337AFF', padding: '5px'} : q2ButtonStyle = {backgroundColor: '#33CEFF', padding: '5px'} ;
    (this.state.timeframe === 'q3') ? q3ButtonStyle = {backgroundColor: '#337AFF', padding: '5px'} : q3ButtonStyle = {backgroundColor: '#33CEFF', padding: '5px'} ;
    (this.state.timeframe === 'q4') ? q4ButtonStyle = {backgroundColor: '#337AFF', padding: '5px'} : q4ButtonStyle = {backgroundColor: '#33CEFF', padding: '5px'} ;


    //POINTED BAR CHART VARIABLES
    const getPath = (x, y, width, height) => {
      return `M${x},${y + height}
              C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
              C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
              Z`;
    };

    const TriangleBar = (props) => {
      const { fill, x, y, width, height } = props;

      return <path d={getPath(x, y, width, height)} stroke="none" fill={fill}/>;
    };

    TriangleBar.propTypes = {
      fill: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    };


    //LINE CHART
    if(this.state.charts[this.state.current] === "lineChartShowing") {
      return (
        <div id="graph">
          <LineChart width={900} height={400} data={presentationData}>
            <XAxis dataKey="date"/>
            <YAxis label={{ value: 'Relative Search Volume', angle: -90, position: 'insideLeft' }} />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line name={this.props.primaryMovie.title || ''} type="monotone" dataKey="primaryTrendVolume" stroke="#8884d8" />
            <Line name={this.props.secondaryMovie.title || ''} type="monotone" dataKey="secondaryTrendVolume" stroke="#82ca9d" />
            <Line name="Delta In Search Volume" type="monotone" dataKey="deltaDataKey" stroke="#8a110e" strokeDasharray="5 5" />
            <Tooltip />
            <Legend verticalAlign="top" />
          </LineChart>
          <div>
            <div>
              Select Unit Scale: &nbsp;
              {/*<RaisedButton id="weekly" label="Weekly" primary={true} style={weeklyfocusButtonStyle} onClick={context.changeDataShownFn.bind(this)} /> // WHYYYYYYYY!!!*/}
              <RaisedButton id="weekly" label="Weekly" primary={true} style={weeklyfocusButtonStyle} onClick={()=> this.setState({focus: 'weekly'})} />
              <RaisedButton id="monthly" label="Monthly" primary={true} style={monthlyfocusButtonStyle} onClick={()=> this.setState({focus: 'monthly'})} />
              <RaisedButton id="quarterly" label="Quarterly" primary={true} style={quarterlyfocusButtonStyle} onClick={()=> this.setState({focus: 'quarterly'})} />
              {/*<button id="weekly" style={weeklyfocusButtonStyle} onClick={this.changeDataShownFn.bind(this)}>Weekly</button>
              <button id="monthly" style={monthlyfocusButtonStyle} onClick={this.changeDataShownFn.bind(this)}>Monthly</button>
              <button id="quarterly" style={quarterlyfocusButtonStyle} onClick={this.changeDataShownFn.bind(this)}>Quarterly</button>*/}
            </div>
            <div>
              Select Time Period: &nbsp;
              <RaisedButton id="year" label="Full Year" primary={true} style={yearlyButtonStyle} onClick={()=> this.setState({timeframe: 'year'})} />
              <RaisedButton id="q1" label="1st Quarter" primary={true} style={q1ButtonStyle} onClick={()=> this.setState({timeframe: 'q1'})} />
              <RaisedButton id="q2" label="2nd Quarter" primary={true} style={q2ButtonStyle} onClick={()=> this.setState({timeframe: 'q2'})} />
              <RaisedButton id="q3" label="3rd Quarter" primary={true} style={q3ButtonStyle} onClick={()=> this.setState({timeframe: 'q3'})} />
              <RaisedButton id="q4" label="4th Quarter" primary={true} style={q4ButtonStyle} onClick={()=> this.setState({timeframe: 'q4'})} />


              {/*<button id="year" style={yearlyButtonStyle} onClick={this.changeDataTimeFrameShown.bind(this)}>Q1-4: Full Year</button>
              <button id="q1" style={q1ButtonStyle} onClick={this.changeDataTimeFrameShown.bind(this)}>Q1</button>
              <button id="q2" style={q2ButtonStyle} onClick={this.changeDataTimeFrameShown.bind(this)}>Q2</button>
              <button id="q3" style={q3ButtonStyle} onClick={this.changeDataTimeFrameShown.bind(this)}>Q3</button>
              <button id="q4" style={q4ButtonStyle} onClick={this.changeDataTimeFrameShown.bind(this)}>Q4</button>*/}
            </div>
          </div>
          <div>
              <RaisedButton label={this.state.leftChart} disabled={true} onClick={this.changeChartLeft.bind(this)} />
              <RaisedButton label="Next Chart Left" secondary={true} onClick={this.changeChartLeft.bind(this)} />
              <RaisedButton label="Next Chart Right" secondary={true} onClick={this.changeChartRight.bind(this)} />
              <RaisedButton label={this.state.rightChart} disabled={true} onClick={this.changeChartRight.bind(this)} />      
            {/*{this.state.leftChart}<button onClick={this.changeChartLeft.bind(this)}>NEXT CHART LEFT</button>
            <button onClick={this.changeChartRight.bind(this)}>NEXT CHART RIGHT</button>{this.state.rightChart}*/}
          </div>
          {this.props.graphData && this.props.primaryMovie.title ? <div>{this.props.primaryMovie.title} Release Date: {Movie1Release}</div> : ''}
          {this.props.graphData && this.props.secondaryMovie.title ? <div>{this.props.secondaryMovie.title} Release Date: {Movie2Release}</div> : ''}
        </div>
      );
    }

    //AREA CHART
    if(this.state.charts[this.state.current] === "areaChartShowing") {
    return (
      <div id="graph">
        <AreaChart width={900} height={400} data={presentationData}>
          <defs>
            <linearGradient id="primaryTrendVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="secondaryTrendVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="deltaDataKey" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8a110e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8a110e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date"/>
          <YAxis label={{ value: 'Relative Search Volume', angle: -90, position: 'insideLeft' }} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Area name={this.props.primaryMovie.title || ''} type="monotone" dataKey="primaryTrendVolume" stroke="#8884d8" fillOpacity={1} fill="url(#primaryTrendVolume)" />
          <Area name={this.props.secondaryMovie.title || ''} type="monotone" dataKey="secondaryTrendVolume" stroke="#82ca9d" fillOpacity={1} fill="url(#secondaryTrendVolume)" />
          <Area name="Delta In Search Volume" type="monotone" dataKey="deltaDataKey" stroke="#8a110e" strokeDasharray="5 5" fillOpacity={1} fill="url(#deltaDataKey)" />
          <Tooltip />
          <Legend verticalAlign="top" />
        </AreaChart>
             <div>
            <div>
              Select Unit Scale: &nbsp;
              <RaisedButton id="weekly" label="Weekly" primary={true} style={weeklyfocusButtonStyle} onClick={()=> this.setState({focus: 'weekly'})} />
              <RaisedButton id="monthly" label="Monthly" primary={true} style={monthlyfocusButtonStyle} onClick={()=> this.setState({focus: 'monthly'})} />
              <RaisedButton id="quarterly" label="Quarterly" primary={true} style={quarterlyfocusButtonStyle} onClick={()=> this.setState({focus: 'quarterly'})} />
            </div>
            <div>
              Select Time Period: &nbsp;
              <RaisedButton id="year" label="Full Year" primary={true} style={yearlyButtonStyle} onClick={()=> this.setState({timeframe: 'year'})} />
              <RaisedButton id="q1" label="1st Quarter" primary={true} style={q1ButtonStyle} onClick={()=> this.setState({timeframe: 'q1'})} />
              <RaisedButton id="q2" label="2nd Quarter" primary={true} style={q2ButtonStyle} onClick={()=> this.setState({timeframe: 'q2'})} />
              <RaisedButton id="q3" label="3rd Quarter" primary={true} style={q3ButtonStyle} onClick={()=> this.setState({timeframe: 'q3'})} />
              <RaisedButton id="q4" label="4th Quarter" primary={true} style={q4ButtonStyle} onClick={()=> this.setState({timeframe: 'q4'})} />
            </div>
          </div>
          <div>
              <RaisedButton label={this.state.leftChart} disabled={true} onClick={this.changeChartLeft.bind(this)} />
              <RaisedButton label="Next Chart Left" secondary={true} onClick={this.changeChartLeft.bind(this)} />
              <RaisedButton label="Next Chart Right" secondary={true} onClick={this.changeChartRight.bind(this)} />
              <RaisedButton label={this.state.rightChart} disabled={true} onClick={this.changeChartRight.bind(this)} />
          </div>
        {this.props.graphData && this.props.primaryMovie.title ? <div>{this.props.primaryMovie.title} Release Date: {Movie1Release}</div> : ''}
        {this.props.graphData && this.props.secondaryMovie.title ? <div>{this.props.secondaryMovie.title} Release Date: {Movie2Release}</div> : ''}
      </div>
    );
  }

    //BAR CHART STANDARD
    if(this.state.charts[this.state.current] === "barChartShowing" && this.state.bargraphType === 'standard') {
    return (
      <div id="graph">
        <RaisedButton label="Change Bar Chart Type" primary={true} onClick={()=> this.setState({bargraphType: 'pointed'})} />
        <BarChart width={900} height={400} data={presentationData}>
          <defs>
            <linearGradient id="primaryTrendVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="secondaryTrendVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="deltaDataKey" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8a110e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8a110e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date"/>
          <YAxis label={{ value: 'Relative Search Volume', angle: -90, position: 'insideLeft' }} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Bar name={this.props.primaryMovie.title || ''} type="monotone" dataKey="primaryTrendVolume" stroke="#8884d8" fillOpacity={1} fill="url(#primaryTrendVolume)" />
          <Bar name={this.props.secondaryMovie.title || ''} type="monotone" dataKey="secondaryTrendVolume" stroke="#82ca9d" fillOpacity={1} fill="url(#secondaryTrendVolume)" />
          <Bar name="Delta In Search Volume" type="monotone" dataKey="deltaDataKey" stroke="#8a110e" strokeDasharray="5 5" fillOpacity={1} fill="url(#deltaDataKey)" />
          <Tooltip />
          <Legend verticalAlign="top" />
        </BarChart>
             <div>
            <div>
              Select Unit Scale: &nbsp;
              <RaisedButton id="weekly" label="Weekly" primary={true} style={weeklyfocusButtonStyle} onClick={()=> this.setState({focus: 'weekly'})} />
              <RaisedButton id="monthly" label="Monthly" primary={true} style={monthlyfocusButtonStyle} onClick={()=> this.setState({focus: 'monthly'})} />
              <RaisedButton id="quarterly" label="Quarterly" primary={true} style={quarterlyfocusButtonStyle} onClick={()=> this.setState({focus: 'quarterly'})} />
            </div>
            <div>
              Select Time Period: &nbsp;
              <RaisedButton id="year" label="Full Year" primary={true} style={yearlyButtonStyle} onClick={()=> this.setState({timeframe: 'year'})} />
              <RaisedButton id="q1" label="1st Quarter" primary={true} style={q1ButtonStyle} onClick={()=> this.setState({timeframe: 'q1'})} />
              <RaisedButton id="q2" label="2nd Quarter" primary={true} style={q2ButtonStyle} onClick={()=> this.setState({timeframe: 'q2'})} />
              <RaisedButton id="q3" label="3rd Quarter" primary={true} style={q3ButtonStyle} onClick={()=> this.setState({timeframe: 'q3'})} />
              <RaisedButton id="q4" label="4th Quarter" primary={true} style={q4ButtonStyle} onClick={()=> this.setState({timeframe: 'q4'})} />
            </div>
          </div>
          <div>
              <RaisedButton label={this.state.leftChart} disabled={true} onClick={this.changeChartLeft.bind(this)} />
              <RaisedButton label="Next Chart Left" secondary={true} onClick={this.changeChartLeft.bind(this)} />
              <RaisedButton label="Next Chart Right" secondary={true} onClick={this.changeChartRight.bind(this)} />
              <RaisedButton label={this.state.rightChart} disabled={true} onClick={this.changeChartRight.bind(this)} />
          </div>
        {this.props.graphData && this.props.primaryMovie.title ? <div>{this.props.primaryMovie.title} Release Date: {Movie1Release}</div> : ''}
        {this.props.graphData && this.props.secondaryMovie.title ? <div>{this.props.secondaryMovie.title} Release Date: {Movie2Release}</div> : ''}
      </div>
    );
  }

      //BAR CHART
    if(this.state.charts[this.state.current] === "barChartShowing" && this.state.bargraphType === 'pointed') {
    return (
      <div id="graph">
        <RaisedButton label="Change Bar Chart Type" primary={true} onClick={()=> this.setState({bargraphType: 'standard'})} />
        <BarChart width={900} height={400} data={presentationData}>
          <defs>
            <linearGradient id="primaryTrendVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={1}/>
            </linearGradient>
            <linearGradient id="secondaryTrendVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={1}/>
            </linearGradient>
            <linearGradient id="deltaDataKey" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8a110e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8a110e" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date"/>
          <YAxis label={{ value: 'Relative Search Volume', angle: -90, position: 'insideLeft' }} />
          <CartesianGrid strokeDasharray="3 3"/>
          <Bar name={this.props.primaryMovie.title || ''} type="monotone" dataKey="primaryTrendVolume" shape={<TriangleBar/>} stroke="#8884d8" fillOpacity={1} fill="url(#primaryTrendVolume)" />
          <Bar name={this.props.secondaryMovie.title || ''} type="monotone" dataKey="secondaryTrendVolume" shape={<TriangleBar/>} stroke="#82ca9d" fillOpacity={1} fill="url(#secondaryTrendVolume)" />
          <Bar name="Delta In Search Volume" type="monotone" dataKey="deltaDataKey" stroke="#8a110e" shape={<TriangleBar/>} strokeDasharray="5 5" fillOpacity={1} fill="url(#deltaDataKey)" />
          <Tooltip />
          <Legend verticalAlign="top" />
        </BarChart>
          <div>
            <div>
              Select Unit Scale: &nbsp;
              <RaisedButton id="weekly" label="Weekly" primary={true} style={weeklyfocusButtonStyle} onClick={()=> this.setState({focus: 'weekly'})} />
              <RaisedButton id="monthly" label="Monthly" primary={true} style={monthlyfocusButtonStyle} onClick={()=> this.setState({focus: 'monthly'})} />
              <RaisedButton id="quarterly" label="Quarterly" primary={true} style={quarterlyfocusButtonStyle} onClick={()=> this.setState({focus: 'quarterly'})} />
            </div>
            <div>
              Select Time Period: &nbsp;
              <RaisedButton id="year" label="Full Year" primary={true} style={yearlyButtonStyle} onClick={()=> this.setState({timeframe: 'year'})} />
              <RaisedButton id="q1" label="1st Quarter" primary={true} style={q1ButtonStyle} onClick={()=> this.setState({timeframe: 'q1'})} />
              <RaisedButton id="q2" label="2nd Quarter" primary={true} style={q2ButtonStyle} onClick={()=> this.setState({timeframe: 'q2'})} />
              <RaisedButton id="q3" label="3rd Quarter" primary={true} style={q3ButtonStyle} onClick={()=> this.setState({timeframe: 'q3'})} />
              <RaisedButton id="q4" label="4th Quarter" primary={true} style={q4ButtonStyle} onClick={()=> this.setState({timeframe: 'q4'})} />
            </div>
          </div>
          <div>
              <RaisedButton label={this.state.leftChart} disabled={true} onClick={this.changeChartLeft.bind(this)} />
              <RaisedButton label="Next Chart Left" secondary={true} onClick={this.changeChartLeft.bind(this)} />
              <RaisedButton label="Next Chart Right" secondary={true} onClick={this.changeChartRight.bind(this)} />
              <RaisedButton label={this.state.rightChart} disabled={true} onClick={this.changeChartRight.bind(this)} />
          </div>
        {this.props.graphData && this.props.primaryMovie.title ? <div>{this.props.primaryMovie.title} Release Date: {Movie1Release}</div> : ''}
        {this.props.graphData && this.props.secondaryMovie.title ? <div>{this.props.secondaryMovie.title} Release Date: {Movie2Release}</div> : ''}
      </div>
    );
  }

  }
}

Graph.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  primaryMovie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  secondaryMovie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

function mapStateToProps({ graphData }) {
  return { graphData };
}

export default connect(mapStateToProps)(Graph);