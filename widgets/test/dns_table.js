const Browser = require('zombie');

const $ = require('jquery');
require('jsdom-global')();

Browser.localhost('example.com', 3000);

describe('DNS Table', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/#/dns', done);
  });

  it('should mount', function() {
    browser.assert.success();
    browser.assert.element(".dns-table")
  })

  it('should contain table data', function(){
    browser.assert.element('.dns-table thead');
    browser.assert.elements('.dns-table tr', {atLeast: 1});
  })

  describe('rows', function(){

    it('can be checked', function(){

      const firstRow = `.dns-table-row:first-of-type`;
      const firstCheckBox = `${firstRow} .table-checkbox`;
      const firstRowChecked = `${firstRow} checked`

      browser.assert.element(firstCheckBox);
      // browser.assert.elements(firstRowChecked, 0);
      browser.click(firstCheckBox);
      browser.assert.elements(firstRowChecked, 1);

    })

    it('can be selected', function(){

    })


  })

});