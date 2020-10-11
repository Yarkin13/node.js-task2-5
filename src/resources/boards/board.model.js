const uuid = require('uuid');

class Board {
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
}

module.exports = Board;
