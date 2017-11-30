import { FETCH_FINANCIALS } from '../actions/MovieAction';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_FINANCIALS:
      return action.payload;
    default:
      return state;
  }
}