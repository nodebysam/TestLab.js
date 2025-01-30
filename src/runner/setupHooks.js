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

let beforeTestHook = null;
let beforeAllTestsHook = null;
let afterTestHook = null;
let afterAllTestsHook = null;

const beforeTest = (hook) => { beforeTestHook = hook; };
const beforeAllTests = (hook) => { beforeAllTestsHook = hook; };
const afterTest = (hook) => { afterTestHook = hook; };
const afterAllTests = (hook) => { afterAllTestsHook = hook; };
const getAllHooks = () => { return { beforeAllTestsHook, beforeTestHook, afterAllTestsHook, afterTestHook }; };

module.exports = {
    beforeTest,
    beforeAllTests,
    afterTest,
    afterAllTests,
    getAllHooks,
};