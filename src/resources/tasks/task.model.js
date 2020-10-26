const uuid = require('uuid');
const mongoose = require('mongoose');

/* class Task {
  constructor({
    id = uuid(),
    title = 'title task',
    order = 0,
    description = 'description',
    userId = 'userId',
    boardId = 'boardId',
    columnId = 'columnId'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(user) {
    const { id, title, order, description, userId, boardId, columnId } = user;
    return { id, title, order, description, userId, boardId, columnId };
  }
} */

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  boardId: String,
  columnId: String,
  order: Number,
  _id: {
    type: String,
    default: uuid
  }
});

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
