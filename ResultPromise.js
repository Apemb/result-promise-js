const Result = require('./Result');

Promise.prototype.thenForSuccess = function(callBack) {
  return this.then((value) => {
    if (value instanceof Result && value.isSuccess) {
      return this.then(callBack);
    } else {
      return this;
    }
  });
};

Promise.prototype.thenForFailure = function(callBack) {
  return this.then((value) => {
    if (value instanceof Result && value.isFailure) {
      return this.then(callBack);
    } else {
      return this;
    }
  });
};

