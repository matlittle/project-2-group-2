
// Domain for api calls
const domain = 'http://localhost:8080';

const scores = {
  f1: 0,
  f2: 0,
  f3: 0,
  f4: 0
}

var surveyQuestions;

// Main survey start button click
$('#questionnaire-start').click(initSurvey);
$(document).on('click', '#true-btn', trueAnswer);
$(document).on('click', '#false-btn', falseAnswer);


function initSurvey() {
  scores.f1 = scores.f2 = scores.f3 = scores.f4 = 0;

  $.ajax({
    method: 'PUT', 
    url: `${domain}/api/survey/initSurvey`,
    success: getQuestions
  });  
}

function getQuestions(res) {
  $.ajax({
    method: 'GET',
    url: `${domain}/api/survey/getQuestions`,
    success: showQuestions
  });
}

function showQuestions(questions) {
  console.log(questions);
  var surveyQuestions = questions;

  if (questions.length < 1) {
    return endSurvey();
  }

  showNextQuestion(surveyQuestions);
}

function showNextQuestion(questions, i = 0) {
  if (i >= questions.length) {
    return getMoreQuestions();
  }

  $('#question-container').empty();

  const question = $(`<h4 id="question">`).text(questions[i].question);
  $(question).attr('data-idx', i);
  $(question).attr('data-field', question[i].field);

  $('#question-container')
    .append(`<h1>Here's your questionnaire!</h1>`)
    .append('<br>')
    .append(question)
    .append( buildBtn(true) )
    .append( buildBtn(false) );
}

function buildBtn(bool) {
  const link = $(`<a class="waves-effect waves-light btn-large">`);
  $(link).attr('id', `data-${bool ? 'true-btn' : 'false-btn'}`);

  const icon = $(`<i class="material-icons left"></i>`);
  $(icon).text( (bool ? 'thumb_up' : 'thumb_down') );

  return $(link).append( icon ).append( (bool ? 'True' : 'False') );
}


function trueAnswer(e) {
  e.preventDefault();

  let field = `f${$('#question').attr('data-field')}`;
  scores.field += 10;

  showNextQuestion(surveyQuestions, parseInt($(this).attr('data-idx')) );
}


function falseAnswer(e) {
  e.preventDefault();

  showNextQuestion(surveyQuestions, parseInt($(this).attr('data-idx')) );
}






/* 
  <div id="question-container" class="col s12 m8 push-m2 l8 push-l2">
    <h1>Here's your questionnaire!</h1>
    <br>
    <h4 id="question">This is a question!</h4>
    <a class="waves-effect waves-light btn-large"><i class="material-icons left">thumb_down</i>False</a>
    <a class="waves-effect waves-light btn-large"><i class="material-icons left">thumb_up</i>True</a>
  </div> 
*/
