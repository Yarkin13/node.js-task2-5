const imitatedDB = require('../../common/imitateDB');

const getAll = async boardId => {
  return imitatedDB.getAllTasks(boardId);
};

const get = async (boardId, taskId) => {
  const task = imitatedDB.getTask(boardId, taskId);

  if (!task) throw new Error(`The user with id: ${taskId} was not found`);

  return task;
};

const create = async task => {
  return imitatedDB.pushTask(task);
};

const put = async (boardId, taskId, newDataTask) => {
  return imitatedDB.putTask(boardId, taskId, newDataTask);
};

const deleteTask = async (boardId, taskId) => {
  return imitatedDB.deleteTask(boardId, taskId);
};

module.exports = { getAll, create, get, deleteTask, put };
