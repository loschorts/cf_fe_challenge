var config = require('../../nightwatch.conf.js');

const firstRow = '.dns-table-row:first-of-type'
const firstCheckbox = `${firstRow} .table-checkbox`

const mount = b => {
	b.url('localhost:3000')
	b.waitForElementPresent('.dns-table')
}

const RowsAreCheckable = b => {

	mount(b);

	b.expect.element(firstRow).to.be.present;
	b.expect.element(`${firstRow}.checked`).not.to.be.present
	b.expect.element(`${firstRow}.selected`).not.to.be.present

	b.click(firstCheckbox)

	b.expect.element(`${firstRow}.checked`).to.be.present
	b.expect.element(`${firstRow}.selected`).not.to.be.present
}

const RowsAreSelectable = b => {

	mount(b);

	b.click(firstRow);

	b.expect.element(`${firstRow}.selected`).to.be.present
	b.expect.element(`${firstRow}.checked`).not.to.be.present
	b.end();
}

module.exports = {
  RowsAreCheckable,
  RowsAreSelectable
};