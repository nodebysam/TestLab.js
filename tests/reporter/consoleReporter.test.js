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

const test = require('ava');
const sinon = require('sinon');
const ConsoleReporter = require('../../src/reporter/consoleReporter');

test('ConsoleReporter › handleTestResult should log the correct messages for passing tests', t => {
    const reporter = new ConsoleReporter();
    const logSpy = sinon.spy(console, 'log');

    reporter.handleTestResult('Test 1', true, '', 123.45);

    t.true(logSpy.calledWith('\x1b[32m✔️ Test 1 \x1b[0m\x1b[36m(123.45ms)\x1b[0m'), 'Should log the passing test with green color and execution time');
    t.is(reporter.passed, 1, 'The passed count should be incremented');
    t.is(reporter.failed, 0, 'The failed count should remain 0');

    logSpy.restore(); // Restore original console.log
});

test('ConsoleReporter › handleTestResult should log the correct messages for failing tests', t => {
    const reporter = new ConsoleReporter();
    const logSpy = sinon.spy(console, 'log');

    reporter.handleTestResult('Test 1', false, 'Something went wrong', 456.78);

    t.true(logSpy.calledWith('\x1b[31m❌ Test 1 \x1b[0m\x1b[36m(456.78ms)\x1b[0m'), 'Should log the failing test with red color and execution time');
    t.true(logSpy.calledWith('\x1b[31m   Something went wrong\x1b[0m'), 'Should log the failure message in red');
    t.is(reporter.passed, 0, 'The passed count should remain 0');
    t.is(reporter.failed, 1, 'The failed count should be incremented');

    logSpy.restore(); // Restore original console.log
});