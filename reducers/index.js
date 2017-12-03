import { combineReducers } from 'redux';
import PrimaryMovieReducer from './primaryMovie';
import SecondaryMovieReducer from './secondaryMovie';
import GraphDataReducer from './graphData';
import FetchFinancials from './financials'
import login from './login'
import fetchUsername from './fetchUsername';
import fetchSavedMovies from './fetchSavedMovies';


const rootReducer = combineReducers({
  primaryMovie: PrimaryMovieReducer,
  secondaryMovie: SecondaryMovieReducer,
  graphData: GraphDataReducer,
  financials: FetchFinancials,
  login: login,
  username: fetchUsername,
  savedMovies: fetchSavedMovies
});

export default rootReducer;
