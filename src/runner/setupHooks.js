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
let afterTestHook = null;
let beforeAllTestsHook = null;
let afterAllTestsHook = null;

/**
 * Set the beforeTest hook that will be called before each test.
 * 
 * @param {Function} hook - The function to execute before each test.
 */
const beforeTest = (hook) => {
    beforeTestHook = hook;
};

/**
 * Set the afterTest hook that will be called after each test.
 * 
 * @param {Function} hook - The function to execute after each test.
 */
const afterTest = (hook) => {
    afterTestHook = hook;
};

/**
 * Set the beforeAllTests hook that will be called before all tests.
 * 
 * @param {Function} hook - The function to execute before all tests.
 */
const beforeAllTests = (hook) => {
    beforeAllTestsHook = hook;
};

/**
 * Set the afterAllTests hook that will be called after all tests.
 * 
 * @param {Function} hook - The function to execute after all tests.
 */
const afterAllTests = (hook) => {
    afterAllTestsHook = hook;
};

/**
 * Execute the beforeTest hook if defined.
 * 
 * @param {TestRunner} runner - The TestRunner instance. 
 */
const runBeforeTest = async (runner) => {
    if (beforeTestHook) {
        await beforeTestHook(runner);
    }
};

/**
 * Execute the afterTest hook if defined.
 * 
 * @param {TestRunner} runner - The TestRunner instance.
 */
const runAfterTest = async (runner) => {
    if (afterTestHook) {
        await afterTestHook(runner);
    }
};

/**
 * Execute the beforeAllTests hook if defined.
 * 
 * @param {TestRunner} runner - The TestRunner instance.
 */
const runBeforeAllTests = async (runner) => {
    if (beforeAllTestsHook) {
        await beforeAllTestsHook(runner);
    }
};

/**
 * Execute the afterAllTests hook if defined.
 * 
 * @param {TestRunner} runner - The TestRunner instance.
 */
const runAfterAllTests = async (runner) => {
    if (afterAllTestsHook) {
        await afterAllTestsHook(runner);
    }
};

/**
 * Returns all the current hooks.
 * 
 * @returns {Object} An object containing all the current hooks.
 */
const getAllHooks = () => {
    return {
        beforeAllTestsHook,
        beforeTestHook,
        afterAllTestsHook,
        afterTestHook,
    };
};

module.exports = {
    beforeTest,
    afterTest,
    runBeforeTest,
    runAfterTest,
    beforeAllTests,
    afterAllTests,
    runBeforeAllTests,
    runAfterAllTests,
    getAllHooks,
};