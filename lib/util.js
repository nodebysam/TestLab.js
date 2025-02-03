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

const path = require('path');

/**
 * Starts the timer for the total execution time.
 * 
 * @returns {number} The current milliseconds.
 */
const startTimer = () => {
    return Date.now();
};

/**
 * Stops the timer and returns the total execution time.
 * 
 * @param {number} startTime - The start time in milliseconds.
 * @returns {number} The total execution time.
 */
const stopTimer = (startTime) => {
    return (Date.now() - startTime) / 1000;
};

/**
 * Formats a number to a human-readable number string represention.
 * For example:
 *  * 1000 => 1,000
 *  * 100000 => 100,000
 *  * and so on...
 * 
 * @param {number} number - The input number to format.
 * @returns {string} The formatted number string.
 */
const formatNumber = (number) => {
    return number.toLocaleString();
};

/**
 * Generate the DIFF.
 * 
 * @param {string} actualStr - The actual string
 * @param {string} expectedStr - The expected string.
 * @returns {string} The DIFF string.
 */
const getDiff = (actualStr, expectedStr) => {
    const diff = Diff.diffLines(actualStr.toString(), expectedStr.toString());

    let diffString = '';

    diff.forEach(part => {
        const color = part.added ? '\x1b[32m' : part.removed ? '\x1b[31m' : '\x1b[90m';
        const reset = '\x1b[0m';
        const text = part.value;

        diffString += part.added ? `${color}+ ${text}${reset}` :
                      part.removed ? `${color}- ${text}${reset}\n` :
                      `${color}  ${text}${reset}`;
    });

    return diffString;
};

/**
 * Get the difference between two strings.
 * 
 * @param {string} actual - The actual string.
 * @param {string} expected - The expected string.
 * @returns {string} The difference for the input.
 */
const getDifference = (actual, expected) => {
    return `\x1b[0mDifference (\x1b[31m- actual\x1b[0m, \x1b[32m+ expected\x1b[0m)\n\n${getDiff(actual, expected)}`;
};

module.exports = {
    startTimer,
    stopTimer,
    formatNumber,
    getDiff,
    getDifference,
};