const axios = require('axios');

exports.searchMoviesByName = query => {
  return axios.get('http://api.themoviedb.org/3/search/movie', {
    params: {
      'api_key': process.env.API_KEY,
      // 'language': 'en-US',
      query,
    }
  }).then(res => {
    console.log(res.data);
    return res.data;
  }).catch(err => {
    console.error(err.response.data.status_message);
  });
};

exports.fetchMovieById = id => {
  return axios.get(`http://api.themoviedb.org/3/movie/${id}`, {
    params: {
      'api_key': process.env.API_KEY,
      // 'language': 'en-US',
    }
  }).then(res => console.log(res.data)).catch(err => console.error(err.response.data.status_message));
};

// exports.searchMoviesByName('spider man');
// exports.fetchMovieById(557);
