const User = require('../users/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const AnyError = require('../../common/AnyError');

const authorize = async (login, password) => {
  const candidate = await User.findOne({ login });
  if (candidate) {
    // eslint-disable-next-line
    const passwordResult = bcrypt.compareSync(password, candidate.password);
    if (passwordResult) {
      const token = jwt.sign(
        {
          login: candidate.login,
          userId: candidate._id
        },
        JWT_SECRET_KEY,
        { expiresIn: 3600 }
      );
      return token;
    }
    throw new AnyError(403, 'Forbidden');
  } else {
    throw new AnyError(403, 'Forbidden');
  }
};

module.exports = { authorize };
