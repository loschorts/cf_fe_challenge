const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000

Browser.localhost('example.com', 3000);

describe('application', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/', done);
  });

  describe('should mount', function() {

    it('should be successful', function() {
      browser.assert.success();
    });  

    it('should mount the React components', function(){

    });

  });

  describe('contains the proper layout', function() {

    it('should contain 3 containers', function() {
      browser.assert.element('#left');
      browser.assert.element('#middle');
      browser.assert.element('#right');
    });

  });

});