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

const TestRunner = require('./src/runner/testRunner');
const TestLoader = require('./src/runner/testLoader');
const { beforeTest, afterTest, afterAllTests, beforeAllTests } = require('./src/runner/setupHooks');
const { config, setConfig } = require('./src/config');
const { Reporter } = require('./src/types');

const runner = new TestRunner();

/**
 * Initialize TestLab.js as a callable function.
 * 
 * @param {string} description - The test description.
 * @param {Function} testFn - The test function under test.
 */
const testlabjs = (description, testFn) => {
    const testFile = require.main?.filename || 'unknown';
    runner.test(description, testFn, testFile);
};

testlabjs.beforeTest = (fn) => { beforeTest(fn); };
testlabjs.afterTest = (fn) => { afterTest(fn); };
testlabjs.beforeAllTests = (fn) => { beforeAllTests(fn); };
testlabjs.afterAllTests = (fn) => { afterAllTests(fn); };
testlabjs.Reporter = Reporter;

testlabjs.runTests = async () => {
    const testLoader = new TestLoader(config.testDirectory);
    testLoader.load();
    const testFiles = testLoader.getTestFiles();

    if (testFiles.length === 0) {
        console.error('No test files found');
        return;
    }
   
    const filteredTestFiles = testFiles.filter(file => file !== undefined);

    for (const testFile of filteredTestFiles) {
        try {
            require(testFile);
        } catch (error) {
            console.error(`Error loading test file: ${testFile}`);
            console.error(error);
        }
    }

    runner.setReporter(config.reporter);
    await runner.runTests();
};

testlabjs.setTestDirectory = (dir) => {
    setConfig({ testDirectory: dir });
};

testlabjs.setTimeout = (timeout) => {
    setConfig({ timeout });
};

testlabjs.setReporter = (reporter) => {
    setConfig({ reporter });
};

testlabjs.setEnableReport = (enableReport) => {
    setConfig({ enableReport });
};

testlabjs.setReportPath = (reportPath) => {
    setConfig({ reportPath });
};

testlabjs.setReportFile = (reportFile) => {
    setConfig({ reportFile });
};

testlabjs.setDebug = (debug) => {
    setConfig({ debug });
};

testlabjs.testDirectory = () => {
    return config.testDirectory;
};

testlabjs.timeout = () => {
    return config.timeout;
};

testlabjs.reporter = () => {
    return config.reporter;
};

testlabjs.enableReport = () => {
    return config.enableReport;
};

testlabjs.reportPath = () => {
    return config.reportPath;
};

testlabjs.reportFile = () => {
    return config.reportFile;
};

testlabjs.debug = () => {
    return config.debug;
};

if (require.main !== module) {
    (async () => {
        await testlabjs.runTests();
    })();
}

module.exports = testlabjs;