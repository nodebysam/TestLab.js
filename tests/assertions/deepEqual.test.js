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
const { deepEqual } = require('../../src/assertions/deepEqual');

test('deepEqual › should pass for two equal primitives', t => {
    deepEqual(5, 5);
    t.pass('Primitives 5 and 5 are deeply equal');
});

test('deepEqual › should throw for unequal primitives', t => {
    const error = t.throws(() => deepEqual(5, 6));
    t.regex(error.message, /Assertion failed: expected \d+ but received \d+/);
});

test('deepEqual › should pass for two equal objects with same keys and values', t => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    deepEqual(obj1, obj2);
    t.pass('Objects with same keys and values are deeply equal');
});

test('deepEqual › should throw for objects with different keys', t => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, c: 3 };
    const error = t.throws(() => deepEqual(obj1, obj2));
    t.is(error.message, 'Assertion failed: expected object does not have key b');
});

test('deepEqual › should pass for two equal arrays', t => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    deepEqual(arr1, arr2);
    t.pass('Arrays with same values are deeply equal');
});

test('deepEqual › should throw for arrays of different lengths', t => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    const error = t.throws(() => deepEqual(arr1, arr2));
    t.is(error.message, 'Assertion failed: arrays have different lengths. Expected 2 but received 3');
});

test('deepEqual › should throw for objects with different property values', t => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const error = t.throws(() => deepEqual(obj1, obj2));
    t.regex(error.message, /Assertion failed: expected \d+ but received \d+/);
});

test('deepEqual › should handle circular references', t => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    obj1.b = obj1; // Circular reference
    obj2.b = obj2; // Circular reference

    t.notThrows(() => deepEqual(obj1, obj2));
});

test('deepEqual › should pass for deeply nested objects', t => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 1 } } };
    deepEqual(obj1, obj2);
    t.pass('Deeply nested objects are deeply equal');
});

test('deepEqual › should throw for nested objects with different values', t => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 2 } } };
    const error = t.throws(() => deepEqual(obj1, obj2));
    t.regex(error.message, /Assertion failed: expected \d+ but received \d+/);
});

test('deepEqual › should pass for null values', t => {
    deepEqual(null, null);
    t.pass('Null values are deeply equal');
});

test('deepEqual › should throw for null and non-null values', t => {
    const error = t.throws(() => deepEqual(null, 1));
    t.is(error.message, 'Assertion failed: expected both values to be of the same type');
});