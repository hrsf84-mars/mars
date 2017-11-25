import { FETCH_MOVIE1, FETCH_MOVIE2 } from '../actions/MovieAction';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_MOVIE1:
      return action.payload.data.trendData.map(data => (
        {
          date: data.formattedAxisTime,
          primaryTrendVolume: data.value,
        }
      ));
    case FETCH_MOVIE2:
      return action.payload.data.trendData.map((data, idx) => {
        // const { primaryTrendVolume } = state[idx];
        return {
          date: data.formattedAxisTime,
          // primaryTrendVolume,
          secondaryTrendVolume: data.value,
        };
      }).concat(state);
    default:
      return state;
  }
}
