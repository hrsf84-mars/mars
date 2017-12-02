const { expect } = require('chai');
const request = require('supertest');
const primaryData = require('../components/_primaryTestData.js');
const server = require('../app.js');

describe('Init', () => {
  it('should have 1 to equal 1', () => {
    expect(1).to.equal(1);
  });

  it('should return estimated profits', () => {
    console.log('called est profits');
    const estimatedProfit = primaryData.data.estimated_profit;
    expect(estimatedProfit).to.equal(1264);
  });

  // it('should throw an error for nonexistent movies', () => {
  //   console.log('called error nonexistent');
  //    // var oglebogle = null; // will fill this out when I can see search function
  //    // expect().to.throw()
  // });

  // it(' should gracefully handle errors for movies released before 2010', () => {
  //   console.log('called error pre 2010');
  //   var chinatown = SearchBox.onMovieSearch('Chinatown')
  //   expect(chinatown).to.not.have.a.property('estimatedProfit')
  // });

  // it('should check database first to see if a movie is already in it', () => {
  //   console.log('called check database first');
  //   // var spy = utils.searchMoviebyName('The Lincoln Lawyer')
  //   // expect(spy).to.not.have.been.called.once
  // });

  // it('should fetch a movie not in db from tmdb', () => {
  //   console.log('called fetch a movie not in db from tmdb');
  //   // have to use .then on again
  //   // var spy = utils.searchMoviebyName = ('Thor: Ragnarok')
  //   // expect(spy).to.have.been.called.once
  // });

  it('should return movies in specified format', () => {
    console.log('called return movies in specified format');
    const { data } = primaryData;
    expect(data).to.have.a.property('longitudinal_data');
    expect(data).to.have.a.property('estimated_profit');
    expect(data).to.have.a.property('genre');
    expect(data).to.have.a.property('revenue');
    expect(data).to.have.a.property('release_date');
    expect(data).to.have.a.property('title');
    expect(data).to.have.a.property('images');
    // I'd actually like to write this one later, when I can see what's coming back from
    // the db when I run this on localhost
    // I'll incorporate .then later, and add the correct function
    // var getOut = (searchFunction('Get Out'));
    // expect(getOut).to.have.a.property('budget');
    // expect(getOut).to.have.a.property('revenue');
    // expect(getOut).to.have.a.property('estimatedProfit');
    // expect(getOut).to.have.a.property('trendData');
    // expect(getOut).to.have.a.property('productionCompanies');
  });

  it('should return trend ratings in the correct format', () => {
    console.log('called return trend ratings in the correct format');
    // var getOutTrendData = (searchFunction('Get Out'))
    const trendRatings = primaryData.data.longitudinal_data;
    const filteredTrends = trendRatings.filter(trend =>
      trend.formattedAxisTime && trend.google_trends_vol);
    expect(filteredTrends.length).to.equal(9);
  });


  // it('should fetch trend data from google Trends', () => {
  //   console.log('called fetch trend data from multiple apis');
  //   // create separate spies to check if multiple API calls have been made
  // });

  // it('should be able to return the interest over time of a given movie', () => {
  //   console.log('called interest over time function');
  // });

  // it('should chart trend data for one movie if only one movie is searched', () => {
  //   console.log('chart one movie called');
  // });

  // it('should chart trend data for two movies if two movies are searched', () => {
  //   console.log('chart two movies has been called');
  // });

  // it('should set is_secondary to true if find second movie is clicked', () => {
  //   console.log('set secondary to true has been called');
  // });

  it('should have a graphing object with a longitudinal property which is an array of length 9', () => {
    console.log('graphing obj longitudinal of length 9 is called');
    const { data } = primaryData;
    expect(data.longitudinal_data.length).to.equal(9);
  });

  xit('should have a setGraphingObject which has been called', () => {
    console.log('setGraphingObject test has been called');
  });
});

describe('loading routes', () => {
  // let server;
  beforeEach(() => {
    // server = require('../app.js');
  });
  afterEach(function(){
    // server.close();
  });
  it('responds to get', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
  // the below test requires a valid API key!!!!!
  xit('responds to search by tmdbId', (done) => {
    request(server)
      .get('/movie/315635')
      .expect(200, done);
  });
  it('responds to searchmovie', (done) => {
    request(server)
      .get('/search/:movie')
      .expect(200, done);
  });
  it('responds to /login', (done) => {
    request(server)
      .get('/login')
      .expect(200, done);
  });
  it('responds to /financials', (done) => {
    request(server)
      .get('/financials')
      .expect(200, done);
  });
  it('responds to /signup', (done) => {
    request(server)
      .post('/signUp')
      .send({
        username: 'username@wonderflow.co',
        password: 'password',
      })
      .expect(200, done);
  });
  it('should throw an error for a bad request', (done) => {
    request(server)
      .get('/movie/:tmdbId')
      .expect(400, done);
  });
});
