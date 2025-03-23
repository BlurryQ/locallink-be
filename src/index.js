const express = require('express');
const { apiRouter } = require('./routes');
const cors = require('cors');

const app = express();

// Allow requests from your frontend
app.use(
  cors({
    // Change this to your frontend URL
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.json());

app.use('/', apiRouter);

const PORT = 5000;
const server = app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
