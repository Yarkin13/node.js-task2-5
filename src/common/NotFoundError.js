class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Not found';
    this.status = 404;
  }
}

module.exports = NotFoundError;
