import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};
const titleBackgroundStyle =
'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)';
const url = 'https://image.tmdb.org/t/p/w154';

export default ({ movies, fetchMovie }) => {
  const movieList = movies.filter(movie => movie.poster_path).map(movie => (
    <GridTile
      key={movie.id}
      title={movie.title}
      titleStyle={styles.titleStyle}
      titleBackground={titleBackgroundStyle}
      onClick={() => fetchMovie(movie.id)}
    >
      <img src={url + movie.poster_path} alt={movie.title} />
    </GridTile>
  ));

  return (
    <div style={styles.root}>
      <GridList style={styles.gridList} cols={2.2}>
        {movieList}
      </GridList>
    </div>
  );
};
