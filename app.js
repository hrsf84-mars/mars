const express = require('express');
const app = express();
const tmdb = require('./utils/tmdb');

app.use(express.static('public'));

const port = process.env.PORT || 7331;

app.get('/', (req, res) => {
  res.send('This is the landing page!');
});

app.get('/search/:movie', (req, res) => {
  tmdb.searchMoviesByName(req.params.movie).then(data => {
    res.send(data);
  });
});

app.get('/movie/:tmdbId', (req, res) => {
  const tmdbId = req.params.tmdbId;

  // fetch/check db

  const results = {};

  const dataProm = tmdb.fetchMovieById(tmdbId).then(data => {
    results.data = data;
  });

  const imgProm = tmdb.fetchImageById(tmdbId).then(images => {
    results.images = images;
  });

  Promise.all([dataProm, imgProm]).then(() => {
    // store results into db
    res.send(results);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
