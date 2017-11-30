import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFinancials } from '../actions/MovieAction';
import { bindActionCreators } from 'redux';


function Financials(props) {
  console.log(props.financials)
  return (
    <div>
      <h1 id="title" onClick={props.fetchFinancials}> Financials {props.financials.data}</h1>
    </div>
  );
}

// Title.propTypes = {
//   primaryMovie: PropTypes.shape({
//     title: PropTypes.string,
//   }).isRequired,
//   secondaryMovie: PropTypes.shape({
//     title: PropTypes.string,
//   }).isRequired,
// };

function mapStateToProps({ financials }) {
  return { financials };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFinancials }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Financials);