const Browser = require('zombie');

const $ = require('jquery');
require('jsdom-global')();

Browser.localhost('example.com', 3000);

describe('DNS Table', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/#/dns', done);
  });

  describe('renders', function() {
    it('should mount', function() {
      browser.assert.success();
      browser.assert.element(".dns-table")
    })

    it('should contain table data', function(){
      browser.assert.element('.dns-table thead');
      browser.assert.elements('.dns-table tr', {atLeast: 1});
    })
  })

  describe('has checkable and selectable rows', function(){

    const firstRow = `.dns-table-row:first-of-type`;
    const firstCheckBox = `${firstRow} .table-checkbox`;
    const firstRowChecked = `${firstRow} checked`;
    const firstRowSelected = `${firstRow} checked`;

    describe('checking', function(){

      it('rows can be checked', function(){
        // check for a class toggle onClick

        browser.assert.elements(firstRowChecked, 0);
        browser.click(firstCheckBox);

        // shove onto call stack to await react re-render
        setTimeout(()=>{
          browser.assert.elements(firstRowChecked, 1);
        })

      })

      it("rows aren't selected when checked", function(){
        // check for a class toggle onClick

        browser.assert.elements(firstRowSelected, 0);
        browser.click(firstCheckBox);

        // shove onto call stack to await react re-render
        setTimeout(()=>{
          browser.assert.elements(firstRowSelected, 1);
        })

      })     
    })

    describe('selecting', function(){

      it('rows can be selected on click', function(){
        // check for a class toggle onClick

        browser.assert.elements(firstRowSelected, 0);
        browser.click(firstRow);

        // shove onto call stack to await react re-render
        setTimeout(()=>{
          browser.assert.elements(firstRowSelected, 1);
        })

      })    
    })


  })

});