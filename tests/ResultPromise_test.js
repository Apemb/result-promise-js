// Chai
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const Result = require('../Result');
const { thenForSuccess } = require('../ResultPromise');

describe('Unit | ResultPromise', () => {

  describe('#thenForSuccess', () => {
    it('should pass in thenForSuccess when promise result is a success', () => {
      // when
      return Promise.resolve(Result.Success(1))
        .thenForSuccess((result) => {
          // then
          expect(result.isSuccess).to.be.true;
          expect(result.value).to.equal(1);
          return 3;
        })
        .then((number) => {
          expect(number).to.equal(3);
        });
    });

    it('should not pass in thenForSuccess when promise result is a failure', () => {
      // when
      return Promise.resolve(Result.Failure(1))
        .thenForSuccess((result) => {
          // then
          expect(result.isSuccess).to.be.true;
          return 3;
        })
        .then((result) => {
          expect(result.isSuccess).to.be.false;
          expect(result.value).to.equal(1);
        });
    });
  })

  describe('#thenForFailure', () => {
    it('should pass in thenForFailure when promise result is a failure', () => {
      // when
      return Promise.resolve(Result.Failure(1))
        .thenForFailure((result) => {
          // then
          expect(result.isFailure).to.be.true;
          expect(result.value).to.equal(1);
          return 3;
        })
        .then((number) => {
          expect(number).to.equal(3);
        });
    });

    it('should not pass in thenForFailure when promise result is a success', () => {
      // when
      return Promise.resolve(Result.Success(1))
        .thenForFailure((result) => {
          // then
          expect(result.isFailure).to.be.true;
          return 3;
        })
        .then((result) => {
          expect(result.isFailure).to.be.false;
          expect(result.value).to.equal(1);
        });
    });
  })
});

