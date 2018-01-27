
const survey = require('./survey');

module.exports = function(app) {
  //Initialize scores and threshold to 0
  app.put('/api/survey/initSurvey', isLoggedIn, async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/initSurvey ========");

    console.log("req.user: ", req.user);
    
    const result = await survey.initializeSurvey(req.user[0].id);

    console.log("result: ", result);

    res.status(200).json(result);
  });

  //Get the next round of questions
  app.get('/api/survey/getQuestions', isLoggedIn, async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/getQuestions ======");

    console.log("req.user: ", req.user);
    
    const result = await survey.getNewQuestions(req.user[0].id);

    console.log("result: ", result);

    res.status(200).json(result);
  });

  //Update the current threshold
  app.put('/api/survey/updateThreshold', isLoggedIn, async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/updateThreshold ===");

    console.log("req.user: ", req.user);
    
    const result = await survey.updateState(req.user[0].id);

    console.log("result: ", result);

    res.status(200).json(result);
  });

  //Update the user's scores
  app.put('/api/survey/updateScores', isLoggedIn, async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/updateScores ======");
   
    console.log(req.body);
    const scores = req.body;

    const result = await survey.updateScores(scores, req.user[0].id);

    console.log("result: ", result);

    res.status(200).json(result);
  });

  //Get the user's results 
  app.get('/api/survey/getResults', isLoggedIn, async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/getResults ========");

    const result = await survey.getUserResults(req.user[0].id);
    
    console.log("result: ", result);
    
    res.status(200).json(result[0].spec_name);
  });

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}
