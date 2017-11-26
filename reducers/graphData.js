import { FETCH_MOVIE1, FETCH_MOVIE2 } from '../actions/MovieAction';

function combineTwoLines(primaryGraph, secondaryGraph) {
  const dateToVol = new Map();

  primaryGraph.forEach((data) => {
    const { date, primaryTrendVolume } = data;
    const arr = [primaryTrendVolume];
    if (primaryTrendVolume) dateToVol.set(date, arr);
  });

  secondaryGraph.forEach((data) => {
    const { formattedAxisTime, value } = data;
    const arr = dateToVol.get(formattedAxisTime) || [undefined];
    arr.push(value);
    dateToVol.set(formattedAxisTime, arr);
  });

  const res = [];

  const mapIter = dateToVol.entries();
  let entry = mapIter.next().value;
  while (entry) {
    const [date, volArr] = entry;
    const primaryTrendVolume = volArr[0];
    const secondaryTrendVolume = volArr[1];
    res.push({
      date,
      primaryTrendVolume,
      secondaryTrendVolume,
    });
    entry = mapIter.next().value;
  }

  res.sort((a, b) => (new Date(a.date) <= new Date(b.date) ? -1 : 1));
  // console.log(res);

  return res;
}

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
      return combineTwoLines(state, action.payload.data.trendData);
    default:
      return state;
  }
}
