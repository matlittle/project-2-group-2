
const survery = require('./survey');

module.exports = function(app) {
  //Initialize scores and threshold to 0
  app.put('api/survey/initSurvey', function() {
    
  })

  //Get the next round of questions
  app.get('/api/survey/getQuestions', function(req, res) {

  });

  //Update the current threshold
  app.put('/api/survey/updateThreshold', function(req, res) {

  });

  //Update the user's scores
  app.put('/api/survey/updateScores', function(req, res) {

  });

}