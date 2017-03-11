var Browser = require('zombie');


Browser.localhost('localhost', 8080);
const browser = new Browser();


describe("testing with zombie", function() {

    it("should have defined headless browser", function(next){
        expect(typeof browser != "undefined").toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should visit the site and see the login form", function(next) {
        browser.visit(url, function(err) {
            expect(browser.success).toBe(true);
            expect(browser.query("#middle")).toBeDefined();
            next();
        })
    });

});