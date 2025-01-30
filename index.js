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

const path = require('path');
const TestRunner = require('./src/runner/testRunner');
const TestLoader = require('./src/runner/testLoader');
const { beforeAllTests, beforeTest, afterTest, afterAllTests } = require('./src/runner/setupHooks');
const { config, setConfig } = require('./src/config');

const runner = new TestRunner();

/**
 * Execute a test.
 * 
 * @param {string} description - The test description.
 * @param {Function} fn - The test function to execute.
 */
function test(description, fn) {
    const testFile = module.parent?.filename || 'unknown';
    runner.test(description, fn, testFile);
}

test.beforeTest = (fn) => { beforeTest(fn); };
test.beforeAllTests = (fn) => { beforeAllTests(fn); };
test.afterTest = (fn) => { afterTest(fn); };
test.afterAllTests = (fn) => { afterAllTests(fn); };

test.runTests = async () => {
    const testLoader = new TestLoader(config.testDirectory);
    testLoader.load();
    const testFiles = testLoader.getTestFiles();

    if (testFiles.length === 0) {
        console.error('No test files found.');
        return;
    }

    for (const testFile of testFiles) {
        try {
            require(testFile);
        } catch (error) {
            console.error(`Error loading test file: ${testFile}.`);
            console.error(error);
        }
    }

    runner.setReporter(config.reporter);
    await runner.runTests();
};

if (require.main === module) {
    (async () => {
        await test.runTests();
    })();
}

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

test.setReporter = (reporter) => {
    setConfig({ reporter });
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

module.exports = test;