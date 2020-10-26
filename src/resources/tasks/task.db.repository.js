const NotFoundError = require('../../common/NotFoundError');
const Task = require('./task.model');

const getAll = async boardId => {
  const tasks = await Task.find({ boardId });
  if (tasks.length === 0) throw new NotFoundError();
  return tasks;
};

const get = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId });
  if (!task) throw new NotFoundError();
  return task;
};

const create = async task => {
  return Task.create(task);
};

const put = async (boardId, taskId, newDataTask) => {
  const task = await Task.findOne({ _id: taskId, boardId });
  if (!task) throw new NotFoundError();
  else return Task.updateOne({ _id: taskId, boardId }, newDataTask);
};

const deleteTask = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId });
  if (!task) throw new NotFoundError();
  return Task.deleteOne({ _id: taskId, boardId });
};

module.exports = { getAll, create, get, deleteTask, put };
