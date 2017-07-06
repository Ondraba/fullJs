var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var httpProxy = require('http-proxy');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
// PROXY TO API
// const apiProxy = httpProxy.createProxyServer({
//   target: "http://localhost:3001"
// });
// app.use("/api", function(req, res) {
//   apiProxy.web(req, res);
// })
// END OF PROXY proxy.web(req, res, { target: 'http://mytarget.com:8080' }, function(e) { ... });
app.use(express.static(path.join(__dirname, 'public')));

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');
var Books = require('./models/books.js');
// POST BOOKS
app.post('/books', function(req, res) {
  var book = req.body;
  Books.create(book, function(err, books) {
    if (err) {
      console.log("#API BOOKS: ",err);
    }
    res.json(books);
  })
});
// GET BOOKS
app.get('/books', function(req, res) {
  Books.find(function(err, books) {
    if (err) {
      console.log("#API BOOKS: ",err);
    }
    res.json(books);
  })
});
// DELETE BOOKS
app.delete('/books/:_id', function(req, res) {
  var query = { _id: req.params._id };
  Books.remove(query, function(err, books) {
    if (err) {
      console.log("#API BOOKS: ",err);
    }
    res.json(books);
  })
});
//UPDATE BOOKS
app.put('/books/:_id', function(req, res) {
  var book = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  // when true, returns the updated document
  var options = { new: true };
  Books.findOneAndUpdate(query, update, options, function(err, books) {
    if (err) {
      console.log("#API BOOKS: ",err);
    }
    res.json(books);
  })
});


//image APIs
app.get('/images', function(req,res){
  const imgFolder = __dirname + '/public/images/';
  const fs = require('fs');

  fs.readdir(imgFolder, function(err,files){
    if(err){
      return console.error(err);
    }
    const filesArr = [];
    files.forEach(function(file){
      filesArr.push({name: file});
    })
    res.json(filesArr);
  })
});

// END OF APIs


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
