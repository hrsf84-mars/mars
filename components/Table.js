import React from 'react';

function Table(props) {
  return <div id="table">
    <div id="first_movie">
      <h3>{props.primary_movie.title}</h3>
      <p>Revenue: {props.primary_movie.revenue}</p>
      <p>Release Date: {props.primary_movie.release_date}</p>
      <p>Production Company: {props.primary_movie.production_company}</p>
    </div>
    <br></br><br></br>
    <div id="second_movie">
      <h3>{props.secondary_movie.title}</h3>
      <p>Revenue: {props.secondary_movie.revenue}</p>
      <p>Release Date: {props.secondary_movie.release_date}</p>
      <p>Production Company: {props.secondary_movie.production_company}</p>
    </div>
  </div>
}

export default Table;
