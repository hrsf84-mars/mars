import axios from 'axios';

export const FETCH_MOVIE1 = 'FETCH_MOVIE1';
export const FETCH_MOVIE2 = 'FETCH_MOVIE2';
export const  FETCH_FINANCIALS= 'FETCH_FINANCIALS';
export const  LOGIN = 'LOGIN';
export const FETCH_USERNAME = 'FETCH_USERNAME';
export const FETCH_SAVED_MOVIES = 'FETCH_SAVED_MOVIES';



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

export function fetchUsername(userName) {
  return {
    type: FETCH_USERNAME,
    payload: userName,
  }
}

export function fetchSavedMovies(username) {
  //get the saved movies associated with the username
  const request = axios.get('/savedMovies', {username: username});
  console.log('does not go hereeee? why?');

  return {
    type: FETCH_SAVED_MOVIES,
    payload: request,
  };
}









