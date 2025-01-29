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

const { deepEqual } = require('./assertions/deepEqual');
const { assertFalse } = require('./assertions/false');
const { is, isEqual, isGreaterThan, isLessThan, isInstanceOf } = require('./assertions/is');
const { not, notEqual, notGreaterThan, notLessThan, notInstanceOf } = require('./assertions/not');
const { notThrows, notThrowsAsync } = require('./assertions/notThrows');
const { throws, throwsAsync } = require('./assertions/throws');
const { assertTrue } = require('./assertions/true');

const t = {
    deepEqual,
    true: assertTrue,
    false: assertFalse,
    is,
    isEqual,
    isGreaterThan,
    isLessThan,
    isInstanceOf,
    not,
    notEqual,
    notGreaterThan,
    notLessThan,
    notInstanceOf,
    notThrows,
    notThrowsAsync,
    throws,
    throwsAsync,
};

module.exports = t;