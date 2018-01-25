const connection = require('./connection.js');

//Use this function to get new questions, by passing the current threshold to it
module.exports.getQuestions = function(threshold) {

  return new Promise( function(resolve, reject) {
    connection.query('SELECT * FROM questions WHERE threshold = '+threshold, function(error, results) {
      if (error) reject(error);

      resolve(results);

    });

  });

}

// This can be used to set the surveyState threshold for the user, which controls which question set is returned
module.exports.setThreshold = function(newThreshold, id) {
  
  return new Promise( function(resolve, reject) {
    connection.query('UPDATE users SET surveyState = "'+ newThreshold + '" WHERE id = "'+id+'"', function(error, results) {
      if (error) reject(error);

      resolve(results);

    });
    
  })
  
}

