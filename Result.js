const SUCCESS = 'success';
const FAILURE = 'failure';

class Result {
  constructor({ status, value }) {
    this.status = status;
    this._value = value;
  }

  /* PUBLIC INTERFACE */
  get isFailure() {
    return this.status === FAILURE;
  }

  get isSuccess() {
    return this.status === SUCCESS;
  }

  get value() {
    return this._value;
  }

  /* PUBLIC CONSTRUCTORS */
  static Success(value) {
    return new Result({
      status: SUCCESS,
      value,
    });
  }

  static Failure(value) {
    return new Result({
      status: FAILURE,
      value,
    });
  }
}

module.exports = Result;
