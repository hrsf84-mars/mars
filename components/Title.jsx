import React from 'react';

function Title(props) {
  let { title } = props.primaryMovie;
  const secondaryTitle = props.secondaryMovie.title;
  if (title && secondaryTitle) title += ` and ${secondaryTitle}`;
  return (
    <div>
      <h1 id="title">{title}</h1>
    </div>
  );
}

export default Title;
