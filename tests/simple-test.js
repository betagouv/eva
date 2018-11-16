var expect = require('chai').expect;
import TestClass from '../src/app/index.js';

describe('simple tests', function() {
  it('should pass', function() {
    expect(new TestClass("hello").donneMessage()).to.equal("hello");
  });
});
