const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const bcrypt = require('bcryptjs');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    // eslint-disable-next-line
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = await usersService.create(
      new User({
        login: req.body.login,
        // eslint-disable-next-line
        password: bcrypt.hashSync(password, salt),
        name: req.body.name
      })
    );

    res.json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.put(req.params.id, {
      login: req.body.login,
      name: req.body.name,
      password: req.body.password
    });
    res.json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await usersService.deleteUser(req.params.id);
    res.status(200).send('OK');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
