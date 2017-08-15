module.exports = {
	loadPage: function(url, waitInSeconds) {
		var timeout = (waitInSeconds) ? (waitInSeconds * 1000) : DEFAULT_TIMEOUT;
		return driver.get(url).then(function() {
			return driver.wait(until.elementLocated(by.css('body')), timeout);
		});
	},
	getElementsContainingText: function(cssSelector, textToMatch) {
		return driver.findElements(
			by.js(
				(s, c) => document.querySelectorAll(s).filter(el => el.innerText === c),
				cssSelector,
				textToMatch
			)
		);
	}
};
