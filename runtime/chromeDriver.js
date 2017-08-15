"use strict";

const chromeDriver = require("chromedriver");
const selenium = require("selenium-webdriver");

const driver = function() {
	const driver = new selenium.Builder().withCapabilities({
		browserName: "chrome",
		javascriptEnabled: true,
		acceptSslCerts: true,
		chromeOptions: {
			args: ["start-maximized"]
		},
		path: chromeDriver.path
	}).build();
	driver.manage().window().maximize();
	return driver;
};

module.exports = driver;
