import { combineReducers } from 'redux';
import PrimaryMovieReducer from './primaryMovie';
import SecondaryMovieReducer from './secondaryMovie';
import GraphDataReducer from './graphData';

const rootReducer = combineReducers({
  primaryMovie: PrimaryMovieReducer,
  secondaryMovie: SecondaryMovieReducer,
  graphData: GraphDataReducer,
});

export default rootReducer;
