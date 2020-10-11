const imitatedDB = require('../../common/imitateDB');

const getAll = async () => {
  return imitatedDB.getAllUser();
};

const get = async id => {
  const user = imitatedDB.getUser(id);

  if (!user) throw new Error(`The user with id: ${id} was not found`);

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
