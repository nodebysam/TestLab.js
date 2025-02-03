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

const { getDifference } = require('./util');

/**
 * Recursively checks if two values are deeply equal (e.g., their properties/values match exactly).
 * This will handle objects, arrays, and primitive types.
 * 
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} [message=''] - Optional message.
 * @param {Object} [options={}] - Optional options.
 * @param {string} [options.matchPartial=null] - Match a given string and check if it exists within the message (default is null).
 * @param {WeakSet} [seen=new WeakMap()] - Tracks visited objects to handle circular references. 
 */
const deepEqual = (actual, expected, message = '', options = {}, seen = new WeakMap()) => {
    const { matchPartial = null } = options;

    try {
        if (actual === expected) {
            return;
        }
    
        if (typeof actual !== typeof expected) {
            throw new Error(message || 'Assertion failed: expected both values to be of the same type');
        }
    
        if (actual === null || expected === null) {
            throw new Error(message || `Assertion failed: expected ${expected} but received ${actual}`);
        }
    
        if (typeof actual !== 'object' || typeof expected !== 'object') {
            throw new Error(message || `Assertion failed: expected ${expected} but received ${actual}\n${getDifference(actual, expected)}`);
        }
    
        if (!seen.has(actual)) {
            seen.set(actual, expected);
        } else {
            if (seen.get(actual) !== expected) {
                throw new Error(message || 'Circular references do not match');
            }
    
            return;
        }
    
        if (Array.isArray(actual) && Array.isArray(expected)) {
            if (actual.length !== expected.length) {
                throw new Error(message || `Assertion failed: arrays have different lengths. Expected ${expected.length} but received ${actual.length}`);
            }
    
            for (let i = 0; i < actual.length; i++) {
                deepEqual(actual[i], expected[i], message, options, seen);
            }
        } else if (!Array.isArray(actual) && !Array.isArray(expected)) {
            const actualKeys = Object.keys(actual);
            const expectedKeys = Object.keys(expected);
    
            if (actualKeys.length !== expectedKeys.length) {
                throw new Error(message || 'Assertion failed: Objects have different numbers or properties');
            }
    
            for (const key of actualKeys) {
                if (!expected.hasOwnProperty(key)) {
                    throw new Error(message || `Assertion failed: expected object does not have key ${key}`);
                }
    
                deepEqual(actual[key], expected[key], message, options, seen);
            }
    
            seen.delete(actual);
            seen.delete(expected);
        } else {
            throw new Error(message || 'Assertion failed: expected both values to be of the same type');
        }
    } catch (error) {
        if (matchPartial && typeof matchPartial === 'string') {
            if (error.message.includes(matchPartial)) {}
        }

        throw error;
    }
};

/**
 * Assert on true.
 * This will assert if the value is true.
 * 
 * @param {any} value - The value to check is false.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the value if true.
 */
const assertFalse = (value, message = '') => {
    if (value) {
        throw new Error(message || `Assertion failed: expected a falsy value but received ${value === undefined ? 'undefined' : JSON.stringify(value)}`);
    }
};

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

/**
 * Ensures that the provided function does not throw an error.
 * 
 * @param {Function} fn - The function to test.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the function throws an error. 
 */
const notThrows = (fn, message = '') => {
    try {
        fn();
    } catch (error) {
        throw new Error(message || 'Assertion failed: expected function not to throw an error, but it did');
    }
};

/**
 * Ensures the the provided async function does not throw an error.
 * 
 * @param {Function} fn - The function to test.
 * @param {string} [message=''] - Optional message.
 * @throws {Error} Throws an error if the function throws an error.
 */
const notThrowsAsync = async (fn, message = '') => {
    try {
        await fn();
    } catch (error) {
        throw new Error(message || 'Assertion failed: expected function not to throw an error, but it did');
    }
};

const pass = () => {

};

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

module.exports = {
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
};