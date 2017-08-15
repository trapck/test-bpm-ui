"use strict";

module.exports = function () {
	this.Given(
		/^I am on the Login page$/,
		() => driverUtils.loadPage(shared.commonConstants.baseUrl)
	);

	this.When(
		/^I enter correct login$/,
		() => driver.wait(until.elementsLocated(by.css(page.login.selectors.loginEdit)), DEFAULT_TIMEOUT)
			.then(() => driver.findElements(by.css(page.login.selectors.loginEdit)))
			.then(elements => {
				elements[0].sendKeys("");
				elements[0].sendKeys(shared.commonTestData.login);
				driverUtils.sleep();
			})
	);

	this.When(
		/^I enter correct password$/,
		() => driver.findElements(by.css(page.login.selectors.passwordEdit))
			.then(elements => {
				elements[0].sendKeys("");
				elements[0].sendKeys(shared.commonTestData.password);
				driverUtils.sleep();
			})
	);

	this.When(
		/^I click login button$/,
		() => driver.findElements(by.css(page.login.selectors.loginButton))
			.then(elements => elements[0].click())
	);

	this.Then(
		/^I should see start page$/,
		() => driver.wait(until.elementsLocated(by.css(shared.commonSelectors.centerPanelId)), DEFAULT_TIMEOUT)
			.then(() => driver.findElements(by.css(shared.commonSelectors.centerPanelId)))
			.then(elements => expect(elements.length).to.not.equal(0))
	);

	this.Given(
		/^I am on the Login page1$/,
		() => driverUtils.loadPage(shared.commonConstants.baseUrl)
	);

	this.When(
		/^I enter invalid login$/,
		() => driver.wait(until.elementsLocated(by.css(page.login.selectors.loginEdit)), DEFAULT_TIMEOUT)
			.then(() => driver.findElements(by.css(page.login.selectors.loginEdit)))
			.then(elements => {
				elements[0].sendKeys("");
				elements[0].sendKeys(shared.loginTestData.invalidLogin);
				driverUtils.sleep();
			})
	);

	this.When(
		/^I enter invalid password$/,
		() => driver.findElements(by.css(page.login.selectors.passwordEdit))
			.then(elements => {
				elements[0].sendKeys("");
				elements[0].sendKeys(shared.loginTestData.invalidPassword);
				driverUtils.sleep();
			})
	);

	this.When(
		/^I click login button1$/,
		() => driver.findElements(by.css(page.login.selectors.loginButton))
			.then(elements => elements[0].click())
	);

	this.Then(
		/^I should see warning message$/,
		() => driver.wait(until.elementsLocated(by.css(shared.commonSelectors.messageBoxClass)), DEFAULT_TIMEOUT)
			.then(() => driver.findElements(by.css(shared.commonSelectors.messageBoxClass)))
			.then(elements => expect(elements.length).to.not.equal(0))
	);
};
