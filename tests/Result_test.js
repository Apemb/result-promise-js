// Chai
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const Result = require('../Result');

describe('Unit | Result', () => {
  it('should be failed if created with Failure', () => {
    // when
    const failure = Result.Failure(1);
    // then
    expect(failure.isFailure).to.be.true;
    expect(failure.isSuccess).to.be.false;
    expect(failure.value).to.equal(1);
  });

  it('should be success if created with Success', () => {
    // when
    const failure = Result.Success(3);
    // then
    expect(failure.isFailure).to.be.false;
    expect(failure.isSuccess).to.be.true;
    expect(failure.value).to.equal(3);
  });
});

