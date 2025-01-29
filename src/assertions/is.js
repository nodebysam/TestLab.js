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

const { getDifference } = require('../utils');

/**
 * Assert that two values are strictly equal (===).
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the values are not stricly equal. 
 */
const is = (actual, expected, message = '') => {
    if (actual !== expected) {
        throw new Error(message || `Assertion failed: expected ${expected} but received ${actual}\n\n${getDifference(actual, expected)}`);
    }
};

/**
 * Assert that two values are equal (==).
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if values are not equal. 
 */
const isEqual = (actual, expected, message = '') => {
    if (actual != expected) {
        throw new Error(message || `Assertion failed: expected ${expected} but received ${actual}\n\n${getDifference(actual, expected)}`);
    }
};

/**
 * Assert that the actual value is greater than the expected value.
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the actual value is not greater than the expected value.
 */
const isGreaterThan = (actual, expected, message = '') => {
    if (actual <= expected) {
        throw new Error(message || `Assertion failed: expected ${actual} to be greater than ${expected}\n\n${getDifference(actual, expected)}`);
    }
};

/**
 * Assert that the actual value is less than the expected value.
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the actual value if not less than the expected value.
 */
const isLessThan = (actual, expected, message = '') => {
    if (actual >= expected) {
        throw new Error(message || `Assertion failed: expected ${expected} to be less than ${expected}\n\n${getDifference(actual, expected)}`);
    }
};

/**
 * Assert that the actual value is an instance of the expected class.
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the actual value is not an instance of the expected value.
 */
const isInstanceOf = (actual, expected, message = '') => {
    if (!(actual instanceof expected)) {
        throw new Error(message || `Assertion failed: expected ${actual} to be an instance of ${expected.name}\n\n${getDifference(actual, expected)}`);
    }
}

module.exports = {
    is,
    isEqual,
    isGreaterThan,
    isLessThan,
    isInstanceOf,
};