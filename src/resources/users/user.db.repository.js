const AnyError = require('../../common/AnyError');
const Task = require('../tasks/task.model');
const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const get = async id => {
  const user = await User.findOne({ _id: id });
  if (!user) throw new AnyError(404, 'Not found');
  return user;
};

const create = async user => {
  return User.create(user);
};

const put = async (id, newDataUser) => {
  const user = await User.findOne({ _id: id });
  if (user) return User.updateOne({ _id: id }, newDataUser);
  throw new AnyError(404, 'Not found');
};

const deleteUser = async id => {
  const user = await User.findOne({ _id: id });
  if (user) {
    await Task.updateMany({ userId: id }, { $set: { userId: null } });
    User.deleteOne({ _id: id });
  } else throw new AnyError(404, 'Not found');
};

module.exports = { getAll, get, create, put, deleteUser };
