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

const { formatNumber } = require('./utils');

/**
 * Reports test results to the console.
 */
class Reporter {
    /**
     * Creates a new instance of Reporter.
     */
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.testResults = [];
    }

    /**
     * Handles the test result.
     * 
     * @param {string} description - The test description.
     * @param {boolean} passed - True if passed, false if failed.
     * @param {string} message - The failure message, if any.
     * @param {number} executionTime - The time taken for this test in milliseconds.
     */
    handleTestResult(description, passed, message, executionTime) {
        if (passed) {
            this.passed += 1;
            this.testResults.push({ description, status: 'passed', message, executionTime });
            console.log(`\x1b[32m✔️  ${description} \x1b[0m\x1b[36m(${executionTime.toFixed(2)}ms)\x1b[0m`);
        } else {
            this.failed += 1;
            this.testResults.push({ description, status: 'failed', message, executionTime });
            console.log(`\x1b[31m❌  ${description} \x1b[0m\x1b[36m(${executionTime.toFixed(2)}ms)\x1b[0m`);
            console.log(`\x1b[31m   ${message}\x1b[0m`);
        }
    }

    /**
     * Prints the summary of the test results to the console.
     * 
     * @param {number} executionTime - The total test runs execute time in milliseconds.
     */
    printSummary(executionTime) {
        console.log('\n\x1b[35mTest Summary:\x1b[0m');

        const passedStr = `${formatNumber(this.passed)}`.padStart(3, ' ');
        const failedStr = `${formatNumber(this.failed)}`.padStart(2, ' ');
    
        console.log(`   \x1b[32m✔️  ${passedStr} Passed\x1b[0m`);
        console.log(`   \x1b[31m❌  ${failedStr} Failed\x1b[0m`);
        console.log(`   \n\x1b[0m\x1b[36mTotal Execution Time:  ${executionTime.toFixed(2)}ms\x1b[0m`);
    }
}

module.exports = Reporter;