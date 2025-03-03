const express = require('express');
const { apiRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use('/', apiRouter);

const PORT = 5000;
const server = app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
