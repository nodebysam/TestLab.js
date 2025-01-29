## TestLab.js Version Change Log

* __v0.0.1__ => __v0.0.2__:
    * Fixed bug: 'Error Running tests: TypeError: config.error is not a function'.
* __v0.0.2__ => __v0.0.3__:
    * Was attempting to use "module" in index.js when we are using commonJS, which was not trigging the test executions.
* __v0.0.3__ => __v0.0.4__:
    * Removed unneccessary require in testLoader.js.
    * Fixed a typo in README.md.