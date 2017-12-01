import { LOGIN } from '../actions/MovieAction';

export default function (state = false, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
}