const boardsRepo = require('./boards.db.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const put = (id, newDataBoard) => boardsRepo.put(id, newDataBoard);

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, get, create, deleteBoard, put };
