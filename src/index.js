const express = require('express');
const { apiRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use('/', apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
