const express = require('express');

const router = new express.Router();

// Anything
router.get('/', async (req, res, next) => {
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

  const result = await res.locals.db.Anything.findAll({
    include: [res.locals.db.Something],
    order: orderArray,
    limit: req.query.limit || 10,
  });
  res.send(result);
});

router.get('/:id', async (req, res, next) => {
  const result = await res.locals.db.Anything.findByPk(req.params.id);
  if (!result) {
    res.send(404);
    return;
  }
  res.send(result);
});

router.post('/', async (req, res, next) => {
  const newAnything = await res.locals.db.Anything.create({
    type: req.body.type,
    value1: req.body.value1,
    value2: req.body.value2,
    SomethingId: req.body.SomethingId,
  });
  res.send(newAnything);
});

router.patch('/:id', async (req, res, next) => {
  const anything = await res.locals.db.Anything.findByPk(req.params.id);

  if (req.body.addTags && Array.isArray(req.body.addTags)) {
    await anything.addTags(req.body.addTags.map((tag) => ({ id: tag.id })));
  }

  if (req.body.removeTags && Array.isArray(req.body.removeTags)) {
    await anything.removeTags(req.body.removeTags.map((tag) => ({ id: tag.id })));
  }

  const newData = {
    type: req.body.type,
    value1: req.body.value1,
    value2: req.body.value2,
  };

  // Chech if there is something to change
  let updatedAnything = anything;
  if (Object.keys(newData).length > 0) {
    updatedAnything = await anything.update(newData);
  }

  res.send(updatedAnything);
});

router.delete('/:id', async (req, res, next) => {
  try {
    await res.locals.db.Anything.destroy({
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
