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
const { assertTrue } = require('../../src/assertions/true');

test('assertTrue › should does not throw error if the value is true', t => {
    t.notThrows(() => { assertTrue(true); });
    t.notThrows(() => { assertTrue(1); });
    t.notThrows(() => { assertTrue('simple text'); });
});

test('assertTrue › should throw an error if the value is false', t => {
    const result = t.throws(() => { assertTrue(false); });
    t.is(result.message, 'Assertion failed: expected a truthy value but received false');
});

test('assertTrue › should throw an error if the value false', t => {
    const falseValue = t.throws(() => { assertTrue(false); });
    const nullValue = t.throws(() => { assertTrue(null); });
    const undefinedValue = t.throws(() => { assertTrue(undefined); });
    const zeroValue = t.throws(() => { assertTrue(0); });
    const blankValue = t.throws(() => { assertTrue(''); });
    const nanValue = t.throws(() => { assertTrue(NaN); });

    t.is(falseValue.message, 'Assertion failed: expected a truthy value but received false');
    t.is(nullValue.message, 'Assertion failed: expected a truthy value but received null');
    t.is(undefinedValue.message, 'Assertion failed: expected a truthy value but received undefined');
    t.is(zeroValue.message, 'Assertion failed: expected a truthy value but received 0');
    t.is(blankValue.message, 'Assertion failed: expected a truthy value but received ""');
    t.is(nanValue.message, 'Assertion failed: expected a truthy value but received null');
});

test('assertTrue › should allow for custom messages when the value is false', t => {
    const result = t.throws(() => { assertTrue(false, 'This is a custom assertion message'); });
    t.is(result.message, 'This is a custom assertion message');
});

test('assertTrue › should handle multiple calls successfully', t => {
    for (let i = 0; i < 50; i++) {
        t.notThrows(() => { assertTrue(true); });
    }

    for (let i = 0; i < 50; i++) {
        const result = t.throws(() => { assertTrue(false); });
        t.is(result.message, 'Assertion failed: expected a truthy value but received false');
    }
});