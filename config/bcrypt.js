
const bcrypt = require('bcrypt-nodejs');

console.log('./config/bcrypt.js - loaded ================================')
module.exports = {
  generateHash: function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },

  validatePassword: function (password, user) {
    return bcrypt.compareSync(password, user.password);
  }
}



