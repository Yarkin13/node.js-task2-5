const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const put = (id, newDataUser) => usersRepo.put(id, newDataUser);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, get, create, put, deleteUser };
