const googleTrends = require('google-trends-api');

module.exports.timeLine = googleTrends.interestOverTime;
// argument: options object
// returns a promise with a JSON string result
// JSON.parse(result).default.timelineData is an array
// timelineData[i] has form: 
// {
//   time: String, 
//   formattedTime: String, 
//   formattedAxisTime: String, 
//   value: Number or Array, 
//   formattedValue: String
// }

// EXAMPLE
// var options = {
//   keyword: ['Beauty and the Beast', 'movies'], 
//   startTime: new Date(2017, 1)
// };
// googleTrends.interestOverTime(options)
// .then(function(results){
//   var output = JSON.parse(results);
//   console.log('trend result: ', output.default.timelineData);
// })
// .catch(function(err){
//   console.error('error: ', err);
// });