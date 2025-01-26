const hbs = require('handlebars');
const moment = require('moment-jalaali');

// ثبت helper برای فرمت کردن اعداد
hbs.registerHelper('formatNumber', function(number) {
    return new Intl.NumberFormat('fa-IR').format(number);
});

// ثبت helper برای ضرب دو عدد
hbs.registerHelper('multiply', function(a, b) {
    return a * b;
});


hbs.registerHelper('formatDate', function(date) {
    return moment(date).format('jYYYY/jMM/jDD HH:mm');
});

// Helper برای مقایسه مقادیر
hbs.registerHelper('eq', function(a, b) {
    return a === b;
});

module.exports = hbs;