export default class Util {
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
        this.redirect = null;
        this.token = null
    }
    setSuccess(statusCode, message, data,redirect,token) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'success';
        this.redirect = redirect;
        this.token = token;
    }
    setError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = 'error';
    }
    send(res) {
        const result = {
          status: this.statusCode,
          message: this.message,
          data: this.data,
          redirect : this.redirect,
          token: this.token,
        };
        if (this.type === 'success') {
          return res.status(this.statusCode).json(result);
        }
        return res.status(this.statusCode).json({
          status: this.statusCode,
          message: this.message,
        });
      }
}