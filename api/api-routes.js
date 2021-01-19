const path = require('path');


const express = require('express');
const { Op } = require('sequelize');

const somethingRoutes = require('./routes/something');
const anythingRoutes = require('./routes/anything');
const tagRoutes = require('./routes/tag');

const router = express.Router();

router.use('/something', somethingRoutes);
router.use('/anything', anythingRoutes);
router.use('/tag', tagRoutes);

// router.get('/users/create', async (req, res, next) => {
  //   const newUser = await res.locals.db.user.create({
//     username: req.query.username,
//     password: req.query.password,
//   });
//   res.send(newUser);
// });

// Search all entities
router.get('/search', async (req, res, next) => {
  const sequelizeLike = { [Op.like]: `%${req.query.term}%` };
  const somethings = await res.locals.db.something.findAll({
    attributes: ['id', 'title'],
    where: { title: sequelizeLike },
    limit: 10,
  });
  const anythings = await res.locals.db.anything.findAll({
    where: {
      [Op.or]: [
        { value1: sequelizeLike },
        { value2: sequelizeLike },
      ],
    },
    limit: 10,
  });
  const tags = await res.locals.db.tag.findAll({
    attributes: ['id', 'title'],
    where: { title: sequelizeLike },
    limit: 10,
  });
  res.send({
    somethings,
    anythings,
    tags,
  });
});

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'api-docs.html'));
});

// Catching all API routes so we don't fallback to index.html route in app.
router.all('*', (req, res, next) => {
  res.status(404).json({
    message: 'Path not found',
    path: req.originalUrl,
    ts: new Date(),
  });
});

module.exports = router;
