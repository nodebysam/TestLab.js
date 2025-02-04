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

const Runner = require('./runner');

const runner = new Runner();

/**
 * TestLab.JS
 * Entry point for test execution.
 */

/**
 * Confiure options.
 * 
 * @param {Object} options - Configuration options. 
 */
const configure = (options) => {
    runner.configure(options);
};

/**
 * Execute a function before any tests start executing.
 * 
 * @param {Function} fn - The function to execute before all tests start.
 */
const beforeAll = (fn) => {
    runner.beforeAll(fn);
};

/**
 * Execute a function before each single test.
 * 
 * @param {Function} fn - The function to ewecute before each test.
 */
const beforeEach = (fn) => {
    runner.beforeEach(fn);
};

/**
 * Execute a test.
 * 
 * @param {string} description - The test description.
 * @param {Function} fn - The test function to execute.
 */
const test = (description, fn) => {
    runner.addTest(description, fn);
};

/**
 * Execute a function after each test.
 * 
 * @param {Function} fn - The function to execute each each test.
 */
const afterEach = (fn) => {
    runner.afterEach(fn);
}

/**
 * Execute a function after all tests have completed.
 * 
 * @param {Function} fn - The function to execute after all tests have completed.
 */
const afterAll =(fn) => {
    runner.afterAll(fn);
}

/**
 * Start the test execution.
 */
const run = async () => {
    await runner.execute();
}

/**
 * Start the test execution from the command line tool.
 */
const runFromCLI = async () => {
    await runner.loadTestsFromDirectory();
    await runner.execute();
}

module.exports = {
    configure,
    beforeAll,
    beforeEach,
    test,
    afterEach,
    afterAll,
    run,
    runFromCLI,
};