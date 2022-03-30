let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

// Componente para subir archivos
let fileUpload = require('express-fileupload');
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  createParentPath: true
}));
app.set('uploadPath', __dirname)

// Componente para leer peticiones posts
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Obtener rutas basicas del proyecto
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

// Cliente mongo
const { MongoClient } = require("mongodb");
const url = 'mongodb+srv://admin:N0b3S_D3_Pl0t0N@tiendamusica.ud9jd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.set('connectionStrings', url);

// Repositorios
let songsRepository = require("./repositories/songsRepository.js");
songsRepository.init(app, MongoClient);

// Rutas
require("./routes/songs.js")(app, songsRepository);
require("./routes/authors.js")(app, MongoClient);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Loger
app.use(logger('dev'));

// Usamos json para las respuestas
app.use(express.json());

// Codificacion de urls
app.use(express.urlencoded({ extended: false }));

// Uso de cookies
app.use(cookieParser());

// Directorio publico del proyecto
app.use(express.static(path.join(__dirname, 'public')));

// Usar rutas basicas del proyecto
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
