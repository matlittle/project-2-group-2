
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

  console.log('state: ', stateResult);

  const state = stateResult[0].survey_state;

  const questions = await orm.getQuestions(state).catch(logError);

  return questions;
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
  const newScores = await orm.setFields(scores, id).catch(logError);

  return newScores;
}


module.exports.getUserResults = async function(id) {
  const scores = await orm.getUserScores(id).catch(logError);
  console.log("scores: ", scores);

  const fields = [
    scores[0].field1, 
    scores[0].field2, 
    scores[0].field3, 
    scores[0].field4 
  ];

  const id = fields.indexOf( Math.max(fields) ) + 1;

  console.log('fields: ', fields);
  console.log('id: ', id);
  
  const fieldName = await orm.getSpecialty(id).catch(logError);;

  return {
    scores: fields,
    chosenField: fieldName
  }
}



function logError(err) {
  console.log("./controllers/survey.js - error caught");
  console.log(err);
}
