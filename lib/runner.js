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
const { startTimer, stopTimer, formatNumber, checkForJsonConfigs, writeTestResultsToJson, getFullTestDirectory } = require('./util');

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
        this.started = null;
        this.testResults = [];
    }

    /**
     * Set the configuration options.
     * 
     * @param {Object} options - Configuration options.
     */
    configure(options) {
        const configs = checkForJsonConfigs();

        if (configs) {
            this.config = configs;
        } else {
            this.config = { ...this.config, ...options };
        }
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
        this.startTimer = startTimer();
        if (this.beforeAllFn) await this.beforeAllFn();
    
        console.log(`${Colors.GREEN}${figlet.textSync('TestLab.JS', { horizontalLayout: 'full' })}${Colors.DEFAULT}\n`);
        console.log(`${Colors.CYAN}Version:${Colors.DEFAULT} ${version}\n`);
        console.log(`${Colors.BLUE}TestLab.js${Colors.DEFAULT} - Running tests in directory: ${Colors.CYAN}${getFullTestDirectory(this.config)}${Colors.DEFAULT}\n`);

        const testRunner = async ({ description, fn }) => {
            let start = startTimer();
            if (this.beforeEachFn) await this.beforeEachFn(t);

            try {
                await Promise.race([
                    fn(t),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error(`Test timeout exceeded! [${this.config.timeout} ms]`)), this.config.timeout)
                    ),
                ]);

                this.passed++;
                const executionTime = stopTimer(start);
                this.handleTestResult(description, true, null, executionTime);

                this.testResults.push({
                    description,
                    result: 'passed',
                    executionTime: executionTime,
                });
            } catch (error) {
                this.failed++;
                const executionTime = stopTimer(start);
                this.handleTestResult(description, false, error.message, executionTime);

                this.testResults.push({
                    description,
                    result: 'failed',
                    executionTime,
                });
            }

            if (this.afterEachFn) await this.afterEachFn(t);

            this.total++;
        };
        
        if (this.config.parallel) {
            await Promise.allSettled(this.tests.map(testRunner));
        } else {
            for (const test of this.tests) {
                await testRunner(test);
            }
        }

        if (this.afterAllFn) await this.afterAllFn(t)
        
        const finalExecutionTime = stopTimer(this.startTimer);

        this.printSummary(this.passed, this.failed, finalExecutionTime, this.passed + this.failed);

        if (this.config.resultsToJsonFile) {
            writeTestResultsToJson(this.config, this.testResults, this.passed, this.failed, this.passed + this.failed, finalExecutionTime);
        }
    }

    /**
     * Loads the tests from the test directory.
     */
    async loadTestsFromDirectory() {
        let testFiles = [];

        if (this.config.usePattern) {
            const testPattern = this.config.testDirectory || './tests';
            testFiles = glob.sync(testPattern);
        } else {
            const testDirPath = path.join(process.cwd(), this.config.testDirectory);
            const fileList = fs.readdirSync(testDirPath);

            if (fileList && Array.isArray(fileList) && fileList.length > 0) {
                testFiles = fileList.filter(file => file.endsWith('.test.js')).map(file => path.join(testDirPath, file));
            }
        }

        if (testFiles.length === 0) {
            console.warn('⚠️ No test files found. Check your testDirectory setting.');
            return;
        }

        for (const file of testFiles) {
            if (this.config.debug) {
                console.log(`Loading test file: ${file}...`);
            }
                
            try {
                require(path.resolve(file));
            } catch (error) {
                console.error(`Failed to load test file: ${file}`);
                console.error(error);
            }
        }
    }

    /**
     * Handles the test result.
     * 
     * @param {string} testDescription - The test description.
     * @param {boolean} passed - True for passed, false for failed.  
     * @param {string} [message=''] - Error message if avail. 
     * @param {number} executionTime - The total execution time in ms. 
     */
    handleTestResult(testDescription, passed, message, executionTime) {
        console.log(`${passed ? '✅' : '❌'} ${passed ? Colors.GREEN : Colors.RED}${passed ? 'Passed: ' : 'Failed: '}${testDescription}${Colors.DEFAULT} (${Colors.BLUE}${executionTime.toFixed(2)} ms${Colors.DEFAULT})`);
        if (message) console.log(message);
    }

    /**
     * Prints the test execution summary to the console.
     * 
     * @param {number} totalPassed - The totel passes.
     * @param {number} totalFailed - The total fails.
     * @param {number} executionTime - The execution time for the whole execution in ms.
     * @param {number} totalTests - The total tests executed.
     */
    printSummary(totalPassed, totalFailed, executionTime, totalTests) {
        console.log(`\n${Colors.GREEN}${'-'.repeat(37)}${Colors.DEFAULT}`);
        console.log(`${Colors.CYAN}TestLab.js${Colors.DEFAULT} => ${Colors.BLUE}Test Execution Summary:${Colors.DEFAULT}`);
        console.log(`${Colors.GREEN}${'-'.repeat(37)}${Colors.DEFAULT}\n`);
        
        const passedStr = `${formatNumber(totalPassed)}`.padStart(2, ' ');
        const failedStr = `${formatNumber(totalFailed)}`.padStart(2, ' ');

        console.log(`   ${Colors.GREEN}✅ ${passedStr} Passed${Colors.DEFAULT}`);
        console.log(`   ${Colors.RED}❌ ${failedStr} Failed${Colors.DEFAULT}\n`);
        console.log(`   ${Colors.BLUE}Total Tests Executed: ${Colors.CYAN}${totalTests}${Colors.DEFAULT}`);
        console.log(`   ${Colors.BLUE}Total Execution Time: ${Colors.CYAN}${executionTime.toFixed(2)} ms${Colors.DEFAULT}`);
    }
}

module.exports = Runner;