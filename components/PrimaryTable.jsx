import React from 'react';

function PrimaryTable(props) {
  return (
    <div id="table">
      <div id="first_movie">
        <h3>{props.primary_movie.title}</h3>
        <p>Revenue: {props.primary_movie.revenue}</p>
        <p>Release Date: {props.primary_movie.releaseDate}</p>
        <p>Production Company: {props.primary_movie.productionCompanies}</p>
      </div>
    </div>
  );
}

export default PrimaryTable;
