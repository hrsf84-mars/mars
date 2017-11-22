import React from 'react';

function PrimaryTable(props) {
  return <div id="table">
    <div id="first_movie">
      <h3>{props.primary_movie.title}</h3>
      <p>Revenue: {props.primary_movie.revenue}</p>
      <p>Release Date: {props.primary_movie.release_date}</p>
      <p>Production Company: {props.primary_movie.production_company}</p>
    </div>
  </div>
}

export default PrimaryTable;
