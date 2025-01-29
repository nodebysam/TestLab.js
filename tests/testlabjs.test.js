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
const _t = require('../src/testlabjs');

test('t.deepEqual should compare values correctly', t => {
    _t.deepEqual({ a: 1 }, { a: 1 });  // Should pass
    t.throws(() => _t.deepEqual({ a: 1 }, { a: 2 }), { message: /Assertion failed: expected 2 but received 1/ });
});

test('t.true should assert that a value is true', t => {
    _t.true(true);  // Should pass
    t.throws(() => _t.true(false), { message: /Assertion failed: expected a truthy value but received false/ });  // Should fail
});

test('t.false should assert that a value is false', t => {
    _t.false(false);  // Should pass
    t.throws(() => _t.false(true), { message: /Assertion failed: expected a falsy value but received true/ });  // Should fail
});

test('t.is should check equality correctly', t => {
    _t.is(1, 1);  // Should pass
    t.throws(() => _t.is(1, 2), { message: /Assertion failed: expected 2 but received 1/ });  // Should fail
});

test('t.isGreaterThan should check if the first value is greater', t => {
    _t.isGreaterThan(2, 1);  // Should pass
    t.throws(() => _t.isGreaterThan(1, 2), { message: /Assertion failed: expected 1 to be greater than 2/ });  // Should fail
});

test('t.isLessThan should check if the first value is less', t => {
    _t.isLessThan(1, 2);  // Should pass
    t.throws(() => _t.isLessThan(2, 1), { message: /Assertion failed: expected 1 to be less than 1/ });  // Should fail
});

test('t.isInstanceOf should check the instance of an object', t => {
    class MyClass {}
    const myObj = new MyClass();
    _t.isInstanceOf(myObj, MyClass);  // Should pass
    t.throws(
        () => _t.isInstanceOf(myObj, Array),
        { message: /Assertion failed: expected \[object Object\] to be an instance of Array/ }
    );
});

test('t.not should assert negation correctly', t => {
    _t.not(true, false);  // Should pass
    t.throws(
        () => _t.not(true, true),
        { message: /Assertion failed: expected true not to be strictly equal to true/ }
    );
});

test('t.throws should handle thrown errors correctly', t => {
    _t.throws(() => { throw new Error('Test error') }, { message: 'Test error' });  // Should pass
    t.throws(() => _t.throws(() => { /* No error */ }), { message: /Assertion failed: expected function to throw an error, but it did not/ });  // Should fail
});