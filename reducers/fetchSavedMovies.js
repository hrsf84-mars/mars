import { FETCH_SAVED_MOVIES } from '../actions/MovieAction';

export default function (state = {}, action) {
	switch (action.type) {
	    case FETCH_SAVED_MOVIES:
	      return action.payload.data;
	    default:
	      return state;
	  } 
}

