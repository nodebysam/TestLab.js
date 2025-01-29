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

const { getDifference } = require('../../src/utils');

/**
 * Negates strict equality check (!==).
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the values are strictly equal.
 */
const not = (actual, expected, message = '') => {
    if (actual === expected) {
        throw new Error(message || `Assertion failed: expected ${expected} not to be strictly equal to ${actual}\n\n${getDifference(actual, expected)}`);
    }
};

/**
 * Negates loose equality check (!=).
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the values are loosely equal.
 */
const notEqual = (actual, expected, message = '') => {
    if (actual == expected) {
        throw new Error(message || `Assertion failed: expected ${expected} not to be loosely equal to ${actual}\n\n${getDifference(actual, expected)}`);
    }
};

/**
 * Negates greater than check (>).
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the actual value is less than or equal to the expected value.
 */
const notGreaterThan = (actual, expected, message = '') => {
    if (actual > expected) {
        throw new Error(message || `Assertion failed: expected ${actual} to not be greater than ${expected}\n\n${getDifference(actual, expected)}`);
    }
};

/**
 * Negates less than check (<).
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the actual value is greater than or equal to the expected value.
 */
const notLessThan = (actual, expected, message = '') => {
    if (actual < expected) {
        throw new Error(message || `Assertion failed: expected ${actual} to not be less than ${expected}\n\n${getDifference(actual, expected)}`);
    }
};

/**
 * Nagates instance of check (not an instance of).
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the actual value is an instance of the expected class.
 */
const notInstanceOf = (actual, expected, message = '') => {
    if (actual instanceof expected) {
        throw new Error(message || `Assertion failed: expected ${actual} to not be an instance of ${expected.name}\n\n${getDifference(actual, expected.name)}`);
    }
};

module.exports = {
    not,
    notEqual,
    notGreaterThan,
    notLessThan,
    notInstanceOf,
};