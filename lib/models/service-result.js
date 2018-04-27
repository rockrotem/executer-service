class ServiceResult {
  constructor() {
    this.ok = true;
    this.code = 200;
    this.message = '';
    this.hasException = false;
    this.exception = null;
    this.errors = null; // Array of errors
    this.data = null;
  }
}

module.exports = ServiceResult;
