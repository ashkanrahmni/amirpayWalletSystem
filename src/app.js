const express = require('express');
const path = require('path');
const authRoutes = require('./router/authRoutes');
const adminRoutes = require('./router/adminRoutes');
const orderRoutes = require('./router/orderRoutes');
const exchangeRoutes = require('./router/exchangeRoutes');
const walletRoutes = require('./router/walletRoutes');
const homeRoutes = require('./router/homeRoute');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const { engine } = require('express-handlebars');
const flash = require('express-flash');
const db = require('./config/db');
const app = express();


db();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(cookieParser())
app.use(
    session({
      secret: 'process.env.SESSION_SECRET!',
      resave: false,
      saveUninitialized: false,
    })
  );
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 30,
    message: 'شما بیش از حد مجاز درخواست ارسال کرده‌اید. لطفا دقایقی دیگر تلاش کنید.'
  });
Handlebars.registerHelper('formatTotalAmount', function (amount) {
    if (!amount) return "0";
    return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
});

Handlebars.create({
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
});  
app.engine('hbs', engine({
    defaultLayout: 'main',  
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir:path.join(__dirname, 'views/partial'),
    helpers: {
      formatNumber: function(num) {
        if (!num) return "0";
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    section: function(name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
  },
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));  

// app.use(limiter);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views')); 


app.use('/auth', authRoutes);

app.use('/admin', adminRoutes);


app.use('/exchange', exchangeRoutes);

app.use('/wallet', walletRoutes);


app.use('/order', orderRoutes);


app.use('/', homeRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);  
    res.status(500).json({
      message: 'Something went wrong! ERROR HERE',
      error:  err.stack, 
    });
  });
  
  module.exports = app;

require('./services/transactionCronService');
require('./helpers/handlebars-helpers');
