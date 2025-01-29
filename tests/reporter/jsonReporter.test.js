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
const JsonReporter = require('../../src/reporter/jsonReporter');
const sinon = require('sinon');

test('JsonReporter › handleTestResult should update passed tests', t => {
    const reporter = new JsonReporter();
    const logSpy = sinon.spy(console, 'log');  // Spy on console.log

    // Call handleTestResult for a passed test
    reporter.handleTestResult('Test 1', true, '', 100);

    t.is(reporter.passed, 1, 'Passed should increment');
    t.is(reporter.failed, 0, 'Failed should not increment');
    t.deepEqual(reporter.testResults[0].testName, 'Test 1', 'Test name should be "Test 1"');
    t.deepEqual(reporter.testResults[0].status, 'passed', 'Test status should be "passed"');
    
    // Ensure log was called with expected messages
    t.true(logSpy.calledWith('\x1b[32m✔️ Test 1 \x1b[0m\x1b[36m(100.00ms)\x1b[0m'), 'Log should contain passed test info');
    
    logSpy.restore();  // Restore console.log
});

test('JsonReporter › handleTestResult should update failed tests', t => {
    const reporter = new JsonReporter();
    const logSpy = sinon.spy(console, 'log');  // Spy on console.log

    // Call handleTestResult for a failed test
    reporter.handleTestResult('Test 1', false, 'Failed due to error', 200);

    t.is(reporter.passed, 0, 'Passed should not increment');
    t.is(reporter.failed, 1, 'Failed should increment');
    t.deepEqual(reporter.testResults[0].testName, 'Test 1', 'Test name should be "Test 1"');
    t.deepEqual(reporter.testResults[0].status, 'failed', 'Test status should be "failed"');
    t.deepEqual(reporter.testResults[0].message, 'Failed due to error', 'Error message should match');

    // Ensure log was called with expected messages
    t.true(logSpy.calledWith('\x1b[31m❌ Test 1 \x1b[0m\x1b[36m(200.00ms)\x1b[0m'), 'Log should contain failed test info');
    t.true(logSpy.calledWith('\x1b[31m   Failed due to error\x1b[0m'), 'Log should contain error message');

    logSpy.restore();  // Restore console.log
});