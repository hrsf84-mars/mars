import axios from 'axios';

export const FETCH_MOVIE1 = 'FETCH_MOVIE1';
export const FETCH_MOVIE2 = 'FETCH_MOVIE2';
export const  FETCH_FINANCIALS= 'FETCH_FINANCIALS';
export const  LOGIN = 'LOGIN';


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

export function fetchFinancials(movieName) {
  const request = axios.get(`/financials`);

  return {
    type: FETCH_FINANCIALS,
    payload: request,
  };
}

export function login(bool) {
  return {
    type: LOGIN,
    payload: bool,
  };
}


