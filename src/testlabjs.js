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

const TestRunner = require('./runner/testRunner');
const TestLoader = require('./runner/testLoader');
const { config, setConfig } = require('./config');
const { beforeTest, beforeAllTests, afterTest, afterAllTests } = require('./runner/setupHooks');

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
};

test.beforeTest = (fn) => { beforeTest(fn); };
test.beforeAllTests = (fn) => { beforeAllTests(fn); };
test.afterTest = (fn) => { afterTest(fn); };
test.afterAllTests = (fn) => { afterAllTests(fn); };

/**
 * Set the test directory.
 * 
 * @param {string} testDirectory - The test directory.
 */
test.setTestDirectory = (testDirectory) => {
    setConfig({ testDirectory });
};

/**
 * Set the test execution timeout.
 * 
 * @param {number} timeout - The test timeout in milliseconds.
 */
test.setTimeout = (timeout) => {
    setConfig({ timeout });
};

/**
 * Set the debug flag.
 * 
 * @param {boolean} debug - True to enable debugging, false to disable debug.
 */
test.setDebug = (debug) => {
    setConfig({ debug });
};

/**
 * Get the test directory.
 * 
 * @returns {string} - The test directory.
 */
test.testDirectory = () => {
    return config.testDirectory;
};

/**
 * Get the test execution timeout.
 * 
 * @returns {number} The test timeout in milliseconds.
 */
test.timeout = () => {
    return config.timeout;
};

/**
 * Get the debug flag.
 * 
 * @returns {boolean} True if debugging is enabled, false if debugging is disabled.
 */
test.debug = () => {
    return config.debug;
};

/**
 * Starts the test execution process.
 */
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
            console.error(`Error loading the test file: ${testFile}.`);
            console.error(error);
        }
    }

    await runner.runTests();
};

module.exports = test;