module.exports = function () {

	this.Given(/^I am on the Login page$/, function () {
		return helpers.loadPage(page.login.url);
	});

	this.When(/^I enter correct login$/, function () {
		return driver.wait(until.elementsLocated(by.css(page.login.elements.loginEdit)), 20000).then(function() {
				return driver.findElements(by.css(page.login.elements.loginEdit));
			})
			.then(function (elements) {
				elements[0].sendKeys(shared.testData.username);
			});
	});

	this.Before({timeout: 60 * 1000}, function() {

	});

	this.When(/^I enter correct password$/, function () {
		return driver.wait(until.elementsLocated(by.css(page.login.elements.passEdit)), 100).then(function() {
				return driver.findElements(by.css(page.login.elements.passEdit));
			})
			.then(function (elements) {
				elements[0].sendKeys(shared.testData.password);
			});
	});

	this.When(/^I click login button$/, function () {
		return driver.wait(until.elementsLocated(by.css(page.login.elements.loginButton)), 100).then(function() {
				return driver.findElements(by.css(page.login.elements.loginButton));
			})
			.then(function (elements) {
				elements[0].click();
			});
	});

	this.Then(/^I should see start page$/, function () {
		return driver.wait(until.elementsLocated(by.css(page.login.elements.centerPanel)), 20000).then(function() {
				return driver.findElements(by.css(page.login.elements.centerPanel));
			})
			.then(function (elements) {
				expect(elements.length).to.not.equal(0);
			});
	});

	this.Given(/^I am on the Login page1$/, function () {
		return helpers.loadPage(page.login.url);
	});

	this.When(/^I enter incorrect login$/, function () {
		return driver.wait(until.elementsLocated(by.css(page.login.elements.loginEdit)), 20000).then(function() {
				return driver.findElements(by.css(page.login.elements.loginEdit));
			})
			.then(function (elements) {
				elements[0].sendKeys(shared.testData.incorrectUsername);
			});
	});

	this.When(/^I enter incorrect password$/, function () {
		return driver.wait(until.elementsLocated(by.css(page.login.elements.passEdit)), 100).then(function() {
				return driver.findElements(by.css(page.login.elements.passEdit));
			})
			.then(function (elements) {
				elements[0].sendKeys(shared.testData.incorrectPassword);
			});
	});

	this.When(/^I click login button1$/, function () {
		return driver.wait(until.elementsLocated(by.css(page.login.elements.loginButton)), 100).then(function() {
				return driver.findElements(by.css(page.login.elements.loginButton));
			})
			.then(function (elements) {
				elements[0].click();
			});
	});

	this.Then(/^I should see warning message$/, function () {
		return driver.wait(until.elementsLocated(by.css(page.login.elements.messageBox)), 20000).then(function() {
				return driver.findElements(by.css(page.login.elements.messageBox));
			})
			.then(function (elements) {
				expect(elements.length).to.not.equal(0);
			});
	});
};
