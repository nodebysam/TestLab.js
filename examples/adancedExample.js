// Importing necessary libraries
const testlab = require('testlab.js');
const chalk = require('chalk');

// A function that fetches data asynchronously (e.g., from an API)
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://valid.url') {
        resolve({ status: 200, data: { message: 'Data fetched successfully!' } });
      } else {
        reject({ status: 404, error: 'Not Found' });
      }
    }, 1000); // Simulating async API call
  });
}

// Custom reporter to display results in a colored format
testlab.setReporter((result) => {
  if (result.passed) {
    console.log(chalk.green('✔ Passed: ') + result.name);
  } else {
    console.log(chalk.red('✘ Failed: ') + result.name);
    console.log(chalk.red('  ' + result.error));
  }
});

// Test suite: Testing asynchronous functions
testlab('Testing fetchData function', async () => {
  try {
    // Test: Valid URL returns expected data
    const response = await fetchData('https://valid.url');
    testlab.assert(response.status === 200, 'Expected status to be 200');
    testlab.assert(response.data.message === 'Data fetched successfully!', 'Expected message to match');

    // Test: Invalid URL should throw an error
    try {
      await fetchData('https://invalid.url');
    } catch (error) {
      testlab.assert(error.status === 404, 'Expected status to be 404');
      testlab.assert(error.error === 'Not Found', 'Expected error message to be "Not Found"');
    }

  } catch (error) {
    testlab.assert(false, `Test failed with unexpected error: ${error.message}`);
  }
});

// Example: Adding timeout to the test to ensure it doesn't hang indefinitely
testlab('Test fetchData with timeout', async () => {
  const timeout = setTimeout(() => {
    testlab.assert(false, 'Test timed out');
  }, 2000); // Timeout after 2 seconds

  try {
    const response = await fetchData('https://valid.url');
    clearTimeout(timeout);
    testlab.assert(response.status === 200, 'Expected status to be 200');
    testlab.assert(response.data.message === 'Data fetched successfully!', 'Expected message to match');
  } catch (error) {
    clearTimeout(timeout);
    testlab.assert(false, `Test failed with unexpected error: ${error.message}`);
  }
});

// To run this test, execute `node <file-name>.js` in your terminal