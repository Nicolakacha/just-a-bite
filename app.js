/* eslint-disable import/order */
const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const flash = require('connect-flash');
const compression = require('compression');
const sts = require('strict-transport-security');
const globalSTS = sts.getSTS({'max-age':{'days': 30}});
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 5556;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(globalSTS);
app.use(helmet());
app.use(flash());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.username = req.session.username;
  next();
});

app.listen(port, () => {
  console.log(`express restaurant app listening on port ${port}`);
});

app.use('/', routes);
