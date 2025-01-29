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

/**
 * Check using regular expressions to match patterns in the actual input string.
 * 
 * @param {string} actual - The actual string.
 * @param {RegEx} expectedRegex - The regular expression to match with.
 * @throws {Error} Throws an error if the regular expression does not get a match. 
 */
const assertRegex = (actual, expectedRegex) => {
    if (!(expectedRegex instanceof RegExp)) {
        throw new TypeError(`Expected a regular expression, but received ${typeof expectedRegex}`);
    }

    if (!expectedRegex.test(actual)) {
        throw new Error(`Assertion failed: expected "${actual}" to match ${expectedRegex}`);
    }
};

module.exports = { assertRegex };