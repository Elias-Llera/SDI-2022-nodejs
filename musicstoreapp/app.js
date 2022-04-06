let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

// Modulo login
let expressSession = require('express-session');
app.use(expressSession({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true
}));

//Modulo encriptar
let crypto = require('crypto');

// Modulo para subir archivos
let fileUpload = require('express-fileupload');
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  createParentPath: true
}));

app.set('uploadPath', __dirname)
app.set('clave','abcdefg');
app.set('crypto', crypto);

// Módulo para leer cuerpo de peticiones posts
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Obtener ruta index
let indexRouter = require('./routes/index');

// Cliente mongo
const { MongoClient } = require("mongodb");
const url = 'mongodb+srv://admin:N0b3S_D3_Pl0t0N@tiendamusica.ud9jd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.set('connectionStrings', url);

// Repositorios
let songsRepository = require("./repositories/songsRepository.js");
songsRepository.init(app, MongoClient);
const usersRepository = require("./repositories/usersRepository.js");
usersRepository.init(app, MongoClient);
let commentsRepository = require("./repositories/commentsRepository.js");
commentsRepository.init(app, MongoClient);
const {mongoClient} = require("./repositories/songsRepository");

// Control de authentication
const userSessionRouter = require('./routes/userSessionRouter');
const userAudiosRouter = require('./routes/userAudiosRouter');
const userAuthorRouter = require("./routes/userAuthorRouter");
app.use("/shop/",userSessionRouter);
app.use("/songs/add",userSessionRouter);
app.use("/songs/buy",userSessionRouter);
app.use("/purchases",userSessionRouter);
app.use("/publications",userSessionRouter);
app.use("/comments", userSessionRouter);
app.use("/audios/",userAudiosRouter);
app.use("/songs/edit",userAuthorRouter);
app.use("/songs/delete",userAuthorRouter);

// Rutas
require("./routes/songs.js")(app, songsRepository, commentsRepository);
require("./routes/authors.js")(app, MongoClient);
require("./routes/users.js")(app, usersRepository);
require("./routes/comments.js")(app, commentsRepository)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Logger
app.use(logger('dev'));

// Usamos json para las respuestas
app.use(express.json());

// Codification de urls
app.use(express.urlencoded({ extended: false }));

// Uso de cookies
app.use(cookieParser());

// Directorio público del proyecto
app.use(express.static(path.join(__dirname, 'public')));

// Usar rutas index
app.use('/', indexRouter);

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
