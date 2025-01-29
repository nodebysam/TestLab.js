# TestLab.js
**"Test Smarter, Not Harder!"**

TestLab.js is a simple, lightweight JavaScript testing framework designed to make unit testing a breeze. It includes useful assertions, easy test setup, hooks, and support for custom reporters. Whether you're testing a small function or running a full suite of tests, TestLab.js helps you test your code effectively and efficiently.

---

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Custom Reporter](#custom-reporter)
- [Test Timeout](#test-timeout)
- [Assertions](#assertions)
- [Custom Settings](#custom-settings)
- [Contributing](#contributing)
- [License](#license)
- [Additional Features](#additional-features)
- [Contact Information](#conact-information)

---

## Installation

To install TestLab.js, use npm:

```bash
npm install testlab.js --save-dev
```

or yarn:

```bash
yarn add testlab.js --dev
```

This will install TestLab.js as a development dependency in your project.

## Usage
Here's the basic example to get started with TestLab.js:

```javascript
const testlabjs = require('testlab.js'); // Import TestLab.js

// Example test
testlabjs('should add two numbers', t => {
    const result = 1 + 2;
    t.is(result, 3); // Assert that result is 3
});
```

Here's a more advanced example of using TestLab.js:

```javascript
const testlabjs = require('testlab.js'); // Import TestLab.js

// Execute a method before any tests start
testlabjs.beforeAllTests(t => {
    t.name = 'John Smith;'; // Add a value to the t object
    t.mockValue = [];
    console.log('I have executed before any tests start');
});

// Execute a method before each single test
testlabjs.beforeTest(t => {
    t.mockValue = [1, 2, 3];
});

// Example test
testlabjs('Does the mock method throw an error and is it the expected message', t => {
    const mock = () => { throw Error('This is part one of the message : this is part two of the message') };
    const error = t.throws(() => mock()); // Executes the mock function and checks for thrown error
    t.regex(error.message, /message/); // Check if the message contans the word "message"
});

// Execute a method after each single test
testlabjs.afterTest(() => {
    console.log('I have executed after each test');
});

// Execute a method after all tests have ran
testlabjs.afterAllTests(() => {
    console.log('I have executed after all tests have ran');
});
```

## Running Tests
To run your tests, use the following script:

```bash
testlabjs
```

You can also include arguments, for example:

```bash
testlabjs -d 'path/to/tests' -t 20000
```

Below are all the available argument options:

### -d --directory <path>:
* __Description:__ Specifies the directory where your test files are located. This option allows you to define the folder or path containing the tests you want to execute.
* __Usage Example:__
```bash
testlabjs -d ./tests
```
This will tell TestLab.js to look for test files in the ./tests directory.

### -o --output <file>:
* __Description:__  Defines the file where the test results will be saved. This is useful if you want to store your test outcomes in a file instead of just seeing them in the console.
* __Usage Example:__
```bash
testlabjs -o results.json
```
This will save the results in a results.json file.

### -e --enablereport:
* __Description:__ Enables reporting for the test execution process. When activated, this flag will make sure that detailed reports are generated, which can include information about the passed and failed tests, execution time, and other useful metrics.
* __Usage Example:__
```bash
testlabjs -e
```
This will activate the report generation feature during test execution.

### -r --reporter <type>:
* __Description:__ Specifies which reporter to use for displaying the test results. The two main options typically available are console (default) and json. Each reporter presents the test results in a different format.
    * __console:__ Displays results in a human-readable format in the console.
    * __json:__ Outputs the test results in a JSON format, suitable for programmatic processing or further analysis.
* __Usage Example:__
```bash
testlabjs -r json
```
This will set the reporter to output the results in JSON format.

### -p --reportpath <path>: 
* __Description:__ Defines the path where the test report will be saved. If the report is being output to a file (via __-o__ or __--output__), this flag can specify the folder or directory for storing the report.
* __Usage Example:__
```bash
testlabjs -p ./test-reports
```
This will save the report in the ./test-reports directory.

### -x --debug:
* __Description:__ Enables debug mode during the test execution. When this option is active, additional debug information will be printed to the console, which can be helpful for diagnosing issues with the tests or the framework itself.
* __Usage Example:__
```bash
testlabjs -x
```
This will enable debug mode and display more detailed information about the test execution process.

### -t --timeout <ms>:
* __Description:__ Sets a custom timeout (in milliseconds) for individual tests. If a test exceeds the specified time, it will be aborted, and an error will be reported. This is useful to avoid tests running indefinitely due to unforeseen issues or delays.
* __Usage Example:__
```bash
testlabjs -t 10000
```
This will set the timeout to 10,000 milliseconds (10 seconds) for each test.

## Custom Reporter
You can configure TestLab.js to use either a console or JSON reporter. By default, it will output results to the console, but you can change it:

```javascript
const testlabjs = require('testlab.js'); // Import TestLab.js
testlabjs.
```

## Test Timeout
Set a timeout for your tests to prevent them from handing indefinitely:

```javascript
const testlabjs = require('testlab.js); // Import TestLab.js

// Set the timeout
testlabjs.setTimeout(10000);
```

## Assertions
TestLab.js comes with several built-in assertions for different use cases. Here’s a complete list of available assertions (and more to come in future versions):

### Equality
* __t.deepEqual(actual, expected, message = '')__
  Asserts that the __action__ value is deeply equal to the __expected__ value. Useful for comparing objects and arrays.
* __t.is(actual, expected, message = '')__
  Asserts that the __actual__ value is strictly equal to the __expected__ value (using __===__).
* __t.isEqual(actual, expected, message = '')__
  Similar to __t.is()__, but allows for type coersion.

### Comparion
* __t.isGreaterThan(actual, expected, message = '')__
  Asserts that the __actual__ value is greater than the __expected__ value.
* __t.isLessThan(actual, expected, message = '')__
  Asserts that the __actual__ value is less than the __expected__ value.

### Type and Instance
* __t.isInstanceOf(actual, constructor, message = '')__
  Asserts the that the __actual__ value is an instance of the given __constructor__ function.

### Negations
* __t.not(actual, expected, message = '')__
  Asserts that the __actual__ value is not equal to the  __expected__ value.
* __t.notEqual(actual, expected, message = '')__
  Asserts that the __actual__ value is not equal to the __expected__ value (using __!==__).
* __t.notGreaterThan(actual, expected, message = '')__
  Assert that the __actual__ value is not greater than the __expected__ value.
* __t.notLessThan(actual, expected, message = '')__
  Asserts that the __actual__ value is not less than the __expected__ value.
* __t.notInstanceOf(actual, constructor, message = '')__
  Asserts that the __actual__ value is not an instance of the given constructor.

### Throws Assertions
* __t.throws(fn, message = '')__
  Asserts that the given function __fn__ throws an error when executed.
* __t.throwsAsync(fn, message = '')__
  Asserts that the given asynchronous function __fn__ throws an error when executed.
* __t.notThrows(fn, message = '')__
  Asserts that the given function __fn__ does not throw an error when executed.
* __t.nowThrowsAsync(fn, message = '')__
  Asserts that the given asychronous fuction __fn__ does not throw an error when executed.  

### Boolean Assertions
* __t.true(value, message = '')__
  Asserts that the __value__ is truthy (i.e., evaluates to __true__).
* __t.false(value, message = '')__
  Asserts that the __value__ is falsy (i.e., evaluates to __false__).

## Custom Settings
TestLab.js allows you to modify all the available configuration values. To set a setting value:
```javascript
const testlabjs = require('testlab.js'); // Import TestLab.js

// Set a setting
testlabjs.setReporter(testlabjs.Reporter.CONSOLE);
```
To get a setting value:
```javascript
const testlabjs = require('testlab.js'); // Import TestLab.js

// Get a setting value
const value = testlabjs.timeout(); // Gets the timeout value
console.log(`Timeout is ${value}.`);
```

### All Available Settings
* __reporter:__
Specifies which reporter to use for displaying the test results. The two main options typically available are console (default) and json. Each reporter presents the test results in a different format.
* __enableReport:__
Enables reporting for the test execution process. When activated, this flag will make sure that detailed reports are generated, which can include information about the passed and failed tests, execution time, and other useful metrics.
* __reportPath:__
Defines the path where the test report will be saved.
* __reportFile:__
The name of the test report file.
* __testDirectory:__
Specifies the directory where your test files are located. This setting allows you to define the folder or path containing the tests you want to execute.
* __timeout:__
Sets a custom timeout (in milliseconds) for individual tests. If a test exceeds the specified time, it will be aborted, and an error will be reported. This is useful to avoid tests running indefinitely due to unforeseen issues or delays.
* __debug:__
Enables debug mode during the test execution. When this option is active, additional debug information will be printed to the console, which can be helpful for diagnosing issues with the tests or the framework itself.

### Default Settings
Below are the default values for the available settings:
* __reporter:__ Reporter.CONSOLE
* __enableReport:__ false
* __reportPath:__ os.tmpdir()
* __reportFile:__ 'testReport.json'
* __testDirectory:__ path.join(process.cwd(), 'tests)
* __timeout:__ 5000 ms
* __debug:__ false

## Contributing
We welcome contributions to TestLab.js! To contribute:
1. Fork the Repository.
2. Clone your fork to your local machine
3. Create a new branch for your feature or bugfix.
4. Make your changes, add tests if neccessary.
5. Submit a pull request with a clear description of the changes.
Please ensure that your code follows the existing coding style and passes all tests before submitting a pull request.

## License
TestLab.js is released under the [GNU General Public License Version 3, 29 June 2007](https://www.gnu.org/licenses/gpl-3.0.en.html). For full license details, see the [LICENSE](LICENSE) file.

## Additional Features
* __Test Hooks:__ TestLab.js supports setup and teardown hooks, which are executed before or after individual tests or before and after all tests:
    * __beforeTest()__
    * __afterTest()__
    * __beforeAllTests()__
    * __afterAllTests()__
* __Custom Reporters:__ You can implement custom reporters to format and output test results in a way that suits your needs.
* __Diff Output:__ TestLab.js includes diff output to highlight what changed when an assertion fails.

## Conact Information
Main Author: Sam Wilcox
Email: wilcox.sam@gmail.com
GitHub: https://github.com/nodebysam/TestLab.js
Submit bugs at: https://github.com/nodebysam/TestLab.js/issues