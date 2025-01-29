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
const { Reporter } = require('../src/types');

test('Reporter object should have two constants', t => {
    t.is(Object.keys(Reporter).length, 2, 'Reporter should have two keys');
    t.true(Reporter.hasOwnProperty('CONSOLE'), 'Reporter should have CONSOLE key');
    t.true(Reporter.hasOwnProperty('JSON'), 'Reporter should have JSON key');
});

test('Reporter constants should have correct values', t => {
    t.is(Reporter.CONSOLE, 'CONSOLE', 'CONSOLE should be "CONSOLE"');
    t.is(Reporter.JSON, 'JSON', 'JSON should be "JSON"');
});