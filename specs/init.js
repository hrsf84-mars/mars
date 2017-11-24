const {expect} = require('chai');
const request = require('request'); 
const mongoose = require('mongoose'); 
// const axios = require('axios'); 
const express = require('express'); 
const app = express(); 


describe('Init', () => {
  it('should have 1 to equal 1', () => {
    expect(1).to.equal(1);
  });

  it('should return estimated profits'() => {
    console.log('called est profits'); 
     // var lincolnLawyer = ()
     // expect(lincolnLawyer).estimatedProfits.to.eql(????)
  });

  it('should throw an error for nonexistent movies' () => {
    console.log('called error nonexistent');
     // var nameOfAShortFilmCliffWroteInCollege = null; // will fill this out when I can see search function 
     // expect(nameOfShortFilmCliffWroteInCollege).to.throw()
  });

  it(' should gracefully handle errors for movies released before 2010', () => {
    console.log('called error pre 2010'); 
    // var chinatown = searchFunction('Chinatown')
    // expect(chinatown).to.not.have.a.property('estimatedProfit')
  });

  it('should check database first to see if a movie is already in it', () => {
    console.log('called check database first'); 
    // var spy = utils.searchMoviebyName('The Lincoln Lawyer')
    // expect(spy).to.not.have.been.called.once
  });

  it('should fetch a movie not in db from tmdb', () => {
    console.log('called fetch a movie not in db from tmdb'); 
    // have to use .then on again 
    // var spy = utils.searchMoviebyName = ('Thor: Ragnarok')
    // expect(spy).to.have.been.called.once
  });

  it('should return movies in specified format', () => {
    console.log('called return movies in specified format'); 
    // I'd actually like to write this one later, when I can see what's coming back from the db when I run ths on localhost
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
  });

  it('should fetch trend data from multiple APIs', () => {
    console.log('called fetch trend data from multiple apis'); 
    // create separate spies to check if multiple API calls have been made 
  });

  it('should be able to return the interest over time of a given movie' () => {
    console.log('called interest over time function'); 
  }); 

  it('should chart one movies trend data if only one movie is searched', () => {
    console.log('chart one movie called'); 
  });

  it('should chart two movies trend data if two movies are searched', () => {
    console.log('chart two movies has been called'); 
  }); 

  it('should set is_secondary to true if find second movie is clicked', () => {
    console.log('set secondary to true has been called'); 
  }); 

  it('should have a graphing object with a longitudinal property which is an array of length 9', () => {
    console.log('graphing obj longitudinal of length 9 is called'); 
  });

  it('should have a setGraphingObject which has been called', () => {
    console.log('setGraphingObject test has been called'); 
  });

  
});




