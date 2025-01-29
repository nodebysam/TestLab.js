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
const fs = require('fs');
const sinon = require('sinon');
const { startTimer, stopTimer, formatNumber, writeFile } = require('../../src/utils');

test('startTimer should return a timestamp', t => {
    const timestamp = startTimer();
    t.true(Number.isInteger(timestamp), 'startTimer should return a valid timestamp');
});

test('stopTimer should return execution time in milliseconds', t => {
    const startTime = Date.now();
    const executionTime = stopTimer(startTime);
    
    // Ensure the execution time is positive and within a reasonable range (in ms)
    t.true(executionTime < 1000, 'stopTimer should return a positive execution time in milliseconds');
});

test('formatNumber should format numbers correctly', t => {
    const formatted1 = formatNumber(1000);
    const formatted2 = formatNumber(100000);
    const formatted3 = formatNumber(123456789);

    t.is(formatted1, '1,000', '1000 should be formatted as "1,000"');
    t.is(formatted2, '100,000', '100000 should be formatted as "100,000"');
    t.is(formatted3, '123,456,789', '123456789 should be formatted as "123,456,789"');
});

test('writeFile should write to a file and handle errors', t => {
    const filePath = './test.txt';
    const data = 'Test data';

    // Mock the writeFileSync method from fs module
    const writeFileSpy = sinon.spy(fs, 'writeFileSync');

    // Test successful file write
    writeFile(filePath, data);
    t.true(writeFileSpy.calledOnceWith(filePath, data, 'utf-8'), 'writeFileSync should be called with correct arguments');

    // Test error handling: Simulate error by making writeFileSync throw an error
    writeFileSpy.restore(); // Restore fs.writeFileSync to avoid actual file system operations
    const errorMessage = 'Failed to write file';
    const writeFileWithError = sinon.stub(fs, 'writeFileSync').throws(new Error(errorMessage));

    const error = t.throws(() => {
        writeFile(filePath, 'Some content'); // This should throw the mock error
    });
    
    t.is(error.message, `Failed to write 'Some content' to the file ${filePath}. Error: ${errorMessage}`, 'writeFile should throw the expected error message');
    
    writeFileWithError.restore(); // Clean up mock
});