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

  const result = await res.locals.db.anything.findAll({
    include: [res.locals.db.something],
    order: orderArray,
    limit: req.query.limit || 10,
  });
  res.send(result);
});

router.get('/:id', async (req, res, next) => {
  const result = await res.locals.db.anything.findByPk(req.params.id);
  if (!result) {
    res.send(404);
    return;
  }
  res.send(result);
});

router.post('/', async (req, res, next) => {
  const newAnything = await res.locals.db.anything.create({
    type: req.body.type,
    value1: req.body.value1,
    value2: req.body.value2,
    somethingId: req.body.somethingId,
  });
  res.send(newAnything);
});

router.delete('/:id', async (req, res, next) => {
  try {
    await res.locals.db.anything.destroy({
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
