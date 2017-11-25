const axios = require('axios');

const twitter_api = 'https://api.twitter.com/1.1/search/tweets.json';
const twitter_token = process.env.TWITTERAPI;

const watson_api = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze';
const watson_token = process.env.WATSONAPI;

var getEmotions = function(text) {
  return axios.get(watson_api,
    { params:  {
      version: '2017-02-27',
      features: 'emotion',
      text: text
    },
    headers: {
      Authorization: "Basic " + watson_token
    }
  })
  .catch(err => {
    console.log('error from watson API:  ' + err);
  }).then(Promise.resolve(false));
};

//returns an object with emotion properties
module.exports.avgTweetEmotion = function(twitterSearchTerm) {
  return axios.get(twitter_api,
    {params: {
      q: twitterSearchTerm
    },
    headers: {
      Authorization: "Bearer " + twitter_token
    }
  })
  .then(res => {
    return res.data.statuses.map( status => {
      return status.text;
    });
  })
  .then(texts => {
    var emotions = [];
    texts.forEach( text => emotions.push(getEmotions(text)) );
    return Promise.all(emotions);
  })
  .then( emotions => {
    var avg_emotion = {sadness: 0, joy: 0, fear: 0, disgust: 0, anger: 0};
    var emotion_count = 0;
    emotions.forEach( emotion => {
      if(emotion) {
        for(prop in avg_emotion) {
          avg_emotion[prop] += emotion.data.emotion.document.emotion[prop];
        }
        emotion_count += 1;
      }
    })
    for(prop in avg_emotion) {
      avg_emotion[prop] /= emotion_count;
    }
    return avg_emotion;
  })
  .catch(err => {
    console.log('error from twitter api:  ' + err);
  });
}