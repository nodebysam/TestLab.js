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

const { Command } = require('commander');
const path = require('path');
const program = new Command();
const { config, setConfig } = require('../config');
const { version } = require('../../package.json');
const test = require('../index');
const figlet = require('figlet');

process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', reason => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});

const runTestsCommand = async () => {
    try {
        console.log(`\x1b[32m${figlet.textSync('TestLab.JS', { horizontalLayout: 'full' })}\x1b[0m\n`);
        console.log(`\x1b[36mVersion:\x1b[0m ${version}\n`);
        console.log(`\x1b[34mTestLab.js\x1b[0m - Running tests in directory: \x1b[36m${config.testDirectory}\x1b[0m\n`);
        
        await test.runTests();
    } catch (error) {
        console.error('Error running tests:', error);
        process.exit(1);
    }
};

program
    .name('testlabjs')
    .description('A NodeJS testing framework for running unit tests with ease.')
    .version(version);

program
    .command('run')
    .description('Run the tests')
    .option('-d --directory <path>', 'Specify the test directory (default: "./tests")', 'tests')
    .option('-x --debug', 'Enable debug-related verbose output', false)
    .option('-t --timeout <ms>', 'Set the timeout period for tests in milliseconds', 5000)
    .action(async (options) => {
        const testDir = path.resolve(process.cwd(), options.directory);
        const debug = options.debug;
        const timeout = parseInt(options.timeout, 10);

        setConfig({ testDirectory: testDir, debug, timeout });

        if (debug) {
            console.log('[DEBUG] CLI Options:', { testDir, debug, timeout });
        }

        test.setTimeout(timeout);
        test.setDebug(debug);
        test.setTestDirectory(testDir);

        await runTestsCommand();
    });

program.parse(process.argv);