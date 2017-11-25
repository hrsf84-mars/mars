import React from 'react';

export default ({ primaryMovie, secondaryMovie }) => {
  const primaryTitle = primaryMovie.title;
  const secondaryTitle = secondaryMovie.title;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Movie Info</th>
          <th>{primaryTitle}</th>
          <th>{secondaryTitle}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Revenue</th>
          <th>{primaryMovie.revenue}</th>
          <th>{secondaryMovie.revenue}</th>
        </tr>
        <tr>
          <th>Release Date</th>
          <th>{primaryMovie.releaseDate}</th>
          <th>{secondaryMovie.releaseDate}</th>
        </tr>
        <tr>
          <th>Production Companies</th>
          <th>{primaryMovie.productionCompanies}</th>
          <th>{secondaryMovie.productionCompanies}</th>
        </tr>
      </tbody>
    </table>
  );
};
