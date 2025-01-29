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

module.exports = {
    notThrows,
    notThrowsAsync,
};