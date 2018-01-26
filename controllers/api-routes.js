
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

  //Get the user's results 
  app.get('/api/survey/getResults', async function(req, res) {
    console.log("./controllers/api-routes.js - api/survey/getResults ========");

    const result = await survey.getUserScores("1");
    console.log("result: ", result);

    const fields = [
      result[0].field1, 
      result[0].field2, 
      result[0].field3, 
      result[0].field4 
    ];

    const id = fields.indexOf( Math.max(fields) );

    console.log('fields: ', fields);
    console.log('id: ', id);
    
    const fieldName = await survey.getSpecialty(id);

    res.json(result);
  });

}