import React from 'react';
import PropTypes from 'prop-types';

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

Title.propTypes = {
  primaryMovie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  secondaryMovie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default Title;
