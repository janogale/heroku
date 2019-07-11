const createError = require('http-errors');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const updatesRouter = require('./routes/updates');
const loginRouter = require('./routes/logins');
const usersRouter = require('./routes/users');

// Connecting to the database
mongoose
  .connect('mongodb+srv://meetingHub:Abc321@cluster0-zk18y.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database", err);
  });

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/updates', updatesRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error message
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
