#!/usr/bin/env node

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

const { program } = require('commander');
const path = require('path');
const { config, setConfig } = require('../config');
const { version } = require('../../package.json');
const test = require('../testlabjs');
const figlet = require('figlet');

process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', reason => {
    console.error('Uhandled Rejection:', reason);
    process.exit(1);
});

program
    .name('testlabjs')
    .description('A NodeJS testing framework for running unit tests with ease.')
    .version(version)
    .option('-d --directory <path>', 'Specify the test directory (default: "./tests"', 'tests')
    .option('-x --debug', 'Enable debug related verbose', false)
    .option('-t --timeout <ms>', 'Set the timeout period for tests in milliseconds', 5000)
    .parse(process.argv);

const options = program.opts();
const testDir = options.directory ? path.resolve(process.cwd(), options.directory) : config.testDirectory;
const debug = options.debug || config.debug;
const timeout = parseInt(options.timeout, 10) || config.timeout;

setConfig({
    testDirectory: testDir,
    debug,
    timeout,
});

if (debug) {
    console.log('[DEBUG] CLI Options:', { testDir, debug, timeout });
}

test.setTimeout(timeout);
test.setDebug(debug);
test.setTestDirectory(testDir);

if (debug) {
    console.log('[DEBUG] Running tests via CLI.');
}

(async () => {
    try {
        console.log(`\x1b[32m${figlet.textSync('TestLab.JS', { horizontalLayout: 'full' })}\x1b[0m\n`);
        console.log(`\x1b[36m${figlet.textSync('NodeBySam', 'mini')}\x1b[0m\n`);
        console.log(`\x1b[36mVersion:\x1b[0m ${version}\n`);
        console.log(`\x1b[34mTestLab.js\x1b[0m - Running tests in directory: \x1b[36m${testDir}\x1b[0m\n`);
        
        await test.runTests();
    } catch (error) {
        console.error(`\x1b[31mError running tests:\x1b[0m ${error}`);
        process.exit(1);
    }
})();