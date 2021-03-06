"use strict";

const fs = require("fs-plus");
const path = require("path");
const program = require("commander");
const pjson = require("./package.json");
const cucumber = require("cucumber");
const utils = require("./shared-objects/common-utils");


const collectPaths = (value, paths) => {
	paths.push(value);
	return paths;
};

const coerceInt = (value, defaultValue) => {
	const int = parseInt(value);
	return typeof int == "number" ? int :defaultValue;
};

const config = require(path.resolve(process.cwd(), "test.config.json"));

program
	.version(pjson.version)
	.description(pjson.description)
	.option(
		"-s, --steps <path>",
		"path to step definitions. defaults to " + config.step_def_dir,
		config.step_def_dir
	)
	.option(
		"-p, --pageObjects <path>",
		"path to page objects. defaults to " + config.page_obj_dir,
		config.page_obj_dir
	)
	.option("-o, --sharedObjects [paths]",
		"path to shared objects (repeatable). defaults to " + config.shared_obj_dir,
		collectPaths,
		[config.shared_obj_dir]
	)
	.option(
		"-b, --browser <path>",
		"name of browser to use. defaults to " + config.default_browser,
		config.default_browser
	)
	.option(
		"-r, --reports <path>",
		"output path to save reports. defaults to " + config.reports_dir,
		config.reports_dir
	)
	.option(
		"-d, --disableLaunchReport [optional]",
		"Disables the auto opening the browser with test report"
	)
	.option(
		"-j, --junit <path>",
		"output path to save junit-report.xml defaults to " + config.reports_dir
	)
	.option(
		"-t, --tags <tagName>",
		"name of tag to run"
	)
	.option(
		"-f, --featureFile <path>",
		"a specific feature file to run"
	)
	.option(
		"-x, --timeOut <n>",
		"steps definition timeout in milliseconds. defaults to " + config.timeout,
		coerceInt,
		config.timeout
	)
	.parse(process.argv);

global.browserName = program.browser;
global.pageObjectPath = path.resolve(program.pageObjects);
global.reportsPath = path.resolve(program.reports);

if (!fs.existsSync(program.reports)){
	fs.makeTreeSync(program.reports);
}

global.disableLaunchReport = program.disableLaunchReport;
global.junitPath = path.resolve(program.junit || program.reports);
global.DEFAULT_TIMEOUT = config.timeout;
global.COMMON_SLEEPT_IMEOUT = config.commonSleepTimeout;
global.sharedObjectPaths = program.sharedObjects.map(function(item) {
	return path.resolve(item);
});
global.testStartTime = new Date();
global.testStartTimeString = utils.getDateTimeString(global.testStartTime);

process.argv.splice(2, 100);

if (program.featureFile) {
	process.argv.push(program.featureFile);
}

process.argv.push("-f");
process.argv.push("pretty");
process.argv.push("-f");
process.argv.push("json:" +
	path.resolve(__dirname, global.reportsPath, `report_${global.testStartTimeString}.json`)
);
process.argv.push("-r");
process.argv.push(path.resolve(__dirname, "runtime/world.js"));
process.argv.push("-r");
process.argv.push(path.resolve(program.steps));
if (program.tags) {
	process.argv.push("-t");
	process.argv.push(program.tags);
}
process.argv.push("-S");

const cucumberCli = cucumber.Cli(process.argv);
global.cucumber = cucumber;
cucumberCli.run(succeeded => {
	const code = succeeded ? 0 : 1;
	const exitNow = () => process.exit(code);
	if (process.stdout.write("")) {
		exitNow();
	} else {
		process.stdout.on("drain", exitNow);
	}
});
