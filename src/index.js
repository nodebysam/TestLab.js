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

const { test, setTestDirectory, setTimeout, setDebug, testDirectory, timeout, debug, runTests } = require('./testlabjs');

if (require.main === module) {
    (async () => { await runTests(); })();
}

module.exports = {
    test,
    setTestDirectory,
    setTimeout,
    setDebug,
    testDirectory,
    timeout,
    debug,
};