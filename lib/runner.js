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

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const config = require('./config');
const t = require('./t');
const figlet = require('figlet');
const { version } = require('../package.json');
const Colors = require('./colors');

/**
 * TestLabJS Test Runner
 * Runs the suite of tests.
 */
class Runner {
    /**
     * Creates a new instance of Runner.
     */
    constructor() {
        this.tests = [];
        this.beforeAllFn = null;
        this.beforeEachFn = null;
        this.afterEachFn = null;
        this.afterAllFn = null;
        this.config = config;
        this.passed = 0;
        this.failed = 0;
        this.total = 0;
    }

    /**
     * Set the configuration options.
     * 
     * @param {Object} options - Configuration options.
     */
    configure(options) {
        this.config = { ...this.config, ...options };
    }

    /**
     * Register the before all function.
     * 
     * @param {Function} fn - The function to execute before any tests start.
     */
    beforeAll(fn) {
        this.beforeAllFn = fn;
    }

    /**
     * Register the before each function.
     * 
     * @param {Function} fn - The function to execute before each test.
     */
    beforeEach(fn) {
        this.beforeEachFn = fn;
    }

    /**
     * Add a new test to the test suite.
     * 
     * @param {string} description - The test description.
     * @param {Function} fn - The test function to execute.
     */
    addTest(description, fn) {
        this.tests.push({ description, fn });
    }

    /**
     * Register the after each function.
     * 
     * @param {Function} fn - The function to execute after each test.
     */
    afterEach(fn) {
        this.afterEachFn = fn;
    }

    /**
     * Register the after all function.
     * 
     * @param {Function} fn - The function to execute after all tests have completed.
     */
    afterAll(fn) {
        this.afterAllFn = fn;
    }

    /**
     * Start the test execution.
     */
    async execute() {
        await this.loadTestsFromDirectory();

        if (this.beforeAllFn) await this.beforeAllFn();

        console.log(`${Colors.GREEN}${figlet.textSync('TestLab.JS', { horizontalLayout: 'full' })}${Colors.DEFAULT}\n`);
        console.log(`${Colors.CYAN}Version:${Colors.DEFAULT} ${version}\n`);
        console.log(`${Colors.BLUE}TestLab.js${Colors.DEFAULT} - Running tests in directory: ${Colors.CYAN}${this.config.testDirectory}${Colors.DEFAULT}\n`);
        
        for (const { description, fn} of this.tests) {
            if (this.beforeEachFn) await this.beforeEachFn(t);

            if (this.config.debug) {
                console.log(`Running: ${description}`);
            }

            try {
                await Promise.race([
                    fn(t),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error(`Test timeout exceeded! [${this.config.timeout}ms]`)), this.config.timeout)
                    ),
                ]);

                this.passed++;
                console.log(`✅ ${Colors.GREEN}Passed: ${description}${Colors.DEFAULT}`);
            } catch (error) {
                this.failed++;
                console.error(`❌ ${Colors.RED}Failed: ${description}${Colors.DEFAULT}`);
                console.error(error.message);
            }

            if (this.afterEachFn) await this.afterEachFn(t);

            this.total++;
        }

        if (this.afterAllFn) await this.afterAllFn(t)
    }

    /**
     * Loads the tests from the test directory.
     */
    async loadTestsFromDirectory() {
        const testPattern = this.config.testDirectory || './tests';
        const testFiles = glob.sync(testPattern);

        for (const file of testFiles) {
            if (config.debug) {
                console.log(`Loading test file: ${file}...`);
                require(path.resolve(file));
            }
        }
    }
}

module.exports = Runner;