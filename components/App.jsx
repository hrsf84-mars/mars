import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import SearchBox from '../containers/SearchBox';
import MovieDetail from '../containers/MovieDetail';
import Financials from '../containers/Financials';

export default function App() {
  return (
    <Paper>
      <AppBar
        title="Cliff Movie DB"
        iconElementLeft={<img src="https://s3.amazonaws.com/tt-public-assets/Cliff_icon.png" alt="Logo" />}
      />
      <SearchBox />
      <MovieDetail />
      <Financials />
    </Paper>
  );
}
