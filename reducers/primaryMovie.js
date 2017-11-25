import { FETCH_MOVIE1 } from '../actions/MovieAction';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIE1:
      return action.payload.data;
    default:
      return state;
  }
}
