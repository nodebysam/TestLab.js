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
const { assertRegex } = require('../../src/assertions/regex');

test('should pass when actual matches the expected regex', t => {
    t.notThrows(() => assertRegex("TestLab is awesome!", /TestLab/));
});

test('should throw an error when actual does not match expected regex', t => {
    const error = t.throws(() => assertRegex("TestLab is awesome!", /invalid/));
    t.regex(error.message, /Assertion failed: expected "TestLab is awesome!" to match \/invalid\//);
});

test('should throw TypeError if expectedRegex is not a RegExp', t => {
    const error = t.throws(() => assertRegex("TestLab", "not a regex"));
    t.is(error.message, "Expected a regular expression, but received string");
});