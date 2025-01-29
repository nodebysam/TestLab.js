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

module.exports = { deepEqual };