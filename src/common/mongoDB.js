const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const Task = require('../resources/tasks/task.model');

// eslint-disable-next-line
const salt = bcrypt.genSaltSync(10);

const users = [
  new User({
    name: 'admin',
    login: 'admin',
    // eslint-disable-next-line
    password: bcrypt.hashSync('admin', salt)
  }),
  new User({
    name: 'user',
    login: 'user',
    password: '654321'
  })
];

const boards = [
  new Board({
    title: 'testBoard1',
    columns: [
      {
        order: 0,
        titleColumn: 'testColumn1'
      }
    ]
  }),
  new Board({
    title: 'testBoard2',
    columns: [
      {
        order: 0,
        titleColumn: 'testColumn2'
      }
    ]
  })
];

const tasks = [
  new Task({
    title: 'testTask1',
    description: 'testDescription1',
    userId: 'testUserId1',
    boardId: 'testBoardId1',
    columnId: 'testColumnId1',
    order: 0
  }),
  new Task({
    title: 'testTask2',
    description: 'testDescription2',
    userId: 'testUserId2',
    boardId: 'testBoardId2',
    columnId: 'testColumnId2',
    order: 0
  })
];

const connectToDB = fn => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    db.dropDatabase();
    console.log('connected to DB');
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    fn();
  });
};

module.exports = connectToDB;
