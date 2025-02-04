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

const testlabjs = require('../lib/index');
const config = require('../lib/config');

testlabjs.configure(config);

(async () => {
    await testlabjs.runFromCLI();
})();