// Importing the TestLab.js framework
const testlab = require('testlab.js');

// A simple function to test
function add(a, b) {
  return a + b;
}

// Write a test case using TestLab.js
testlab('Testing the add function', () => {
  // Assertion: Check if adding 2 + 3 equals 5
  testlab.assert(add(2, 3) === 5, 'Expected 2 + 3 to equal 5');

  // Another assertion: Check if adding -1 + 1 equals 0
  testlab.assert(add(-1, 1) === 0, 'Expected -1 + 1 to equal 0');
});

// To run this test, execute `node <file-name>.js` in your terminal