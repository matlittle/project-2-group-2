/* Testing Dependencies */
const Nightmare = require('nightmare');
const expect    = require('chai').expect;

const nightmare = Nightmare( {show: true} );


/* Our Files */
const bcrypt = require('../config/bcrypt');



describe("Base Test", () => {

  it('Should be true', () => {
    expect(true).to.be.true;
  });

});


describe('Bcrypt', () => {

  it('Should be true', () => {
    expect(bcrypt.validatePassword("bacon", bcrypt.generateHash("bacon"))
      ).to.be.true;

    expect(bcrypt.validatePassword("#$(Vnser%4634 dwer", bcrypt.generateHash("#$(Vnser%4634 dwer"))
      ).to.be.true;
  });

  it('Should be false', () => {
    expect(bcrypt.validatePassword("hello", bcrypt.generateHash("bacon"))
      ).to.be.false;

    expect(bcrypt.validatePassword("foo", bcrypt.generateHash("bar"))
      ).to.be.false;
  });


});



/* describe("Loading google", function() {

    this.timeout('30s')

    let nightmare = null
    beforeEach(() => {
      nightmare = new Nightmare()
    });

    it("Should load the page", done => {
      nightmare
        .goto('https://www.google.com')
        .end()
        .then(function(result) { done() })
        .catch(done);
    });
  });
*/






