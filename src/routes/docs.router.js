const docs = require('../../docs.json');
const docsRouter = require('express').Router();

docsRouter.get('/', (req, res) => {
  res.status(200).send({ docs });
});

module.exports = { docsRouter };
