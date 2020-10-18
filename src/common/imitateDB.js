const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const NotFoundError = require('./NotFoundError');

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
    const currentUser = this.users.find(user => user.id === id);
    if (currentUser !== undefined) return currentUser;
    throw new NotFoundError();
  }

  pushUser(user) {
    this.users.push(user);
    return user;
  }

  putUser(id, newDataUser) {
    const oldUserDataIndex = this.users.findIndex(user => user.id === id);
    if (oldUserDataIndex !== -1) {
      this.users[oldUserDataIndex] = {
        ...this.users[oldUserDataIndex],
        ...newDataUser,
        id: this.users[oldUserDataIndex].id
      };
      return this.users[oldUserDataIndex];
    }
    throw new NotFoundError();
  }

  deleteUser(id) {
    const indexUserForDelete = this.users.findIndex(user => user.id === id);
    if (indexUserForDelete !== -1) {
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
    } else throw new NotFoundError();
  }

  getAllBoards() {
    return this.boards;
  }

  getBoard(id) {
    const currentBoard = this.boards.find(board => board.id === id);
    if (currentBoard !== undefined) return currentBoard;
    throw new NotFoundError();
  }

  pushBoard(board) {
    this.boards.push(board);
    return board;
  }

  putBoard(id, newDataBoard) {
    const oldBoardDataIndex = this.boards.findIndex(board => board.id === id);
    if (oldBoardDataIndex !== -1) {
      this.boards[oldBoardDataIndex] = {
        ...this.boards[oldBoardDataIndex],
        ...newDataBoard,
        id: this.boards[oldBoardDataIndex].id
      };
      return this.boards[oldBoardDataIndex];
    }
    throw new NotFoundError();
  }

  deleteBoard(id) {
    const indexBoardForDelete = this.boards.findIndex(board => board.id === id);
    if (indexBoardForDelete !== -1) {
      this.boards.splice(indexBoardForDelete, 1);
      this.tasks = this.tasks.filter(task => task.boardId !== id);
    } else throw new NotFoundError();
  }

  getAllTasks(boardId) {
    const tasks = this.tasks.filter(task => task.boardId === boardId);
    if (tasks.length !== 0) return tasks;
    throw new NotFoundError();
  }

  pushTask(task) {
    this.tasks.push(task);
    return task;
  }

  getTask(boardId, taskId) {
    const currentTask = this.tasks.find(
      task => task.id === taskId && task.boardId === boardId
    );
    if (currentTask !== undefined) return currentTask;
    throw new NotFoundError();
  }

  putTask(boardId, taskId, newDataTask) {
    const indexTaskForUpdate = this.tasks.findIndex(
      task => task.id === taskId && task.boardId === boardId
    );
    if (indexTaskForUpdate !== -1) {
      this.tasks[indexTaskForUpdate] = {
        ...this.tasks[indexTaskForUpdate],
        ...newDataTask,
        id: this.tasks[indexTaskForUpdate].id
      };

      return this.tasks[indexTaskForUpdate];
    }
    throw new NotFoundError();
  }

  deleteTask(boardId, taskId) {
    const indexTaskForDelete = this.tasks.findIndex(
      task => task.id === taskId && task.boardId === boardId
    );
    if (indexTaskForDelete !== -1) this.tasks.splice(indexTaskForDelete, 1);
    else throw new NotFoundError();
  }
}

module.exports = new DB();
