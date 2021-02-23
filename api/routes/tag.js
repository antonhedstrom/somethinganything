const express = require('express');
const { Op } = require('sequelize');

const router = new express.Router();

// Tags
router.get('/', async (req, res, next) => {
  const filter = {};
  if (req.query.title) {
    filter.title = { [Op.like]: `%${req.query.title}%` };
  }
  const orderArray = [];
  if (req.query.sort_by) {
    req.query.sort_by
      .split(',')
      .forEach((sortOption) => {
        const [
          field,
          order = 'ASC',
        ] = sortOption.split('.');
        orderArray.push([field, order.toUpperCase()]);
      });
  } else {
    orderArray.push(['createdAt', 'DESC']);
  }

  const result = await res.locals.db.tag.findAll({
    attributes: ['id', 'title', 'color'],
    order: orderArray,
    limit: req.query.limit || 10,
    where: filter,
  });
  res.send(result);
});

router.get('/:id', async (req, res, next) => {
  const result = await res.locals.db.tag.findByPk(req.params.id, {
    include: [res.locals.db.something],
  });
  if (!result) {
    res.send(404);
    return;
  }
  res.send(result);
});

router.post('/', async (req, res, next) => {
  const newTag = await res.locals.db.tag.create({
    title: req.body.title,
    color: req.body.color,
  });
  res.send(newTag);
});

router.patch('/:id', async (req, res, next) => {
  const updatedTag = await res.locals.db.tag.update({
    title: req.body.title,
    color: req.body.color,
  }, { where: { id: req.params.id } });
  res.send(updatedTag);
});

router.delete('/:id', async (req, res, next) => {
  try {
    await res.locals.db.tag.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
