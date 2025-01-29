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

const { formatNumber, startTimer, stopTimer, writeFile } = require('../utils');
const path = require('path');

/**
 * This module handles messaging to the console.
 * This includes writeReport method for writing the results to JSON.
 */
class JsonReporter {
    /**
     * Creates a new instance of ConsoleReporter.
     */
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.testResults = [];
        this.startTime = startTimer();
    }

    /**
     * Handles the result of a test.
     * 
     * @param {string} testName - The name of the test.
     * @param {boolean} passed - Whether the test passed.
     * @param {string} message - The failure message, if any. 
     * @param {number} executionTime - The time taken for this test in milliseconds. 
     */
    handleTestResult(testName, passed, message, executionTime) {
        if (passed) {
            this.passed += 1;
            this.testResults.push({ testName, status: 'passed', message, executionTime });
            console.log(`\x1b[32m✔️ ${testName} \x1b[0m\x1b[36m(${executionTime.toFixed(2)}ms)\x1b[0m`);
        } else {
            this.failed += 1;
            this.testResults.push({ testName, status: 'failed', message, executionTime });
            console.log(`\x1b[31m❌ ${testName} \x1b[0m\x1b[36m(${executionTime.toFixed(2)}ms)\x1b[0m`);
            console.log(`\x1b[31m   ${message}\x1b[0m`);
        }
    }

    /**
     * Writes the test results to a JSON file.
     * 
     * @param {string} outputFile - The file path to save the JSON report.
     */
    writeReport(outputFile = 'testReport.json') {
        console.log('Generating JSON report...');

        const totalTime = stopTimer(this.startTime);

        const summary = {
            totalTests: formatNumber(this.testResults.length),
            passedTests: formatNumber(this.passed),
            failedTests: formatNumber(this.failed),
            totalTime,
            tests: this.testResults,
        };

        const outputPath = path.resolve(outputFile);
        writeFile(outputFile, JSON.stringify(summary, null, 2));
        console.log(`JSON report at '${outputFile}' has been generated.`);
    }

    /**
     * Prints the summary of the test results to the console.
     * 
     * @param {number} executionTime - The total test runs execution time in milliseconds.
     */
    printSummary(executionTime) {
        console.log('\n\x1b[35mTest Summary:\x1b[0m');
        console.log(`   \x1b[32m️️️✔️  ${formatNumber(this.passed)} Passed\x1b[0m`);
        console.log(`   \x1b[31m❌  ${formatNumber(this.failed)} Failed\x1b[0m`);
        console.log(`   \n\x1b[0m\x1b[36mTotal Execution Time:  ${executionTime.toFixed(2)}ms\x1b[0m`);
    }
}

module.exports = JsonReporter;