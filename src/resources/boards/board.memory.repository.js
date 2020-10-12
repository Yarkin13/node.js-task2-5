const imitatedDB = require('../../common/imitateDB');

const getAll = async () => {
  return imitatedDB.getAllBoards();
};

const get = async id => {
  const board = imitatedDB.getBoard(id);

  if (!board) throw new Error(`The board with id: ${id} was not found`);

  return board;
};

const create = async board => imitatedDB.pushBoard(board);

const put = async (id, newDataBoard) => imitatedDB.putBoard(id, newDataBoard);

const deleteBoard = async id => imitatedDB.deleteBoard(id);

module.exports = { getAll, get, create, deleteBoard, put };
