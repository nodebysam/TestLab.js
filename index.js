/**
 * TestLab.JS
 * "Test Smarter, Not Harder!"
 * 
 * Author: Sam Wilcox
 * Email: wilcox.sam@gmail.com
 * GitHub: https://github.com/nodebysam/TestLab.js
 * 
 * License: GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
 * For full license details, see the LICENSE file.
 */

const TestRunner = require('./src/runner/testRunner');
const { config, setConfig } = require('./src/config');
const execute = require('./src/executor');
const { beforeAllTests, beforeTest, afterAllTests, afterTest } = require('./src/runner/setupHooks');

const runner = new TestRunner();

/**
 * Execute a test.
 * 
 * @param {string} description - The test description (i.e., 'Two plus two should equal 4').
 * @param {Function} fn - The test function to execute. 
 */
let test = (description, fn) => {
    const testFile = module.parent?.filename || 'unknown';
    runner.test(description, fn, testFile);
};

test.beforeAllTests = (fn) => { beforeAllTests(fn); }
test.beforeTest = (fn) => { beforeTest(fn); }
test.afterTest = (fn) => { afterTest(fn); }
test.afterAllTests = (fn) => { afterAllTests(fn); }

test.setTestDirectory = (testDirectory) => {
    setConfig({ testDirectory });
};

test.setTimeout = (timeout) => {
    setConfig({ timeout });
};

test.setEnableReport = (enableReport) => {
    setConfig({ enableReport });
};

test.setReportPath = (reportPath) => {
    setConfig({ reportPath });
};

test.setReportFile = (reportFile) => {
    setConfig({ reportFile });
};

test.setDebug = (debug) => {
    setConfig({ debug });
};

test.testDirectory = () => {
    return config.testDirectory;
};

test.timeout = () => {
    return config.timeout;
};

test.reporter = () => {
    return config.reporter;
};

test.enableReport = () => {
    return config.enableReport;
};

test.reportPath = () => {
    return config.reportPath;
};

test.reportFile = () => {
    return config.reportFile;
};

test.debug = () => {
    return config.debug;
};

test.execute = async () => {
    await test.runTests();
};

if (require.main === module) {
    (async () => { await execute(runner); });
}

module.exports = test;