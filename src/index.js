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
const TestRunner = require('./runner/testRunner');
const TestLoader = require('./runner/testLoader');
const { beforeAllTests, beforeTest, afterTest, afterAllTests } = require('./runner/setupHooks');
const { config, setConfig } = require('./config');

const runner = new TestRunner();

/**
 * Execute a test.
 * 
 * @param {string} description - The test description.
 * @param {Function} fn - The test function to execute.
 */
const test = (description, fn) => {
    const testFile = module.parent?.filename || 'unknown';
    runner.test(description, fn, testFile);
};

test.beforeTest = (fn) => { beforeTest(fn); };
test.beforeAllTests = (fn) => { beforeAllTests(fn); }
test.afterTest = (fn) => { afterTest(fn); }
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

    await runner.runTests();
};

test.setTestDirectory = (testDirectory) => {
    setConfig({ testDirectory });
};

test.setTimeout = (timeout) => {
    setConfig({ timeout });
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

test.debug = () => {
    return config.debug;
};

if (require.main === module) {
    (async () => { await test.runTests(); })();
}

module.exports = test;