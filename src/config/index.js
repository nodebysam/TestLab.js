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

const { Reporter } = require('../types');
const os = require('os');
const path = require('path');

/**
 * TestLab.js configurations.
 */
const config = {
    // The reporter to use: either 'Reporter.CONSOLE' or 'Reporter.JSON'
    reporter: Reporter.CONSOLE,

    // Whether to output a JSON test summary report
    enableReport: false,

    // If you enabled report, specify the full path to the directory to store the JSON report file.
    // Examples:
    // Windows: reportPath: 'C:\Users\Smith\Documents\testresults'
    // Linux: reportPath: '/home/smith/Documents/testresults'
    reportPath: os.tmpdir(),

    // The name of the file for the report, if enabled
    reportFile: 'testReport.json',

    // The test directory path
    testDirectory: path.join(process.cwd(), 'tests'),

    // Test timeout in milliseconds. (seconds x 1000)
    timeout: 5000,

    // Whether to output debug information (NOT recommended for production)
    debug: false,
};

/**
 * Update the configurations dynamically.
 * 
 * @param {Object} newConfig - An object containing the updated configuration values.
 */
const setConfig = (newConfig) => {
    for (const key in newConfig) {
        if (config.hasOwnProperty(key)) {
            if (typeof config[key] === 'object' && typeof newConfig[key] === 'object') {
                Object.assign(config[key], newConfig[key]);
            } else {
                config[key] = newConfig[key];
            }
        }
    }

    if (config.debug && process.env.NODE_ENV !== 'test') {
        console.log('[DEBUG] Updated configuration:', config);
    }
};

module.exports = {
    config,
    setConfig,
};