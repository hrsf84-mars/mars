import React from 'react';

export default function ({ movie, fetchMovie }) {
  const url = 'https://image.tmdb.org/t/p/w500';
  return (
    <span className="movieComponent">
      <button className="movieButton" onClick={() => fetchMovie(movie.id)}>
        <img src={url + movie.poster_path} alt={movie.title} />
        <p>{movie.title}</p>
      </button>
    </span>
  );
}
