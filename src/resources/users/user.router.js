const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (err) {
    res.sendStatus(404).send('User not found');
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    })
  );

  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.put(req.params.id, {
    login: req.body.login,
    name: req.body.name,
    password: req.body.password
  });
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.deleteUser(req.params.id);
    res.status(200).send('OK');
  } catch (err) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
