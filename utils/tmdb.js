const axios = require('axios');

// exports.fetchMovie = () => {
//   axios.get(`http://api.themoviedb.org/3/discover/movie/${}`, {
//     params: {
//       sort_by: ''
//     }
//   })
// };

console.log(process.env.API_KEY);

const movieId = 550;

axios.get(`http://api.themoviedb.org/3/movie/${movieId}`, {
  params: {
    'api_key': process.env.API_KEY
  }
}).then(res => console.log(res.data)).catch(err => console.error(err));
