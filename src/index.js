const express = require('express');
const { apiRouter } = require('./routes');
const cors = require('cors');

const app = express();

const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://locallink-fe.netlify.app/', // Netlify frontend
];

// Allow requests from your frontend
app.use(cors());

app.use(express.json());

app.use('/', apiRouter);

const PORT = 5000;
const server = app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
