const AnyError = require('../../common/AnyError');
const Task = require('../tasks/task.model');
const Board = require('./board.model');

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findOne({ _id: id });
  if (!board) throw new AnyError(404, 'Not found');
  return board;
};

const create = async board => Board.create(board);

const put = async (id, newDataBoard) => {
  const board = await Board.findOne({ _id: id });
  if (board) return Board.updateOne({ _id: id }, newDataBoard);
  throw new AnyError(404, 'Not found');
};

const deleteBoard = async id => {
  const board = await Board.findOne({ _id: id });
  if (board) {
    await Task.deleteMany({ boardId: id });
    await Board.deleteOne({ _id: id });
  } else throw new AnyError(404, 'Not found');
};

module.exports = { getAll, get, create, deleteBoard, put };
