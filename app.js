require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const routers = require('./routes');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // setDefaultsOnInsert: true,
  // new: true,
  // upsert: true,
});

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
};

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 100,
  statusCode: 200,
  message: {
    status: 429,
    error: 'You are doing that too much. Please try again in 10 minutes.',
  },
});

app.use(limiter);

// app.use(cors(CorsOptions.AllowAll));

// app.use(cors(), (req, res, next) => {
//   res.append('Access-Control-Allow-Origin', '*');
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// config.EnableCors(new EnableCorsAttribute(Properties.Settings.Default.Cors, "", ""));
// app.UseCors(CorsOptions.AllowAll);

app.use(requestLogger);

app.use(bodyParser.json());

app.use(routers);

app.use(errorLogger);

app.use(errors());

// app.get('*', (_req, _res, next) => next(new NotFoundError('Такой страницы не существует')));
app.all('*', (_req, _res, next) => next(new NotFoundError('Такой страницы не существует')));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'Произошла ошибка на сервре' });
  next();
});

app.listen(PORT, () => {});
