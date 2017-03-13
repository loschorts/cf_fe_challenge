const Browser = require('zombie');
Browser.silent = true;

Browser.localhost('example.com', 3000);

describe('application', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/', done);
  });

  describe('should mount', function() {

    it('exist at the root URL', function() {
      browser.assert.success();
    });  

    it('should mount the React application', function(){
      browser.assert.element("#app")
    });

  });

  describe('is laid out properly', function() {

    it('should contain 3 containers', function() {
      browser.assert.element('#left');
      browser.assert.element('#middle');
      browser.assert.element('#right');
    });

    it('should have a nav bar, dns-table, and login form (going left to right)', function(){
      browser.assert.element("#left .nav-bar");
      browser.assert.element("#middle .dns-table");
      browser.assert.element("#right .login-form");
    });

  });

});