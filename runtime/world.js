"use strict";

const fs = require("fs-plus");
const path = require("path");
const requireDir = require("require-dir");
const merge = require("merge");
const selenium = require("selenium-webdriver");
const expect = require("chai").expect;
const assert = require("chai").assert;
const reporter = require("cucumber-html-reporter");
const cucumberJunit = require("cucumber-junit");
const ChromeDriver = require("./chromeDriver");

function getDriverInstance() {
	return new ChromeDriver();
}

function createWorld() {
	Object.assign(global, {
		driver: null,
		selenium: selenium,
		by: selenium.By,
		until: selenium.until,
		expect: expect,
		assert: assert,
		page: global.page || {},
		shared: global.shared || {}
	});
}

function importSupportObjects() {
	if (global.sharedObjectPaths && global.sharedObjectPaths.length) {
		var allDirs = {};
		global.sharedObjectPaths.forEach(function (itemPath) {
			if (fs.existsSync(itemPath)) {
				var dir = requireDir(itemPath, { camelcase: true });
				merge(allDirs, dir);
			}
		});
		if (Object.keys(allDirs).length > 0) {

			// expose globally
			global.shared = allDirs;
		}
	}

	if (global.pageObjectPath && fs.existsSync(global.pageObjectPath)) {
		global.page = requireDir(global.pageObjectPath, { camelcase: true });
	}

	global.helpers = require("../runtime/helpers.js");
}

module.exports = function () {
	createWorld();
	importSupportObjects();

	// this.World must be set!
	this.World = createWorld;

	this.setDefaultTimeout(global.DEFAULT_TIMEOUT);

	this.registerHandler("BeforeScenario", function() {
		if (!global.driver) {
			global.driver = getDriverInstance();
		}
	});

	this.registerHandler("AfterFeatures", function (features, done) {
		var cucumberReportPath = path.resolve(
			global.reportsPath, `report_${global.testStartTimeString}.json`
		);

		if (global.reportsPath && fs.existsSync(global.reportsPath)) {
			var reportOptions = {
				theme: "bootstrap",
				jsonFile: cucumberReportPath,
				output: path.resolve(global.reportsPath, `report_${global.testStartTimeString}.html`),
				reportSuiteAsScenarios: true,
				launchReport: (!global.disableLaunchReport),
				ignoreBadJsonFile: true
			};

			reporter.generate(reportOptions);

			var reportRaw = fs.readFileSync(cucumberReportPath).toString().trim();
			var xmlReport = cucumberJunit(reportRaw);
			var junitOutputPath = path.resolve(
				global.junitPath, `junit-report_${global.testStartTimeString}.xml`
			);

			fs.writeFileSync(junitOutputPath, xmlReport);
		}

		done();
	});

	this.After(function (scenario) {
		return driver.close().then(function() {
			return driver.quit();
		});
	});
};
