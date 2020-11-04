const loginRepo = require('./login.db.repository');

const authorize = (login, password) => loginRepo.authorize(login, password);

module.exports = { authorize };
