var config = require('../../nightwatch.conf.js');

const setup = b => {
		b.url('localhost:3000')
}

const RootsToDNS = b => {
	setup(b)

	b.assert.urlContains('/#/dns')
	b.expect.element('.dns-table').to.be.present

	b.end()
}

const HashNavigationWorks = b => {
	setup(b)

	b.useXpath()
	b.click("//a[text()='Something Else']")
	b.useCss() 

	b.assert.urlContains('/#/a')

	b.end()

}

const NotFoundMessage = b => {
	b.url('localhost:3000/#/notfound')

	b.expect.element('body').text.to.contain("No route matches 'notfound'");

	b.end()
}

module.exports = {
	"Roots to /#/dns": RootsToDNS,
	"Hash-based navigation works": HashNavigationWorks,
	"Displays not found message for bad hash paths": NotFoundMessage
}