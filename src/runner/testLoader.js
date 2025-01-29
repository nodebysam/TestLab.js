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

const { dir } = require('console');
const fs = require('fs');
const path = require('path');

/**
 * TestLoader class to load the test files.
 */
class TestLoader {
    /**
     * Creates a new instance of TestLoader.
     * 
     * @param {string|null} testDirectory - The test directory to where the tests files are (leave null for auto-detect). 
     */
    constructor(testDirectory = null) {
        this.testDirectory = testDirectory || process.cwd();
        this.testFiles = [];
    }

    /**
     * Loads all test files from the specified directory (including subdirectories).
     * This also supports loading files from the whole project if no test directory is specified.
     * 
     * @param {string} directory - The directory to load the test files from.
     */
    loadTestsFromDirectory(directory) {
        if (!fs.existsSync(directory)) {
            return;
        }

        const files = fs.readdirSync(directory);

        files.forEach(file => {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                this.loadTestsFromDirectory(fullPath);
            } else if (stat.isFile() && file.endsWith('.test.js')) {
                if (file.endsWith('.test.js')) {
                    this.testFiles.push(fullPath);
                }
            }
        });
    }

    /**
     * If no test directory is provided, scans the entire project for test files that match test.js pattern.
     * Otherwise, it loads from the provided test directory.
     */
    load() {
        if (this.testDirectory) {
            this.loadTestsFromDirectory(this.testDirectory);
        } else {
            this.scanProjectForTests(process.cwd());
        }
    }

    /**
     * Scans the entire project directory for test files (e.g., files ending with .test.js).
     * 
     * @param {string} directory - The root directory to start scanning.
     */
    scanProjectForTests(directory) {
        const files = fs.readdirSync(directory);

        files.forEach(file => {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                this.scanProjectForTests(fullPath);
            } else if (stat.isFile() && file.endsWith('.test.js')) {
                this.testFiles.push(fullPath);
            }
        });
    }

    /**
     * Gets the loaded test files.
     * 
     * @returns {string[]} An array of test file paths.
     */
    getTestFiles() {
        return this.testFiles;
    }
};

module.exports = TestLoader;