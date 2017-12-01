//hi testing heroku last time
const express = require('express');
const tmdb = require('./utils/tmdb');
const { movieTrend } = require('./utils/trendFetch');
const { avgTweetEmotion } = require('./utils/twitterEmotion');
const Movie = require('./db/Movie');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./db/User.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');


passport.use(new LocalStrategy(
  function(username, password, done) {
    
    User.findOne({ username: username }, function (err, user) {
      if (err) { console.log(err); return done(err);}
      if (!user) {
        console.log('no user')
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log('invalid pw')
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'help'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


const port = process.env.PORT || 7331;

app.post('/login',
  passport.authenticate('local', { successRedirect: '/logSuccess',
   failureRedirect: '/logFail',
   failureFlash: true })
);

app.get('/', (req, res) => {
  res.send('This is the landing page!');
});

// app.get('/userInfo', (req, res) => {
//   console.log('user info', req.user)
//   var loggedIn = false;
//   if (req.user) {
//     loggedIn = true;
//   }
//   res.send(JSON.stringify(loggedIn));
// });


app.get('/logSuccess', (req, res) => {
  res.send(JSON.stringify(true));
});

app.get('/logFail', (req, res) => {
  res.send(JSON.stringify(false));
});

app.get('/financials', (req, res) => {
  res.status(200);
  res.send("Hello");
});

app.post('/signUp', (req, res) => {
  // hasher(req.body.password);
  // User.insert()
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  console.log(hash);

  var currUser = new User( {
    username: req.body.username,
    hash: hash,
    salt: salt
  })

  new Promise((resolve, reject) => { 
    return resolve( currUser.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('user saved');
        return(currUser);
      }
    })
  )})
    .then( () => { 
      res.status(200);
      res.send();
    })
})


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
      const emotion = await avgTweetEmotion(movie.title);
      const results = movie.toObject();
      results.emotion = emotion;
      return res.send(results);
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

    const smData = [
      await movieTrend(results.title, results.releaseDate),
      await avgTweetEmotion(results.title),
    ];
    const trendData = smData[0];
    const emotion = smData[1];

    const { timelineData } = JSON.parse(trendData).default;
    results.trendData = timelineData.map((trend) => {
      let { formattedAxisTime } = trend;
      if (trend.formattedAxisTime.length < 7) formattedAxisTime += ', 2017';
      return {
        formattedAxisTime,
        value: (trend.value[0] / trend.value[1]) * 100,
      };
    });

    const movieDoc = new Movie(results);
    await movieDoc.save();

    results.emotion = emotion;
    return res.send(results);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));
