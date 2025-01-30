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

const fs = require('fs');
const path = require('path');

/**
 * Loads the test files.
 */
class TestLoader {
    /**
     * Creates a new instance of TestLoader.
     * 
     * @param {string} testDirectory - The test directory to where the test files are (leave null or auto-detect).
     */
    constructor(testDirectory = null) {
        this.testDirectory = testDirectory;
        this.testFiles = [];
    }

    /**
     * Loads the test files from the given directory (including sub-directories).
     * 
     * @param {string} directory - The directory to load test files from.
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

            } else if (stat.isFile() && file.endsWith('.test.js')) {
                if (file.endsWith('.test.js')) {
                    this.testFiles.push(fullPath);
                }
            }
        });
    }

    /**
     * If no test directory is provided, scans the entire project for test files that match the test.js pattern.
     * Otheriwse, it loads from the provided test directory.
     */
    load() {
        if (this.testDirectory) {
            this.loadTestsFromDirectory(this.testDirectory);
        } else {
            this.scanProjectForTests(process.cwd());
        }
    }

    /**
     * Scans the entire project directory for the test files (e.g., files ending with .test.js).
     * 
     * @param {string} directory - The root directory to start scanning.
     */
    scanProjectForTests(directory) {
        const files = fs.readdirSync(directory);

        files.forEach(file => {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {

            } else if (stat.isFile() && file.endsWith('.test.js')) {
                if (file.endsWith('.test.js')) {
                    this.testFiles.push(fullPath);
                }
            }
        });
    }
    
    /**
     * Get the array of test files.
     * 
     * @returns {Array} An array of test files.
     */
    getTestFiles() {
        return this.testFiles;
    }
}

module.exports = TestLoader;