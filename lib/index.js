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

const Assertion = require('./assertion');
const Runner = require('./runner');

/**
 * TestLab.JS
 * Entry point for test execution.
 */
class TestLabJS {
    /**
     * Creates a new instance of TestLabJS.
     */
    constructor() {
        this.runner = new Runner();
    }

    /**
     * Confiure options.
     * 
     * @param {Object} options - Configuration options. 
     */
    configure(options) {
        this.runner.configure(options);
    }

    /**
     * Execute a function before any tests start executing.
     * 
     * @param {Function} fn - The function to execute before all tests start.
     */
    beforeAll(fn) {
        this.runner.beforeAll(fn);
    }

    /**
     * Execute a function before each single test.
     * 
     * @param {Function} fn - The function to ewecute before each test.
     */
    beforeEach(fn) {
        this.runner.beforeEach(fn);
    }

    /**
     * Execute a test.
     * 
     * @param {string} description - The test description.
     * @param {Function} fn - The test function to execute.
     */
    test(description, fn) {
        this.runner.addTest(description, fn);
    }

    /**
     * Execute a function after each test.
     * 
     * @param {Function} fn - The function to execute each each test.
     */
    afterEach(fn) {
        this.runner.afterEach(fn);
    }

    /**
     * Execute a function after all tests have completed.
     * 
     * @param {Function} fn - The function to execute after all tests have completed.
     */
    afterAll(fn) {
        this.runner.afterAll(fn);
    }

    /**
     * Start the test execution.
     */
    async run() {
        await this.runner.execute();
    }

    /**
     * Start the test execution from the command line tool.
     */
    async runFromCLI() {
        await this.runner.loadTestsFromDirectory();
        await this.runner.execute();
    }
}

module.exports = TestLabJS;