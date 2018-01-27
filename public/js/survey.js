
// Domain for api calls
const domain = 'https://kintsukuroi.herokuapp.com';
//const domain = 'localhost:8080';


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
  $('#question-container').empty();

  $.ajax({
    method: 'PUT', 
    url: `${domain}/api/survey/initSurvey`,
    success: getQuestions
  });  
}

function getQuestions(res) {
  scores.f1 = scores.f2 = scores.f3 = scores.f4 = 0;

  $.ajax({
    method: 'GET',
    url: `${domain}/api/survey/getQuestions`,
    success: showQuestions
  });
}

function showQuestions(questions) {
  console.log(questions);

  if (questions.length < 1) {
    console.log('Question length less than 1');
    return endSurvey();
  }

  surveyQuestions = questions;

  showNextQuestion(surveyQuestions);
}

function showNextQuestion(questions, i = 0) {

  console.log('questions: ', questions);
  console.log('idx: ', i);

  if (i >= questions.length) {
    return getMoreQuestions();
  }

  $('#question-container').empty();

  const question = $(`<h4 id="question">`).text(questions[i].question);
  $(question).attr('data-idx', i);
  $(question).attr('data-field', questions[i].field);

  $('#question-container')
    .append(question)
    .append( buildBtn(true) )
    .append( buildBtn(false) );

  $('#question-container').removeClass('scale-out');
}

function buildBtn(bool) {
  const link = $(`<a class="waves-effect waves-light btn-large">`);
  $(link).attr('id', `${bool ? 'true-btn' : 'false-btn'}`);

  const icon = $(`<i class="material-icons left"></i>`);
  $(icon).text( (bool ? 'thumb_up' : 'thumb_down') );

  return $(link).append( icon ).append( (bool ? 'True' : 'False') );
}

function trueAnswer(e) {
  e.preventDefault();

  $('#question-container').addClass('scale-out');

  let field = `f${$('#question').attr('data-field')}`;
  scores[field] += 10;

  let idx = parseInt( $('#question').attr('data-idx') );

  setTimeout( function () {
    showNextQuestion(surveyQuestions, idx + 1);
  }, 500);
  
}

function falseAnswer(e) {
  e.preventDefault();

  $('#question-container').addClass("scale-out");

  let idx = parseInt( $('#question').attr('data-idx') );

  setTimeout( function () {
    showNextQuestion(surveyQuestions, idx + 1);
  }, 500);
}

function getMoreQuestions() {
  console.log('scores: ', scores);

  $.ajax({
    method: 'PUT',
    url: `${domain}/api/survey/updateThreshold`
  }).done(function() {
    $.ajax({
      method: 'PUT',
      url: `${domain}/api/survey/updateScores`,
      data: scores,
      success: getQuestions
    });
  })

}

function endSurvey() {

  console.log("end survey fired");

  $('#question-container').empty();
  $('#question-container').append("Done");

  $.ajax({
    method: 'GET',
    url: `${domain}/api/survey/getResults`
  }).then( function(res) {
    console.log("Then after survey results");
    console.log("res: ", res);

    let specId;
    
    if (res === "Anxiety") {
      specId = 1;
    } else if (res === "Depression"){
      specId = 2;
    } else if (res === "ADHD") {
      specId = 3;
    } else {
      specId = 4;
    }
  
    window.location.replace(`https://kintsukuroi.herokuapp.com/resources/${specId}`);
  });
}
