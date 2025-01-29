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
    not,
    notEqual,
    notGreaterThan,
    notLessThan,
    notInstanceOf,
} = require('../../src/assertions/not');

test('not › should assert strict inequality of values', t => {
    not(5, '5', 'Should assert that 5 is not strictly equal to "5"');
    t.notThrows(() => not(5, '5'));

    const error = t.throws(() => not(5, 5), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected 5 not to be strictly equal to 5/);
});

test('notEqual › should assert loose inequality of values', t => {
    notEqual(5, 6, 'Should assert that 5 is not loosely equal to 6');
    t.notThrows(() => notEqual(5, 6));

    const error = t.throws(() => notEqual(5, '5'), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected 5 not to be loosely equal to 5/);
});

test('notGreaterThan › should assert that a value is not greater than the expected value', t => {
    notGreaterThan(5, 10, 'Should assert that 5 is not greater than 10');
    t.notThrows(() => notGreaterThan(5, 10));

    const error = t.throws(() => notGreaterThan(10, 5), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected 10 to not be greater than 5/);
});

test('notLessThan › should assert that a value is not less than the expected value', t => {
    notLessThan(10, 5, 'Should assert that 10 is not less than 5');
    t.notThrows(() => notLessThan(10, 5));

    const error = t.throws(() => notLessThan(5, 10), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected 5 to not be less than 10/);
});

test('notInstanceOf › should assert that an object is not an instance of the expected class', t => {
    class MyClass {}
    const myInstance = new MyClass();
    
    notInstanceOf({}, MyClass, 'Should assert that {} is not an instance of MyClass');
    t.notThrows(() => notInstanceOf({}, MyClass));

    const error = t.throws(() => notInstanceOf(myInstance, MyClass), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected \[object Object\] to not be an instance of MyClass/);
});