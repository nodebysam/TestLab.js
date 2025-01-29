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
 * Assert on true.
 * This will assert if the value is 'false'.
 * 
 * @param {any} value - The value to check is true.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws error if the value is not true. 
 */
const assertTrue = (value, message = '') => {
    if (!value) {
        throw new Error(message || `Assertion failed: expected a truthy value but received ${value === undefined ? 'undefined' : JSON.stringify(value)}`);
    }
};

module.exports = { assertTrue };