import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFinancials } from '../actions/MovieAction';
import { bindActionCreators } from 'redux';
import moment from 'moment';


function Financials(props) {
  console.log(props.secondaryMovie);
  //calcs for ROI
  let primaryROI = Math.floor((props.primaryMovie.revenue - props.primaryMovie.budget)/props.primaryMovie.budget * 365/((new Date() - new Date(props.primaryMovie.releaseDate)) / 1000 / 60 / 60 / 24 ) * 100)
  let secondaryROI = Math.floor((props.secondaryMovie.revenue - props.secondaryMovie.budget)/props.secondaryMovie.budget * 365/((new Date() - new Date(props.secondaryMovie.releaseDate)) / 1000 / 60 / 60 / 24 ) * 100)

  if(props.primaryMovie.title && props.secondaryMovie.title ) {
    return (
      <div>
        <h1 id="title" onClick={props.fetchFinancials}> {props.primaryMovie.title} vs. {props.secondaryMovie.title}</h1>
        <div>
          {props.primaryMovie.title} budget: {props.primaryMovie.budget}
          {props.secondaryMovie.title} budget: {props.secondaryMovie.budget}
          {props.primaryMovie.title} revenue: {props.primaryMovie.revenue}
          {props.secondaryMovie.title} revenue: {props.secondaryMovie.revenue}
          <br/>
          {props.primaryMovie.title} ROI: {primaryROI}%
          {props.secondaryMovie.title} ROI: {secondaryROI}%

        </div>
      </div>
    )
  } else {
    return (<div>WITHOUT 2 MOVIES BEING COMPARED, THERE CANNOT BE AN ROI COMPARISON</div>)
  }
}

// Title.propTypes = {
//   primaryMovie: PropTypes.shape({
//     title: PropTypes.string,
//   }).isRequired,
//   secondaryMovie: PropTypes.shape({
//     title: PropTypes.string,
//   }).isRequired,
// };

function mapStateToProps({ financials, primaryMovie, secondaryMovie }) {
  return { financials, primaryMovie, secondaryMovie };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFinancials }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Financials);