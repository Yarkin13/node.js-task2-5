const uuid = require('uuid');
const mongoose = require('mongoose');

/* class Board {
  constructor({
    id = uuid(),
    title = 'TITLE',
    columns = [
      {
        idColumn: uuid(),
        titleColumn: 'TITTLE_COLUMN',
        order: 0
      }
    ]
  } = {}) {
    // eslint-disable-next-line
    (this.id = id), (this.title = title), (this.columns = columns);
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
} */

const boardSchema = new mongoose.Schema({
  title: String,
  columns: [
    {
      idColumn: { type: String, default: uuid },
      order: { type: Number },
      title: { type: String }
    }
  ],
  _id: {
    type: String,
    default: uuid
  }
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
