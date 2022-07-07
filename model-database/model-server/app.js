var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');  //起始页面
const usersRouter = require('./routes/users');  //用户管理
const sampleRouter = require('./routes/sample-info'); //模型数据库样品管理
const devclientRouter = require('./routes/device/device-client');  //设备客户端
const deviceRouter = require('./routes/device/device-admin');   //设备管理
const fieldDictRouter = require('./routes/field-dict');   //设备管理

const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

//router设置

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sample', sampleRouter);
app.use('/device/client', devclientRouter);
app.use('/device/admin', deviceRouter);
app.use('/fielddict', fieldDictRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
