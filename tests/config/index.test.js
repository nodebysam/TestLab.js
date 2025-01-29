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

const test = require('ava');
const os = require('os');
const path = require('path');
const sinon = require('sinon');
const { config, setConfig } = require('../../src/config');

let sinonInstance;

test.beforeEach(t => {
    // Reset the config object to its default state before each test
    t.context.defaultConfig = {
        reporter: 'Reporter.CONSOLE',
        enableReport: false,
        reportPath: os.tmpdir(),
        reportFile: 'testReport.json',
        testDirectory: path.join(process.cwd(), 'tests'),
        timeout: 5000,
        debug: false,
    };
    Object.assign(config, t.context.defaultConfig);
});

test('Default configuration should match expected values', t => {
    t.deepEqual(config, t.context.defaultConfig);
});

test('setConfig should update scalar values in the configuration', t => {
    setConfig({ timeout: 10000, enableReport: true });

    t.is(config.timeout, 10000);
    t.is(config.enableReport, true);
});

test('setConfig should merge objects if the existing value is an object', t => {
    setConfig({ reporter: 'Reporter.JSON' });

    t.is(config.reporter, 'Reporter.JSON');
});

test('setConfig should only update keys that exist in the configuration', t => {
    setConfig({ invalidKey: 'invalidValue' });

    t.is(config.invalidKey, undefined);
});

test('setConfig should not log debug information if NODE_ENV is "test"', t => {
    setupSinon();
    process.env.NODE_ENV = 'test';
    config.debug = true;

    const consoleLogStub = sinonInstance.stub(console, 'log');

    setConfig({ timeout: 3000 });
    restore();

    t.false(consoleLogStub.called);

    process.env.NODE_ENV = ''; // Reset NODE_ENV
});

const setupSinon = () => {
    sinonInstance = sinon;
};

const restore = () => {
    sinonInstance.restore();
}