
const survey = require('./survey');

module.exports = function(app) {
  //Initialize scores and threshold to 0
  app.put('/api/survey/initSurvey', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/initSurvey ========");
    
    const result = await survey.initializeSurvey(req.user.id);

    console.log("result: ", result);

    res.json(result);
  });

  //Get the next round of questions
  app.get('/api/survey/getQuestions', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/getQuestions ======");
    
    const result = await survey.getNewQuestions(req.user.id);

    console.log("result: ", result);

    res.json(result);
  });

  //Update the current threshold
  app.put('/api/survey/updateThreshold', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/updateThreshold ===");
    
    const result = await survey.updateState(req.user.id);

    console.log("result: ", result);

    res.json(result);
  });

  //Update the user's scores
  app.put('/api/survey/updateScores', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/updateScores ======");
   
    console.log(req.body);
    const scores = req.body.scores;

    const result = await survey.updateScores(scores, req.user.id);

    console.log("result: ", result);

    res.json(result);
  });

  //Get the user's results 
  app.get('/api/survey/getResults', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/getResults ========");

    const result = await survey.getUserResults(req.user.id);
    
    console.log("result: ", result);
    
    res.json(result);
  });

}