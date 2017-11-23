import React from 'react';

function Title(props) {
  return (
    <div>
      <h1 id="title">{props.primary_movie.title} and {props.secondary_movie.title}</h1>
    </div>
  );
}

export default Title;
