const axios = require('axios');

exports.searchMoviesByName = query => {
  return axios.get('http://api.themoviedb.org/3/search/movie', {
    params: {
      'api_key': process.env.API_KEY,
      // 'language': 'en-US',
      query,
    }
  }).then(res => {
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
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.error(err.response.data.status_message);
  });
};

// Fetches images for 
exports.fetchImageById = id => {
  const url = 'https://image.tmdb.org/t/p/w500';
  return axios.get(`http://api.themoviedb.org/3/movie/${id}/images`, {
    params: {
      'api_key': process.env.API_KEY,
      // 'language': 'en-US',
    }
  }).then(res => {
    const images = res.data.backdrops;
    return images.map(img => url + img.file_path);
  }).catch(err => {
    console.error(err.response.data.status_message);
  });
};
