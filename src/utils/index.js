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

const fs = require('fs');
const path = require('path');
const Diff = require('diff');

/**
 * Starts the timer for the total execution time.
 * 
 * @returns {number} - The current milliseconds.
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
    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;
    return totalTime;
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
 * Writes the given data to the given file.
 * 
 * @param {string} filePath - The path to the file to write to.
 * @param {string} data - The data to write to the file.
 */
const writeFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, data, 'utf-8');
    } catch (error) {
        throw new Error(`Failed to write '${data}' to the file ${filePath}. ${error}`);
        throw error;
    }
};

/**
 * Generate the diff.
 * 
 * @param {string} actualStr - The actual string.
 * @param {string} expectedStr - The expected string.
 * @returns {string} The diff string.
 */
const getDiff = (actualStr, expectedStr) => {
    const diff = Diff.diffLines(expectedStr.toString(), actualStr.toString());

    let diffString = '';

    diff.forEach(part => {
        const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
        const text = part.value;

        const coloredText = text.replace(/(^"|"$)/g, '\x1b[36m$1\x1b[0m');

        diffString += color === 'green' ? `+ ${coloredText}\n` :
                      color === 'red' ? `- ${coloredText}` :
                      `${color === 'green' ? '+' : '-'} ${coloredText}`;
    });

    return diffString;
};

/**
 * Get the difference string for output.
 * 
 * @param {string} actual - The actual string.
 * @param {string} expected - The expected string.
 * @returns {string} The difference string for output. 
 */
const getDifference = (actual, expected) => {
    return `Difference (\x1b[31m- actual\x1b[0m, \x1b[32m+ expected\x1b[0m)\n\n${getDiff(actual, expected)}`;
};

module.exports = {
    startTimer,
    stopTimer,
    formatNumber,
    writeFile,
    getDiff,
    getDifference,
};