import { FETCH_MOVIE1 } from '../actions/MovieAction';

export default function (state = false, action) {
  switch (action.type) {
    case FETCH_MOVIE1:
      return true;
    default:
      return state;
  }
}
