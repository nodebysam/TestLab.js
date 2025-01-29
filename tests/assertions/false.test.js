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
const { assertFalse } = require('../../src/assertions/false');

test('assertFalse › should does not throw error if the value is false', t => {
    t.notThrows(() => { assertFalse(false); });
    t.notThrows(() => { assertFalse(0); });
    t.notThrows(() => { assertFalse(''); });
});

test('assertFalse › should throw an error if the value is true', t => {
    const result = t.throws(() => { assertFalse(true); });
    t.is(result.message, 'Assertion failed: expected a falsy value but received true');
});

test('assertFalse › should throw an error if the value true', t => {
    const trueValue = t.throws(() => { assertFalse(true); });
    const oneValue = t.throws(() => { assertFalse(1); });
    const stringValue = t.throws(() => { assertFalse('some string'); });

    t.is(trueValue.message, 'Assertion failed: expected a falsy value but received true');
    t.is(oneValue.message, 'Assertion failed: expected a falsy value but received 1');
    t.is(stringValue.message, 'Assertion failed: expected a falsy value but received "some string"');
});

test('assertFalse › should allow for custom messages when the value is true', t => {
    const result = t.throws(() => { assertFalse(true, 'This is a custom assertion message'); });
    t.is(result.message, 'This is a custom assertion message');
});

test('assertFalse › should handle multiple calls successfully', t => {
    for (let i = 0; i < 50; i++) {
        t.notThrows(() => { assertFalse(false); });
    }

    for (let i = 0; i < 50; i++) {
        const result = t.throws(() => { assertFalse(true); });
        t.is(result.message, 'Assertion failed: expected a falsy value but received true');
    }
});