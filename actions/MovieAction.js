import axios from 'axios';

export const FETCH_MOVIE1 = 'FETCH_MOVIE1';
export const FETCH_MOVIE2 = 'FETCH_MOVIE2';

export function fetchMovie1(id) {
  const request = axios.get(`/movie/${id}`);

  return {
    type: FETCH_MOVIE1,
    payload: request,
  };
}

export function fetchMovie2(id) {
  const request = axios.get(`/movie/${id}`);

  return {
    type: FETCH_MOVIE2,
    payload: request,
  };
}
