const imitatedDB = require('../../common/imitateDB');

const getAll = async () => {
  return imitatedDB.getAllBoards();
};

const get = async id => {
  const board = imitatedDB.getBoard(id);
  return board;
};

const create = async board => imitatedDB.pushBoard(board);

const put = async (id, newDataBoard) => imitatedDB.putBoard(id, newDataBoard);

const deleteBoard = async id => imitatedDB.deleteBoard(id);

module.exports = { getAll, get, create, deleteBoard, put };
