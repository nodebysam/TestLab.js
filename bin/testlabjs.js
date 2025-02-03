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

const TestLabJS = require('../lib');
const config = require('../lib/config');

const testlabjs = new TestLabJS();
testlabjs.configure(config);

(async () => {
    await testlabjs.runFromCLI();
})();