
const survey = require('./survey');

module.exports = function(app) {
  //Initialize scores and threshold to 0
  app.put('/api/survey/initSurvey', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/initSurvey ========");
    
    //const result = await survey.initializeSurvey(req.user.id);
    const result = await survey.initializeSurvey("1");

    console.log("result: ", result);

    res.json(result);
  });

  //Get the next round of questions
  app.get('/api/survey/getQuestions', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/getQuestions ======");
    
    //const result = await survey.getNewQuestions(req.user.id);
    const result = await survey.getNewQuestions("1");

    console.log("result: ", result);

    res.json(result);
  });

  //Update the current threshold
  app.put('/api/survey/updateThreshold', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/updateThreshold ===");
    
    //const result = await survey.updateState(req.user.id);
    const result = await survey.updateState("1");

    console.log("result: ", result);

    res.json(result);
  });

  //Update the user's scores
  app.put('/api/survey/updateScores', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/updateScores ======");
   
    //const scores = req.body.scores;
    const scores = { f1:10, f2: 10, f3: 10, f4: 10 };

   // const result = await survey.updateScores(scores, req.user.id);
    const result = await survey.updateScores(scores, "1");

    console.log("result: ", result);

    res.json(result);
  });

}