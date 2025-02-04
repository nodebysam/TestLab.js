const testlabjs = require('../lib/index');

testlabjs.test('Four plus four should equal four', t => {
    t.is(2 + 2, 4);
});