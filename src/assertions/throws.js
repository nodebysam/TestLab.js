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
 * Throws an error if the provided function does not throw one.
 * 
 * @param {Function} fn - The function to test.
 * @param {Object} [options={}] - Options to validate the error.
 * @param {Function} [options.instanceOf] - The expected constructor of the error (e.g., 'Error').
 * @param {string|RegExp} [options.message] - The expected error message or pattern to validate.
 * @param {string} [message] - Custom error message to show if the assertion fails.
 * @returns {Error} The thrown error.
 * @throws {Error} Throws an error if the assertion fails.
 */
const throws = (fn, options = {}, message = '') => {
    try {
        fn();
    } catch (error) {
        if (options.instanceOf && options.instanceOf.name !== error.constructor.name) {
            throw new Error(message || `Assertion failed: expected error to be an instance of ${options.instanceOf.name} but received ${error.constructor.name}`);
        }

        if (options.message && typeof options.message === 'string' && error.message !== options.message) {
            throw new Error(message || `Assertion failed: expected error message "${options.message}" but received "${error.message}"`);
        }

        if (options.message instanceof RegExp && !options.message.test(error.message)) {
            throw new Error(message || `Assertion failed: expected error message to match pattern "${options.message.source}" but received "${error.message}"`);
        }

        return error;
    }

    throw new Error(message || 'Assertion failed: expected function to throw an error, but it did not');
};

/**
 * Asserts that the provided asynchronous function throws an error.
 * 
 * @param {Function} fn - The asynchronous function to test.
 * @param {Object} [options={}] - Options to validate the error.
 * @param {Function} [options.instanceOf] - The expected constructor of the error (e.g., 'Error').
 * @param {string|RegExp} [options.message] - The expected error message or pattern to validate.
 * @param {string} [message] - Custom error message to show if the assertion fails.
 * @returns {Error} The thrown error.
 * @throws {Error} Throws an error if the assertion fails.
 */
const throwsAsync = async (fn, options = {}, message = '') => {
    try {
        await fn();
    } catch (error) {
        if (options.instanceOf && options.instanceOf.name !== error.constructor.name) {
            throw new Error(message || `Assertion failed: expected error to be an instance of ${options.instanceOf.name} but received ${error.constructor.name}`);
        }

        if (options.message && typeof options.message === 'string' && error.message !== options.message) {
            throw new Error(message || `Assertion failed: expected error message "${options.message}" but received "${error.message}"`);
        }

        if (options.message instanceof RegExp && !options.message.test(error.message)) {
            throw new Error(message || `Assertion failed: expected error message to match pattern "${options.message.source}" but received "${error.message}"`);
        }

        return error;
    }

    throw new Error(message || 'Assertion failed: expected asynchronous function to throw an error, but it did not');
};

module.exports = {
    throws,
    throwsAsync,
};