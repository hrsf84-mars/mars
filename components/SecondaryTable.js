import React from 'react';

function SecondaryTable(props) {
  return <div id="second_movie">
    <h3>{props.secondary_movie.title}</h3>
    <p>Revenue: {props.secondary_movie.revenue}</p>
    <p>Release Date: {props.secondary_movie.release_date}</p>
    <p>Production Company: {props.secondary_movie.production_company}</p>
  </div>
}

export default SecondaryTable;
