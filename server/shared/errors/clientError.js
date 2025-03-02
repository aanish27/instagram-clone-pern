class ClientError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "ClientError";
  }
}

module.exports = ClientError;
