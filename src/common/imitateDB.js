const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

class DB {
  constructor() {
    this.users = [
      new User({
        login: 'new Login 1',
        name: 'new Name 1',
        password: 'new Password 1'
      }),
      new User({
        login: 'new Login 2',
        name: 'new Name 2',
        password: 'new Password 2'
      }),
      new User({
        login: 'new Login 3',
        name: 'new Name 3',
        password: 'new Password 3'
      })
    ];
    this.boards = [
      new Board({
        title: 'new title_board 1',
        column: [
          {
            title: 'new title_column 1',
            order: 0
          }
        ]
      }),
      new Board({
        title: 'new title_board 2',
        column: [
          {
            title: 'new title_column 2',
            order: 0
          }
        ]
      })
    ];
    this.tasks = [new Task(), new Task()];
  }

  getAllUser() {
    return this.users;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  pushUser(user) {
    this.users.push(user);
    return user;
  }

  putUser(id, newDataUser) {
    const oldUserDataIndex = this.users.findIndex(user => user.id === id);
    this.users[oldUserDataIndex] = {
      ...this.users[oldUserDataIndex],
      ...newDataUser,
      id: this.users[oldUserDataIndex].id
    };
    return this.users[oldUserDataIndex];
  }

  deleteUser(id) {
    const indexUserForDelete = this.users.findIndex(user => user.id === id);
    this.users.splice(indexUserForDelete, 1);
    if (this.tasks.length !== 0) {
      this.tasks.map(task => {
        if (task.userId === id) {
          task.userId = null;
          return task;
        }
        return task;
      });
    }
  }

  getAllBoards() {
    return this.boards;
  }

  getBoard(id) {
    return this.boards.find(board => board.id === id);
  }

  pushBoard(board) {
    this.boards.push(board);
    return board;
  }

  putBoard(id, newDataBoard) {
    const oldBoardDataIndex = this.boards.findIndex(board => board.id === id);
    this.boards[oldBoardDataIndex] = {
      ...this.boards[oldBoardDataIndex],
      ...newDataBoard,
      id: this.boards[oldBoardDataIndex].id
    };
    return this.boards[oldBoardDataIndex];
  }

  deleteBoard(id) {
    const indexBoardForDelete = this.boards.findIndex(board => board.id === id);
    this.boards.splice(indexBoardForDelete, 1);
    this.tasks = this.tasks.filter(task => task.boardId !== id);
  }

  getAllTasks(boardId) {
    return this.tasks.filter(task => task.boardId === boardId);
  }

  pushTask(task) {
    this.tasks.push(task);
    return task;
  }

  getTask(boardId, taskId) {
    return this.tasks
      .filter(task => task.boardId === boardId)
      .find(task => task.id === taskId);
  }

  putTask(boardId, taskId, newDataTask) {
    const indexTaskForUpdate = this.tasks.findIndex(
      task => task.id === taskId && task.boardId === boardId
    );
    this.tasks[indexTaskForUpdate] = {
      ...this.tasks[indexTaskForUpdate],
      ...newDataTask,
      id: this.tasks[indexTaskForUpdate].id
    };

    return this.tasks[indexTaskForUpdate];
  }

  deleteTask(boardId, taskId) {
    const indexTaskForDelete = this.tasks.findIndex(
      task => task.id === taskId && task.boardId === boardId
    );
    this.tasks.splice(indexTaskForDelete, 1);
  }
}

module.exports = new DB();
