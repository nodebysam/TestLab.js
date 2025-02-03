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

const {
    deepEqual,
    assertFalse,
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
    assertRegex,
    assertTrue,
} = require('./assertion');

module.exports = {
    true: assertTrue,
    false: assertFalse,
    deepEqual,
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
    assertRegex,
};