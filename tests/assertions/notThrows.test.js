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
const { notThrows, notThrowsAsync } = require('../../src/assertions/notThrows');

test('notThrows › should pass when the function does not throw an error', t => {
    // Call the function to check for error
    notThrows(() => {
        // No error thrown here, this should pass
    });
    t.pass(); // Make an assertion to pass the test
});

test('notThrows › should fail when the function throws an error', t => {
    const error = t.throws(() => notThrows(() => { throw new Error('This is an error'); }));
    t.is(error.message, 'Assertion failed: expected function not to throw an error, but it did');
});

test('notThrowsAsync › should pass when the async function does not throw an error', async t => {
    await notThrowsAsync(async () => {
        // No error thrown here, this should pass
    });
    t.pass(); // Make an assertion to pass the test
});

test('notThrowsAsync › should fail when the async function throws an error', async t => {
    const error = await t.throwsAsync(() => notThrowsAsync(async () => { throw new Error('This is an async error'); }));
    t.is(error.message, 'Assertion failed: expected function not to throw an error, but it did');
});