import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import SearchBox from '../containers/SearchBox';
import MovieDetail from '../containers/MovieDetail';

export default function App() {
  return (
    <Paper>
      <AppBar title="Cliff on Mars" showMenuIconButton={false} />
      <SearchBox />
      <MovieDetail />
    </Paper>
  );
}
