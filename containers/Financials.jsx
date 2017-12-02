import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFinancials } from '../actions/MovieAction';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';




function Financials(props) {
  //calcs for ROI
  // let primaryROI = Math.floor((props.primaryMovie.revenue - props.primaryMovie.budget)/props.primaryMovie.budget * 365/((new Date() - new Date(props.primaryMovie.releaseDate)) / 1000 / 60 / 60 / 24 ) * 100) 
  // let secondaryROI = Math.floor((props.secondaryMovie.revenue - props.secondaryMovie.budget)/props.secondaryMovie.budget * 365/((new Date() - new Date(props.secondaryMovie.releaseDate)) / 1000 / 60 / 60 / 24 ) * 100) 
  let primaryROI = Math.floor((props.primaryMovie.revenue - props.primaryMovie.budget)/props.primaryMovie.budget * 100) * 0.5; 
  let secondaryROI = Math.floor((props.secondaryMovie.revenue - props.secondaryMovie.budget)/props.secondaryMovie.budget * 100) * 0.5;
  if((new Date() - new Date(props.primaryMovie.releaseDate)) / 1000 / 60 / 60 / 24 < 30) {
    Math.floor(primaryROI = primaryROI * 8 * 30 / ((new Date() - new Date(props.primaryMovie.releaseDate))/ 1000 / 60 / 60 / 24));
  }

  if((new Date() - new Date(props.secondaryMovie.releaseDate)) / 1000 / 60 / 60 / 24 < 30) {
    secondaryROI = Math.floor(secondaryROI * 8 * 30 / ((new Date() - new Date(props.secondaryMovie.releaseDate)) / 1000 / 60 / 60 / 24));
  }

  let content = () => {
    console.log(props.primaryMovie, props.secondaryMovie);
    const data = [
      {name: props.primaryMovie.title, ROI: primaryROI},
      {name: props.secondaryMovie.title, ROI: secondaryROI}
    ]


    if(props.primaryMovie.title && props.secondaryMovie.title ) {
    return (
      <div>
        <h4 id="title" onClick={props.fetchFinancials}> {props.primaryMovie.title} vs. {props.secondaryMovie.title}</h4>
        <div>
          {props.primaryMovie.title} ROI: {primaryROI}%
          <br/>
          {props.secondaryMovie.title} ROI: {secondaryROI}%
          <br/>
        <BarChart width={600} height={300} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Bar dataKey="ROI" fill="#8884d8" />
        </BarChart>
        </div>
      </div>
    )
    } else if (!props.login) {
      return (<div>YOU MUST BE LOGGEDIN TO USE THIS FEATURE</div>)
    } else {
      return (<div></div>)
    }
  }

  return (
  <div>
    <h1>Financials</h1>
    <div>{content()}</div>
  </div>)
}

// Title.propTypes = {
//   primaryMovie: PropTypes.shape({
//     title: PropTypes.string,
//   }).isRequired,
//   secondaryMovie: PropTypes.shape({
//     title: PropTypes.string,
//   }).isRequired,
// };

function mapStateToProps({ financials, primaryMovie, secondaryMovie, login }) {
  return { financials, primaryMovie, secondaryMovie, login };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFinancials }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Financials);

