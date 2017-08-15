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

const getDriverInstance = () => new ChromeDriver();

function createWorld() {
	Object.assign(global, {
		driver: null,
		selenium,
		by: selenium.By,
		until: selenium.until,
		expect,
		assert,
		page: global.page || {},
		shared: global.shared || {}
	});
}

const importSupportObjects = () => {
	if (global.sharedObjectPaths && global.sharedObjectPaths.length) {
		let allDirs = {};
		global.sharedObjectPaths.forEach(itemPath => {
			if (fs.existsSync(itemPath)) {
				let dir = requireDir(itemPath, {camelcase: true});
				merge(allDirs, dir);
			}
		});
		if (Object.keys(allDirs).length) {
			global.shared = allDirs;
		}
	}
	if (global.pageObjectPath && fs.existsSync(global.pageObjectPath)) {
		global.page = requireDir(global.pageObjectPath, {camelcase: true});
	}
	global.driverUtils = require("./helpers.js");
};

module.exports = function () {
	createWorld();
	importSupportObjects();
	// this.World must be set!
	this.World = createWorld;
	this.setDefaultTimeout(global.DEFAULT_TIMEOUT);
	this.registerHandler("BeforeScenario", () => {
		if (!global.driver) {
			global.driver = getDriverInstance();
		}
	});
	this.registerHandler("AfterFeatures", (features, done) => {
		const cucumberReportPath = path.resolve(
			global.reportsPath, `report_${global.testStartTimeString}.json`
		);
		if (global.reportsPath && fs.existsSync(global.reportsPath)) {
			const reportOptions = {
				theme: "bootstrap",
				jsonFile: cucumberReportPath,
				output: path.resolve(global.reportsPath, `report_${global.testStartTimeString}.html`),
				reportSuiteAsScenarios: true,
				launchReport: (!global.disableLaunchReport),
				ignoreBadJsonFile: true
			};
			reporter.generate(reportOptions);
			const reportRaw = fs.readFileSync(cucumberReportPath).toString().trim();
			const xmlReport = cucumberJunit(reportRaw);
			const junitOutputPath = path.resolve(
				global.junitPath, `junit-report_${global.testStartTimeString}.xml`
			);
			fs.writeFileSync(junitOutputPath, xmlReport);
		}
		done();
	});
	this.After(scenario => driver.close().then(() => driver.quit()));
};
