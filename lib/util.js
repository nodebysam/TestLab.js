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
const fs = require('fs');

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

/**
 * Checks the projects root for a testlabjs config file.
 * 
 * @returns {Object|null} An object of the configs, null if not found.
 */
const checkForJsonConfigs = () => {
    const rootDir = process.cwd();
    const filesInDir = fs.readdirSync(rootDir);

    if (filesInDir.includes('testlabjs.config.json')) {
        const configFilePath = path.join(rootDir, 'testlabjs.config.json');

        try {
            const fileContent = fs.readFileSync(configFilePath, 'utf-8');
            const configObject = JSON.parse(fileContent);
            return configObject;
        } catch (error) {
            console.error(`Failed to read or parse config file: ${configFilePath}`);
            console.error(error);
        }
    }

    return null;
};

/**
 * Write the test results to a JSON file.
 * 
 * @param {Object} configs - The configurations object.
 * @param {Object[]} tests - An array of test result objects. 
 * @param {number} totalPassed - The total number of tests that passed. 
 * @param {number} totalFailed - The total number of tests that failed. 
 * @param {number} totalTests - The total number of tests executed. 
 * @param {number} executionTime - The total time in ms to execute all tests. 
 */
const writeTestResultsToJson = (configs, tests, totalPassed, totalFailed, totalTests, executionTime) => {
    const jsonFilePath = path.join(process.cwd(), configs.resultJsonFilePath);

    const result = {
        totalTests: totalTests,
        totalPassed: totalPassed,
        totalFailed: totalFailed,
        executionTime: executionTime,
        tests: tests,
    };

    try {
        const dir = path.dirname(jsonFilePath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(jsonFilePath, JSON.stringify(result, null, 2), 'utf-8');
        console.log(`Test results have been written to: ${jsonFilePath}`);
    } catch (error) {
        console.error(`Failed to write test results to JSON file: ${jsonFilePath}`);
        console.error(error);
    }
};

/**
 * Get the full directory to the tests.
 * 
 * @param {Object} configs - The configurations object.
 * @returns {string} The full directory to the test files.
 */
const getFullTestDirectory = (configs) => {
    if (configs.usePattern) {
        return configs.testDirectory;
    } else {
        return path.join(process.cwd(), configs.testDirectory);
    }
};

/**
 * Recursively reads a directory and returns all the files that match a specific extension.
 * 
 * @param {string} dirPath - The directory to scan.
 * @param {string} extension - The file extension to match.
 * @returns {string[]} An array of file paths.
 */
const getFilesRecursively = (dirPath, extension) => {
    let files = [];
    const fileList = fs.readdirSync(dirPath);

    for (const file of fileList) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files = files.concat(getFilesRecursively(fullPath, extension));
        } else if (file.endsWith(extension)) {
            files.push(fullPath);
        }
    }

    return files;
};

module.exports = {
    startTimer,
    stopTimer,
    formatNumber,
    getDiff,
    getDifference,
    checkForJsonConfigs,
    writeTestResultsToJson,
    getFullTestDirectory,
    getFilesRecursively,
};