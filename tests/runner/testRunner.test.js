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
const TestRunner = require('../../src/runner/testRunner');
const ConsoleReporter = require('../../src/reporter/consoleReporter');
const JsonReporter = require('../../src/reporter/jsonReporter');
const { beforeAllTests, afterAllTests } = require('../../src/runner/setupHooks');

const mockReporter = {
    handleTestResult: () => {},
    printSummary: () => {},
};

test('TestRunner › constructor should initialize with default values', t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;

    t.is(runner.timeout, 5000, 'Timeout should be 5000 by default');
    t.is(typeof runner.reporter.handleTestResult, 'function', 'Reporter should have handleTestResult');
    t.deepEqual(runner.reporter, mockReporter, 'Reporter should be the mockReporter');
    t.deepEqual(runner.tests, [], 'Tests array should be empty');
    t.deepEqual(runner.testFiles, [], 'Test files array should be empty');
});

test('TestRunner › test should add a new test correctly', t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;
    const testFn = () => {};  // Mock test function
    const testFile = 'test/file1.test.js';

    runner.test('Test 1', testFn, testFile);

    t.is(runner.tests.length, 1, 'There should be one test');
    t.deepEqual(runner.tests[0].description, 'Test 1', 'The test description should be "Test 1"');
    t.deepEqual(runner.tests[0].testFn, testFn, 'The test function should be the mock function');
    t.deepEqual(runner.tests[0].testFile, testFile, 'The test file should be "test/file1.test.js"');
});

test('TestRunner › test should throw error if test description already exists', t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;
    const testFn = () => {};  // Mock test function
    const testFile = 'test/file1.test.js';

    runner.test('Test 1', testFn, testFile);

    const error = t.throws(() => {
        runner.test('Test 1', testFn, testFile);
    });

    t.is(error.message, "A test with the description 'Test 1' already exists", 'Should throw error for duplicate test descriptions');
});

test('TestRunner › runTests should run all tests and report results', async t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;
    const testFn = (t) => {};
    const testFile = 'test/file1.test.js';

    runner.test('Test 1', testFn, testFile);

    const result = await runner.runTests();

    t.is(result.passed, 1, 'There should be 1 passed test');
    t.is(result.failed, 0, 'There should be 0 failed tests');
});

test('TestRunner › setReporter should change reporter type to json', t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;
    
    runner.setReporter('json');
    t.true(runner.reporter instanceof JsonReporter, 'Reporter should be set to JsonReporter');
});

test('TestRunner › setReporter should change reporter type to console', t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;
    
    runner.setReporter('console');
    t.true(runner.reporter instanceof ConsoleReporter, 'Reporter should be set to ConsoleReporter');
});

test('TestRunner › setTimeout should set the timeout value', t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;
    
    runner.setTimeout(10000);
    t.is(runner.timeout, 10000, 'Timeout should be set to 10000');
});

test('TestRunner › setTimeout should throw error if timeout is not a number', t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;
    
    const error = t.throws(() => {
        runner.setTimeout('not-a-number');
    });
    t.is(error.message, 'Timeout must be a number: not-a-number', 'Should throw error when timeout is not a number');
});

test('TestRunner › runTests should handle test timeout and fail', async t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;
    const testFn = async () => { await setTimeout({}, 10000) };
    const testFile = 'test/file1.test.js';
    
    runner.setTimeout(5000);  // Set timeout to 5000ms

    runner.test('Test 1', testFn, testFile);

    const result = await runner.runTests();

    t.is(result.passed, 0, 'There should be 0 passed tests');
    t.is(result.failed, 1, 'There should be 1 failed test');
});

test('TestRunner › runTests should call beforeAllTests and afterAllTests hooks', async t => {
    const runner = new TestRunner();
    runner.reporter = mockReporter;

    const testFn = (t) => t.pass();  // Mock passing test
    const testFile = 'test/file1.test.js';

    runner.test('Test 1', testFn, testFile);

    const result = await runner.runTests();

    t.true(result.beforeAllCalled, 'beforeAllTests hook should be called');
    t.true(result.afterAllCalled, 'afterAllTests hook should be called');
});