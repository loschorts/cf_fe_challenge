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

    const inputBadData = () => browser
      .fill('Email', invalid.email)
      .fill('Password', invalid.password)

    it ('disables login button if fields are empty', function(){
      browser.assert.attribute(email, 'value', '')
      browser.assert.attribute(password, 'value', '')
      browser.assert.attribute(login, 'disabled', '');
    })

    it ('updates form values when input is changed', function(done){
      inputValidData();

      browser.assert.attribute('.login-form input[name=Email]', 
        'value', 'zombie@underworld.dead')
      browser.assert.attribute('.login-form input[name=Password]', 
        'value', 'eat-the-living')

      done()
    })

    it ()

  });

});


      // wait(
      //   () => {
          
      //     const emailString = browser.html('.login-form input[name=Email]')
      //     const pwString = browser.html('.login-form input[name=Password]')

      //     return (
      //       (emailString.search(valid.email) !== -1) &&
      //       (pwString.search(valid.password) !== -1)
      //     )
      //   },
      //   () => {
      //     browser.assert.attribute('.login-form input[name=Email]', 
      //       'value', 'zombie@underworld.dead')
      //     browser.assert.attribute('.login-form input[name=Password]', 
      //       'value', 'eat-the-living')
      //     done();
      //   },
      //   0
      // );