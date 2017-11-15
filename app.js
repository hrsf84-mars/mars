const express = require('express');
const app = express();
const tmdb = require('./utils/tmdb');

app.use(express.static('public'));

const port = process.env.PORT || 7331;

app.get('/', (req, res) => {
  res.send('This is the landing page!');
});

app.get('/presentation/:movie', (req, res) => {
  const movie = req.params.movie;
  // fetch/check db

  tmdb.searchMoviesByName(movie).then(data => {
    // store into db

    res.send(data);
  });
  // res.send(`This is the presentation page for ${movie}`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
