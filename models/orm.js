const connection = require('./connection.js');

//Use this function to return the current user's surveyState value
module.exports.getState = function(id) {
  return new Promise( function(resolve, reject) {
    connection.query('SELECT survey_state FROM users WHERE id = '+id, function(error, result) {
      if (error) reject (error);

      resolve(result);
    })
  })
}


//Use this function to get new questions, by passing the current threshold to it
module.exports.getQuestions = function(threshold) {

  return new Promise( function(resolve, reject) {
    connection.query('SELECT * FROM questions WHERE threshold = '+threshold, function(error, result) {
      if (error) reject(error);

      resolve(result);

    });
  });
}

// This can be used to set the surveyState threshold for the user, which controls which question set is returned
module.exports.setThreshold = function(newThreshold, id) {
  
  return new Promise( function(resolve, reject) {
    connection.query('UPDATE users SET survey_state = "'+ newThreshold + '" WHERE id = "'+id+'"', function(error, result) {
      if (error) reject(error);

      resolve(result);

    });
  }); 
}

// This is used to update the user's individual field scores, so we can filter questions by fields that apply to the user.  This function takes an object of the four fields scores from the user survey question batch, and the user id of the user taking the survey.
module.exports.setFields = function(fields, id) {

  const query = `UPDATE users SET field1 = field1+?, field2 = field2+?, field3 = field3+?, field4 = field4+? where id = ?`

  return new Promise( function(resolve, reject) {
    connection.query(query, [fields.f1, fields.f2, fields.f3, fields.f4, id], function(error, result) {
      if (error) reject (error);

      resolve(result);
    });
  });
}

module.exports.getUserScores = function(id) {

  return new Promise( function(resolve, reject) {
    connection.query('SELECT field1,field2,field3,field4 FROM users WHERE id ='+id, function(error, result) {
      if (error) reject (error);

      resolve(result);
    })
  })

}

module.exports.getSpecialty = function(id) {

  return new Promise( function(resolve, reject) {
    connection.query('SELECT spec_name FROM specialties WHERE spec_id='+id, function(error, result) {
      if (error) reject (error);

      resolve(result);
    })
  })
}

