const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);

const create = task => tasksRepo.create(task);

const put = (boardId, taskId, newDataTask) =>
  tasksRepo.put(boardId, taskId, newDataTask);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = { getAll, create, get, deleteTask, put };
