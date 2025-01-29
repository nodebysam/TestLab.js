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
const {
    beforeTest,
    afterTest,
    runBeforeTest,
    runAfterTest,
    beforeAllTests,
    afterAllTests,
    runBeforeAllTests,
    runAfterAllTests,
    getAllHooks,
} = require('../../src/runner/setupHooks');

let testRunner;

test.beforeEach(() => {
    testRunner = {};
});

test('beforeTest › should set a beforeTest hook', async t => {
    const hook = () => {
        return 'beforeTest hook executed';
    };

    beforeTest(hook);
    await runBeforeTest(testRunner);

    const hooks = getAllHooks();    
    t.true(hooks.beforeTestHook instanceof Function, 'The beforeTest hook should be correctly set');
});

test('afterTest › should set an afterTest hook', async t => {
    const hook = () => {
        return 'afterTest hook executed';
    };

    afterTest(hook);
    await runAfterTest(testRunner);

    const hooks = getAllHooks();
    t.true(hooks.afterTestHook instanceof Function, 'The afterTest hook should be correctly set');
});

test('beforeAllTests › should set a beforeAllTests hook', async t => {
    const hook = () => {
        return 'beforeAllTests hook executed';
    };

    beforeAllTests(hook);
    await runBeforeAllTests(testRunner);

    const hooks = getAllHooks();
    t.true(hooks.beforeAllTestsHook instanceof Function, 'The beforeAllTests hook should be correctly set');
});

test('afterAllTests › should set an afterAllTests hook', async t => {
    const hook = () => {
        return 'afterAllTests hook executed';
    };

    afterAllTests(hook);
    await runAfterAllTests(testRunner);

    const hooks = getAllHooks();
    t.true(hooks.afterAllTestsHook instanceof Function, 'The afterAllTests hook should be correctly set');
});

test('runBeforeTest › should execute beforeTest hook before each test', async t => {
    let hookExecuted = false;
    beforeTest(() => {
        hookExecuted = true;
    });

    await runBeforeTest(testRunner);
    
    t.true(hookExecuted, 'The beforeTest hook should be executed before the test');
});

test('runAfterTest › should execute afterTest hook after each test', async t => {
    let hookExecuted = false;
    afterTest(() => {
        hookExecuted = true;
    });

    await runAfterTest(testRunner);
    
    t.true(hookExecuted, 'The afterTest hook should be executed after the test');
});

test('runBeforeAllTests › should execute beforeAllTests hook before all tests', async t => {
    let hookExecuted = false;
    beforeAllTests(() => {
        hookExecuted = true;
    });

    await runBeforeAllTests(testRunner);
    
    t.true(hookExecuted, 'The beforeAllTests hook should be executed before all tests');
});

test('runAfterAllTests › should execute afterAllTests hook after all tests', async t => {
    let hookExecuted = false;
    afterAllTests(() => {
        hookExecuted = true;
    });

    await runAfterAllTests(testRunner);
    
    t.true(hookExecuted, 'The afterAllTests hook should be executed after all tests');
});