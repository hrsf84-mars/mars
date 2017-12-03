import { FETCH_USERNAME } from '../actions/MovieAction';

export default function (state = '', action) {
  switch (action.type) {
    case FETCH_USERNAME:
      return action.payload;
    default:
      return state;
  }
}