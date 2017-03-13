const Browser = require('zombie');
const wait = require('./wait');

Browser.silent = true;

Browser.localhost('example.com', 3000);

describe('Login Form', function() {

  const browser = new Browser();

  const email = '.login-form input[name=Email]';
  const password = '.login-form input[name=Password]';
  const login = '.login-form input[type=Submit]';

  before(function(done) {
    browser.visit('/', done);
  });

  describe('renders', function() {
    it('should mount', function() {
      browser.assert.success();
      browser.assert.element(".login-form")
    })

    it('should contain email, password, and submit inputs', function(){
      browser.assert.element(email);
      browser.assert.element(password);
      browser.assert.element(login);
    })
  })

  describe('handles user input', function(){

    const valid = {email: 'zombie@underworld.dead', password: 'eat-the-living'}
    const invalid = {email: 'zomb@a', password: 'short'}

    const inputValidData = () => browser
      .fill('Email', valid.email)
      .fill('Password', valid.password)

    const inputInvalidData = () => browser
      .fill('Email', invalid.email)
      .fill('Password', invalid.password)

    it ('disables login button if fields are empty', function(){
      browser.assert.attribute(email, 'value', '')
      browser.assert.attribute(password, 'value', '')
      browser.assert.attribute(login, 'disabled', '');
    })

    it ('updates form values when input is changed', function(done){
      inputValidData();

      browser.assert.attribute(email, 
        'value', valid.email)
      browser.assert.attribute(password, 
        'value', valid.password)

      done()
    })

    it ('shows error messages and disables login button when invalid input is given', function(done){
      inputInvalidData();
      browser.click('.login-form input.submit');

      wait(
        () => true,
        () => {
          browser.assert.elements('.form-errors', 2);
          browser.assert.attribute(login, 'disabled', '');
          done();
        },
        0
      );
    });

    // need to listen for submit event
    it ('submits requests with valid input');

    it ('displays server authentication errors', function(done){
      inputInvalidData();

      browser.assert.attribute(email, 'value', valid.email)
      browser.assert.attribute(password, 'value', valid.password)
      browser.assert.attribute(login, 'disabled', undefined)

      browser.click(login);

      wait(
        () => {
          console.log(browser.html('.login-form'));
          return (browser.html('.form-errors').length > 0);
        },
        () => {
          browser.assert.elements('.form-errors', {atLeast: 1});
          done();
        },
        2000
      );

    })

  });

});


