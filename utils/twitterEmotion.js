const axios = require('axios');

const twitterApiUrl = 'https://api.twitter.com/1.1/search/tweets.json';
const twitterToken = process.env.TWITTERAPI;

const watsonApiUrl = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze';
const watsonToken = process.env.WATSONAPI;

const getEmotions = function (text) {
  return axios.get(
    watsonApiUrl,
    {
      params: {
        version: '2017-02-27',
        features: 'emotion',
        text,
      },
      headers: {
        Authorization: `Basic ${watsonToken}`,
      },
    },
  )
    .catch((err) => {
      console.log(`error from watson API:  ${err}`);
    }).then(Promise.resolve(false));
};

//  returns an object with emotion properties
module.exports.avgTweetEmotion = function (twitterSearchTerm) {
  return axios.get(
    twitterApiUrl,
    {
      params: {
        q: twitterSearchTerm,
      },
      headers: {
        Authorization: `Bearer ${twitterToken}`,
      },
    },
  )
    .then(res => res.data.statuses.map(status => status.text))
    .then((texts) => {
      const emotions = [];
      texts.forEach(text => emotions.push(getEmotions(text)));
      return Promise.all(emotions);
    })
    .then((emotions) => {
      const avgEmotion = {
        sadness: 0, joy: 0, fear: 0, disgust: 0, anger: 0,
      };
      const props = Object.keys(avgEmotion);
      let emotionCount = 0;
      emotions.forEach((emotion) => {
        if (emotion) {
          for (let i = 0; i < props.length; i += 1) {
            avgEmotion[props[i]] += emotion.data.emotion.document.emotion[props[i]];
          }
          emotionCount += 1;
        }
      });
      for (let i = 0; i < props.length; i += 1) {
        avgEmotion[props[i]] /= emotionCount;
      }
      return avgEmotion;
    })
    .catch((err) => {
      console.log(`error from twitter api:  ${err}`);
    });
};
