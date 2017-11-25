import React from 'react';
import Movie from './Movie';

export default ({ movies, fetchMovie }) => {
  const movieList = [];
  for (let i = 0; i < movies.length && i < 5; i += 1) {
    const movie = movies[i];
    movieList.push(<Movie key={movie.id} movie={movie} fetchMovie={fetchMovie} />);
  }

  return <div>{movieList}</div>;
};
