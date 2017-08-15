"use strict";

const sleep =  (timeout = global.COMMON_SLEEPT_IMEOUT) => driver.sleep(timeout);

const loadPage = (url, timeout = global.DEFAULT_TIMEOUT) => driver.get(url).then(() =>
	driver.wait(until.elementLocated(by.css("body")), timeout)
);

const getElementsContainingText = (cssSelector, textToMatch = "") => {
	return driver.findElements(
		by.js(
			(s, c) => document.querySelectorAll(s).filter(el => el.innerText === c),
			cssSelector,
			textToMatch
		)
	);
};

module.exports = {
	loadPage,
	getElementsContainingText,
	sleep
};
