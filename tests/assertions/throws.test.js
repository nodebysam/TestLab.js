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
const { throws, throwsAsync } = require('../../src/assertions/throws');

test('throws › should throw an error if the function does not throw any error', t => {
    const error = t.throws(() => throws(() => {}), { instanceOf: Error });
    t.is(error.message, 'Assertion failed: expected function to throw an error, but it did not');
});

test('throws › should throw the expected error when function throws an error of the wrong type', t => {
    const error = t.throws(() => throws(() => { throw new TypeError('Wrong error type'); }, { instanceOf: Error }));
    t.is(error.message, 'Assertion failed: expected error to be an instance of Error but received TypeError');
});

test('throws › should throw an error if the message does not match the expected one', t => {
    const error = t.throws(() => throws(() => { throw new Error('Incorrect message'); }, { message: 'Expected error' }));
    t.is(error.message, 'Assertion failed: expected error message "Expected error" but received "Incorrect message"');
});

test('throws › should throw an error if the message does not match the expected pattern', t => {
    const error = t.throws(() => throws(() => { throw new Error('Mismatch message'); }, { message: /Expected.*/ }));
    t.is(error.message, 'Assertion failed: expected error message to match pattern "Expected.*" but received "Mismatch message"');
});

test('throws › should throw an error when the message does not match the pattern for RegExp', t => {
    const error = t.throws(() => throws(() => { throw new Error('Expected message'); }, { message: /Mismatch/ }));
    t.is(error.message, 'Assertion failed: expected error message to match pattern "Mismatch" but received "Expected message"');
});

test('throws › should return the error when function throws and the error type and message match', t => {
    const error = throws(() => { throw new Error('Expected message'); }, { instanceOf: Error, message: 'Expected message' });
    t.is(error.message, 'Expected message');
});

test('throwsAsync › should throw an error if the async function throws an error of the wrong type', async t => {
    const error = await t.throwsAsync(() => throwsAsync(async () => { throw new TypeError('Wrong error type'); }, { instanceOf: Error }));
    t.is(error.message, 'Assertion failed: expected error to be an instance of Error but received TypeError');
});

test('throwsAsync › should throw an error if the async function throws an error with the wrong message', async t => {
    const error = await t.throwsAsync(() => throwsAsync(async () => { throw new Error('Mismatch message'); }, { message: 'Expected error' }));
    t.is(error.message, 'Assertion failed: expected error message "Expected error" but received "Mismatch message"');
});

test('throwsAsync › should throw an error if the async function throws an error with the wrong message pattern', async t => {
    const error = await t.throwsAsync(() => throwsAsync(async () => { throw new Error('Mismatch message'); }, { message: /Expected.*/ }));
    t.is(error.message, 'Assertion failed: expected error message to match pattern "Expected.*" but received "Mismatch message"');
});

test('throwsAsync › should throw the expected error when async function throws an error that matches the instance and message', async t => {
    const error = await throwsAsync(async () => { throw new Error('Expected message'); }, { instanceOf: Error, message: 'Expected message' });
    t.is(error.message, 'Expected message');
});

test('throwsAsync › should throw an error if the async function does not throw any error', async t => {
    const error = await t.throwsAsync(() => throwsAsync(async () => {}), { instanceOf: Error });
    t.is(error.message, 'Assertion failed: expected asynchronous function to throw an error, but it did not');
});