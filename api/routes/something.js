const express = require('express');

const router = new express.Router();

// Something
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
  const result = await res.locals.db.something.findAll({
    include: [res.locals.db.anything, res.locals.db.tag],
    order: orderArray,
    limit: req.query.limit || 10,
  });
  res.send(result);
});

router.get('/:id', async (req, res, next) => {
  const result = await res.locals.db.something.findByPk(req.params.id, {
    include: [res.locals.db.anything, res.locals.db.tag],
  });
  if (!result) {
    res.send(404);
    return;
  }
  res.send(result);
});

router.post('/', async (req, res, next) => {
  const newSomething = await res.locals.db.something.create({
    title: req.body.title,
  });
  res.send(newSomething);
});

router.patch('/:id', async (req, res, next) => {
  const something = await res.locals.db.something.findByPk(req.params.id);
  console.log("FOUND", something);

  if (req.body.addTags && Array.isArray(req.body.addTags)) {
    await something.addTags(req.body.addTags);
  }

  if (req.body.removeTags && Array.isArray(req.body.removeTags)) {
    await something.removeTags(req.body.removeTags);
  }

  const newData = {
    title: req.body.title,
    private: typeof req.body.private === 'boolean' ? req.body.private : undefined,
  };

  // Chech if there is something to change
  let updatedSomething = something;
  if (Object.keys(newData).length > 0) {
    updatedSomething = await something.update(newData);
  }

  res.send(updatedSomething);
});

router.delete('/:id', async (req, res, next) => {
  try {
    await res.locals.db.something.destroy({
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
