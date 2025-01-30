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

const t = require('../testlabjs');
const { startTimer, stopTimer } = require('../utils');
const ConsoleReporter = require('../reporter/consoleReporter');
const JsonReporter = require('../reporter/jsonReporter');
const { beforeTest, afterTest, beforeAllTests, afterAllTests } = require('../runner/setupHooks');
const { config } = require('../config');
const { Reporter } = require('../types');

/**
 * This module is reponsible for running the test execution process.
 */
class TestRunner {
    /**
     * Creates a new instance of TestRunner.
     */
    constructor() {
        this.tests = [];
        this.startTime = startTimer();
        this.testFiles = [];
        this.testDescriptions = [];
        this.timeout = config.timeout || 5000;
        this.reporter = config.reporter === Reporter.CONSOLE ? new ConsoleReporter() : new JsonReporter();
    }

    /**
     * Adds a test to the test suite.
     * 
     * @param {string} description - The description of the test.
     * @param {Function} testFn - The test function to run.
     * @param {string} testFile - The file where the test is located.
     * @throws {Error} Throws an error if the test name already exists.
     */
    test(description, testFn, testFile) {
        this.tests.push({ description, testFn, testFile  });

        if (!this.testFiles.includes(testFile)) {
            this.testFiles.push(testFile);
        }

        if (this.testDescriptions.includes(description)) {
            throw new Error(`A test with the description '${description}' already exists`);
        }

        this.testDescriptions.push(description);
    }

    /**
     * Runs the tests and reports the results.
     */
    async runTests() {
        let passed = 0;
        let failed = 0;
   
        if (beforeAllTests) {
            await beforeAllTests(t);
        }
        
        for (let test of this.tests) {
            const { description, testFn, testFile } = test;
            let testDescription = description;

            if (this.testFiles.length > 1) {
                const relativePath = testFile.replace(process.cwd(), '').replace(/^\/|\\/g, '').replace(/\.js$/, '');
                testDescription = `${relativePath} › ${description}`;
            }

            let executionTime = 0;
            let start;

            try {
                if (beforeTest) {
                    await beforeTest(t);
                }

                start = startTimer();

                const execute = async () => {
                    if (testFn.constructor.name === 'AsyncFunction') {
                        await testFn(t);
                    } else {
                        testFn(t);
                    }
                };

                const timeoutPromise = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Test timed out')), this.timeout)
                );

                await Promise.race([execute(), timeoutPromise]);

                executionTime = stopTimer(start);
                this.reporter.handleTestResult(testDescription, true, '', executionTime);
                passed++;
            } catch (error) {
                executionTime = executionTime || stopTimer(start);
                this.reporter.handleTestResult(testDescription, false, error.message, executionTime);
                failed++;
            }

            if (afterTest) {
                await afterTest(t);
            }
        }

        if (afterAllTests) {
            await afterAllTests(t);
        }

        const totalTime = stopTimer(this.startTime);
        this.reporter.printSummary(totalTime);

        return { passed, failed };
    }

    /**
     * Set the reporter type.
     * 
     * @param {string} reporterType - The reporter type to set.
     */
    setReporter(reporterType) {
        if (reporterType === 'json') {
            this.reporter = new JsonReporter();
        } else {
            this.reporter = new ConsoleReporter();
        }
    }

    /**
     * Set the test execution timeout in milliseconds.
     * 
     * @param {number} timeout - The test execution timeout in milliseconds.
     */
    setTimeout(timeout) {
        if (typeof timeout !== 'number') {
            throw new Error(`Timeout must be a number: ${timeout}`);
        }

        this.timeout = timeout;
    }

    /**
     * Set the array of tests to execute.
     * 
     * @param {string[]} tests - An array of tests to execute. 
     */
    setTests(tests) {
        if (!Array.isArray(tests)) {
            throw new Error(`tests must be an array`);
        }

        this.tests = tests;
    }
}

module.exports = TestRunner;