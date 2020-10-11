const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const task = await taskService.get(req.params.boardId, req.params.taskId);
    res.json(Task.toResponse(task));
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await taskService.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    })
  );

  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await taskService.put(req.params.boardId, req.params.taskId, {
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.body.boardId,
    columnId: req.body.columnId
  });
  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    await taskService.deleteTask(req.params.boardId, req.params.taskId);
    res.status(200).send('OK');
  } catch (err) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
