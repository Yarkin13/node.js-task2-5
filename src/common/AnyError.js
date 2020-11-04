class AnyError extends Error {
  constructor(code, message) {
    super();
    this.message = message;
    this.status = code;
  }
}

module.exports = AnyError;
