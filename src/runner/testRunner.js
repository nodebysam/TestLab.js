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

const t = require('../t');
const { startTimer, stopTimer } = require('../utils');
const Reporter = require('../reporter');
const { beforeTest, beforeAllTests, afterTest, afterAllTests, getAllHooks } = require('./setupHooks');
const { config } = require('../config');

/**
 * Handles the test execution process.
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
        this.reporter = new Reporter();
    }

    /**
     * Adds a test to the test suite.
     * 
     * @param {string} description - The test description.
     * @param {Function} fn - The test function to execute.
     * @param {string} testFile - The file where the test is located.
     * @throws {Error} Throws an error if the test name already exists. 
     */
    test(description, fn, testFile) {
        this.tests.push({ description, fn, testFile });

        if (!this.testFiles.includes(testFile)) {
            this.testFiles.push(testFile);
        }

        if (!this.testDescriptions.includes(description)) {
            throw new Error(`A test with the description '${description}' already exists`);
        }

        this.testDescriptions.push(description);
    }

    /**
     * Runs the tests and reports the results.
     */
    async runTests() {
        const hooks = getAllHooks();

        if (hooks.beforeAllTestsHook) {
            await beforeAllTests(t);
        }

        for (const test of this.tests) {
            const { description, fn, testFile } = test;
            let testDescription = description;

            if (this.testFiles.length > 0) {
                const relativePath = testFile.replace(process.cwd(), '').replace(/^\/|\\/g, '').replace(/\.js$/, '');
                testDescription = `${relativePath} › ${description}`;
            }

            let executionTime = 0;
            let start;

            try {
                if (hooks.beforeAllTestsHook) {
                    await beforeAllTests(t);
                }

                start = startTimer();

                const testExecute = async () => {
                    if (fn.constructor.name === 'AsyncFunction') {
                        await fn(t);
                    } else {
                        fn(t);
                    }
                };

                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Test timed out')), this.timeout);
                });

                await Promise.race([testExecute(), timeoutPromise]);

                executionTime = stopTimer(start);
                this.reporter.handleTestResult(testDescription, true, '', executionTime);
            } catch (error) { 
                executionTime = executionTime || stopTimer(start);
                this.reporter.handleTestResult(testDescription, false, error.message, executionTime);
            }

            if (hooks.afterTestHook) {
                await afterTest(t);
            }
        }

        if (hooks.afterAllTestsHook) {
            await afterAllTests(t);
        }

        const totalTime = stopTimer(this.startTime);
        this.reporter.printSummary(totalTime);
    }
}

module.exports = TestRunner;