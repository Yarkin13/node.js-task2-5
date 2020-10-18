const imitatedDB = require('../../common/imitateDB');

const getAll = async () => {
  /* throw new Error(); */
  return imitatedDB.getAllUser();
};

const get = async id => {
  const user = imitatedDB.getUser(id);
  return user;
};

const create = async user => {
  return imitatedDB.pushUser(user);
};

const put = async (id, newDataUser) => {
  return imitatedDB.putUser(id, newDataUser);
};

const deleteUser = async id => {
  return imitatedDB.deleteUser(id);
};

module.exports = { getAll, get, create, put, deleteUser };
