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
    is,
    isEqual,
    isGreaterThan,
    isLessThan,
    isInstanceOf,
} = require('../../src/assertions/is');

test('is › should assert strict equality of values', t => {
    is(5, 5, 'Should assert that 5 is strictly equal to 5');
    t.notThrows(() => is(5, 5));
    
    const error = t.throws(() => is(5, '5'), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected \d+ but received \d+/);
});

test('isEqual › should assert loose equality of values', t => {
    isEqual(5, '5', 'Should assert that 5 and "5" are loosely equal');
    t.notThrows(() => isEqual(5, '5'));
    
    const error = t.throws(() => isEqual(5, 6), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected \d+ but received \d+/);
});

test('isGreaterThan › should assert that a value is greater than the expected value', t => {
    isGreaterThan(10, 5, 'Should assert that 10 is greater than 5');
    t.notThrows(() => isGreaterThan(10, 5));

    const error = t.throws(() => isGreaterThan(5, 10), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected \d+ to be greater than \d+/);
});

test('isLessThan › should assert that a value is less than the expected value', t => {
    isLessThan(5, 10, 'Should assert that 5 is less than 10');
    t.notThrows(() => isLessThan(5, 10));

    const error = t.throws(() => isLessThan(10, 5), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected \d+ to be less than \d+/);
});

test('isInstanceOf › should assert that an object is an instance of the expected class', t => {
    class MyClass {}
    const myInstance = new MyClass();
    
    isInstanceOf(myInstance, MyClass, 'Should assert that the object is an instance of MyClass');
    t.notThrows(() => isInstanceOf(myInstance, MyClass));

    const error = t.throws(() => isInstanceOf({}, MyClass), { instanceOf: Error });
    t.regex(error.message, /Assertion failed: expected \[object Object\] to be an instance of MyClass/);
});