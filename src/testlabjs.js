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

const { testDirectory, debug } = require('.');
const TestRunner = require('./runner/testRunner');
const TestLoader = require('./runner/testLoader');
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

/**
 * Set the test directory.
 * 
 * @param {string} testDirectory - The test directory.
 */
const setTestDirectory = (testDirectory) => {
    setConfig({ testDirectory });
};

/**
 * Set the test execution timeout.
 * 
 * @param {number} timeout - The test timeout in milliseconds.
 */
const setTimeout = (timeout) => {
    setConfig({ timeout });
};

/**
 * Set the debug flag.
 * 
 * @param {boolean} debug - True to enable debugging, false to disable debug.
 */
const setDebug = (debug) => {
    setConfig({ debug });
};

/**
 * Get the test directory.
 * 
 * @returns {string} - The test directory.
 */
const testDirectory = () => {
    return config.testDirectory;
};

/**
 * Get the test execution timeout.
 * 
 * @returns {number} The test timeout in milliseconds.
 */
const timeout = () => {
    return config.timeout;
};

/**
 * Get the debug flag.
 * 
 * @returns {boolean} True if debugging is enabled, false if debugging is disabled.
 */
const debug = () => {
    return config.debug;
};

/**
 * Starts the test execution process.
 */
const runTests = async () => {
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

module.exports = {
    test,
    setTestDirectory,
    setTimeout,
    setDebug,
    testDirectory,
    timeout,
    debug,
    runTests,
};