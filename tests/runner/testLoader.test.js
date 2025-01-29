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
const fs = require('fs');
const path = require('path');
const TestLoader = require('../../src/runner/testLoader');

// Mock fs and path modules to simulate file system
const fsMock = {
    readdirSync: (dir) => {
        const normalizedDir = path.normalize(dir);

        if (normalizedDir === path.normalize('mockDirectory')) {
            return ['file1.test.js', 'file2.test.js', 'folder'];
        } else if (normalizedDir === path.normalize('mockDirectory/folder')) {
            return ['nestedTest.test.js'];
        }

        return [];
    },
    statSync: (filePath) => {
        const normalizedPath = path.normalize(filePath);

        if (normalizedPath === path.normalize('mockDirectory/file1.test.js') ||
            normalizedPath === path.normalize('mockDirectory/file2.test.js') ||
            normalizedPath === path.normalize('mockDirectory/folder/nestedTest.test.js')) {
            return { isDirectory: () => false, isFile: () => true };
        } else if (normalizedPath === path.normalize('mockDirectory/folder')) {
            return { isDirectory: () => true, isFile: () => false };
        } else if (normalizedPath === path.normalize('mockDirectory')) {
            return { isDirectory: () => true, isFile: () => false };
        } else {
            return { isDirectory: () => false, isFile: () => false };
        }
    }
};

test.beforeEach(() => {
    fs.readdirSync = fsMock.readdirSync;
    fs.statSync = fsMock.statSync;
});

test('TestLoader › should load test files from a given directory', t => {
    const loader = new TestLoader('mockDirectory');
    loader.loadTestsFromDirectory('mockDirectory');

    const files = loader.getTestFiles();
    t.is(files.length, 3, 'There should be 3 test files loaded');
    t.true(files.includes(path.join('mockDirectory', 'file1.test.js')), 'File1 should be included');
    t.true(files.includes(path.join('mockDirectory', 'file2.test.js')), 'File2 should be included');
    t.true(files.includes(path.join('mockDirectory', 'folder', 'nestedTest.test.js')), 'nestedTest should be included');
});

test('TestLoader › should scan the entire project for test files when no directory is specified', t => {
    const loader = new TestLoader();
    loader.scanProjectForTests('mockDirectory');

    const files = loader.getTestFiles();
    t.is(files.length, 3, 'There should be 3 test files found in the project');
    t.true(files.includes(path.join('mockDirectory', 'file1.test.js')), 'File1 should be included');
    t.true(files.includes(path.join('mockDirectory', 'file2.test.js')), 'File2 should be included');
    t.true(files.includes(path.join('mockDirectory', 'folder', 'nestedTest.test.js')), 'nestedTest should be included');
});

test('TestLoader › should get the loaded test files', t => {
    const loader = new TestLoader('mockDirectory');
    loader.loadTestsFromDirectory('mockDirectory');

    const files = loader.getTestFiles();
    t.is(files.length, 3, 'There should be 3 test files loaded');
    t.deepEqual(files, [
        path.join('mockDirectory', 'file1.test.js'),
        path.join('mockDirectory', 'file2.test.js'),
        path.join('mockDirectory', 'folder', 'nestedTest.test.js')
    ], 'Test files should match the expected files');
});