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

const TestLoader = require('../src/runner/testLoader');
const { config } = require('../src/config');

/**
 * Executes the tests.
 * 
 * @param {TestRunner} - The test runner instance.
 */
const execute = async (runner) => {
    const testLoader = new TestLoader(config.testDirectory);
    testLoader.load();
    const testFiles = testLoader.getTestFiles();

    if (testFiles.length === 0) {
        console.error('No tests files found.');
        return;
    }

    for (const testFile of testFiles) {
        try {

        } catch (error) {
            console.error(`Error loading test file: ${testFile}.`);
            console.error(error);
        }
    }

    runner.setReporter(config.reporter);
    await runner.runTests();
};

module.exports = execute;