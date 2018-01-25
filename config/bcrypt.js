
const bcrypt = require('bcrypt-nodejs');

console.log('./config/bcrypt.js - loaded ================================')

module.exports = {
  generateHash: function (password) {
    console.log('./config/bcrypt - generateHash =============================');
    console.log('password: ', password);

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  
  validatePassword: function (password, user) {
    console.log('./config/bcrypt - validatePassword =========================');
    console.log('user: ', user);
    console.log('password: ', password);
    
    return bcrypt.compareSync(password, user);
  }
}



