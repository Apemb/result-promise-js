const Result = require('./Result');

class ResultPromise extends Promise {

  thenForSuccess(callBack) {
    return this.then((value) => {
      if (value instanceof Result && value.isSuccess) {
        return this.then(callBack);
      } else {
        return this;
      }
    });
  }

  thenForFailure(callBack) {
    return this.then((value) => {
      if (value instanceof Result && value.isFailure) {
        return this.then(callBack);
      } else {
        return this;
      }
    });
  }

  static resolveAsSuccess(value) {
    const resultValue = Result.Success(value);
    return Promise.resolve(resultValue);
  };

  static resolveAsFailure(value) {
    const resultValue = Result.Failure(value);
    return Promise.resolve(resultValue);
  };
}

module.exports = ResultPromise;
