
const orm = require('../models/orm');


module.exports.initializeSurvey = async function(id) {
  const setThreshold = await orm.setThreshold(0, id).catch(logError);

  const fields = { f1: 0, f2: 0, f3: 0, f4: 0 };

  const setFields = await orm.setFields(fields, id).catch(logError);

  return setFields;
}


module.exports.getNewQuestions = async function(id) {
  const state = await orm.getState(id).catch(logError);

  const questions = await orm.getQuestions(state).catch(logError);

  return questions;
}


module.exports.updateState = async function(id) {
  const state = await orm.getState(id).catch(logError);

  const newState = ( state === 0 ? 20 : state + 10 );

  const updatedState = await orm.setThreshold(newState, id).catch(logError);

  return updatedState;
}


module.exports.updateScores = async function(scores, id) {
  const newScores = await orm.setFields(scores, id).catch(logError);

  return newScores;
}


function logError(err) {
  console.log("./controllers/survey.js - error caught");
  console.log(err);
}
