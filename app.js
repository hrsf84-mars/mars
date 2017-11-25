const express = require('express');
const tmdb = require('./utils/tmdb');
const { movieTrend } = require('./utils/trendFetch');
const Movie = require('./db/Movie');

const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 7331;

app.get('/', (req, res) => {
  res.send('This is the landing page!');
});

app.get('/search/:movie', (req, res) => {
  tmdb.searchMoviesByName(req.params.movie).then((data) => {
    res.send(data);
  });
});

app.get('/movie/:tmdbId', async (req, res) => {
  const { tmdbId } = req.params;

  try {
    const movie = await Movie.findOne({ tmdbId });
    if (movie) {
      return res.send(movie);
    }

    const data = [await tmdb.fetchMovieById(tmdbId), await tmdb.fetchImageById(tmdbId)];
    const movieData = data[0];
    const images = data[1];

    const results = { tmdbId };
    results.title = movieData.title;
    results.productionCompanies = movieData.production_companies.map(company => company.name);
    results.genres = movieData.genres.map(genre => genre.name);
    results.budget = movieData.budget;
    results.revenue = movieData.revenue;
    // resutlts.estimatedProfit =
    results.releaseDate = movieData.release_date;
    results.images = images;

    const trendData = await movieTrend(results.title, results.releaseDate);
    const { timelineData } = JSON.parse(trendData).default;
    results.trendData = timelineData.map(trend => ({
      formattedAxisTime: trend.formattedAxisTime,
      value: (trend.value[0] / trend.value[1]) * 100,
    }));

    const movieDoc = new Movie(results);
    await movieDoc.save();
    return res.send(results);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
