
const orm = require('../models/orm');


module.exports.initializeSurvey = async function(id) {
  const setThreshold = await orm.setThreshold(0, id).catch(logError);

  const fields = { f1: 0, f2: 0, f3: 0, f4: 0 };

  const setFields = await orm.setFields(fields, id).catch(logError);

  return setFields;
}


module.exports.getNewQuestions = async function(id) {
  console.log('./controllers/survey.js - getNewQuestions ==================')
  const stateResult = await orm.getState(id).catch(logError);
  const userScores = await orm.getUserScores(id).catch(logError);
  var currQuestions = [];

  console.log('state: ', stateResult);

  const state = stateResult[0].survey_state;

  const questions = await orm.getQuestions(state).catch(logError);

  // Functionality to automatically exclude questions that do not meet the userscore thresholds for a field
  for (var i = 0; i < questions.length; i ++ ) {
    if (questions[i].threshold <= userScores[0].field1 && 
        questions[i].field === 1 && 
        userScores[0].field1 <= 50) {
      currQuestions.push(questions[i]);
    } else if (questions[i].threshold <= userScores[0].field2 
        && questions[i].field === 2 && 
        userScores[0].field2 <= 50) {
      currQuestions.push(questions[i]);
    } else if (questions[i].threshold <= userScores[0].field3 
        && questions[i].field === 3 && 
        userScores[0].field3 <= 50) {
      currQuestions.push(questions[i]);
    } else if (questions[i].threshold <= userScores[0].field4 
        && questions[i].field === 4 && 
        userScores[0].field4 <= 50) {
      currQuestions.push(questions[i]);
    }
  }
  return currQuestions;
}

module.exports.updateState = async function(id) {
  console.log('./controllers/survey.js - updateState ======================')
  const stateResult = await orm.getState(id).catch(logError);

  console.log('state: ', stateResult);
  
  const state = stateResult[0].survey_state;

  const newState = ( state === 0 ? 20 : state + 10 );

  const updatedState = await orm.setThreshold(newState, id).catch(logError);

  return updatedState;
}


module.exports.updateScores = async function(scores, id) {
  const newScores = await orm.updateFields(scores, id).catch(logError);

  return newScores;
}


module.exports.getUserResults = async function(id) {
  console.log("id: ", id);
  const scores = await orm.getUserScores(id).catch(logError);
  console.log("scores: ", scores);

  const fields = [
    scores[0].field1, 
    scores[0].field2, 
    scores[0].field3, 
    scores[0].field4 
  ];

  const specId = fields.indexOf( Math.max(...fields) ) + 1;

  console.log('fields: ', fields);
  console.log('Math.max(fields): ', Math.max(...fields));
  console.log('fields.indexOf( Math.max(fields) ): ', fields.indexOf( Math.max(...fields) ));
  console.log('id type: ', typeof specId);
  console.log('id: ', specId);
  
  const fieldName = await orm.getSpecialty(specId).catch(logError);

  console.log("fieldName: ", fieldName);

  return {
    scores: fields,
    chosenField: fieldName[0].spec_name
  }
}



function logError(err) {
  console.log("./controllers/survey.js - error caught");
  console.log(err);
}
