import React from 'react';
import SearchBox from '../containers/SearchBox';
import MovieDetail from '../containers/MovieDetail';
import Financials from '../containers/Financials';

//home has access to the logged boolean
function Home(props) {
  return (
    <div>
      <SearchBox />
      <MovieDetail />
      <Financials />
    </div>
  );
}

export default Home;