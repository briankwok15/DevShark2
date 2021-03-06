const express = require('express');
const path = require('path');
const app = express();
const resourceRouter = require('./routes/resourceRouter');
const authRouter = require('./routes/authRouter');
const commentsRouter = require('./routes/commentsRouter');
const testRouter = require('./routes/testRouter');
// const commentsRouter = require('./routes/commentsRouter');
// const oauthRouter = require('./routes/oauthRouter');
const PORT = 3000;
const cors = require('cors');

// Parse request body
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routers
app.use('/resource/test', testRouter);
app.use('/resource/auth', authRouter);
app.use('/comments', commentsRouter);
app.use('/resource', resourceRouter);
// Send main app
app.get('/*', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, './client/index.html'));
});

// Catch-all route handler
app.use('*', (req, res) => {
  return res.sendStatus(404);
});

// Global error handler
app.use((err, req, res, next) => {
  console.log('invoking global error handler');
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
