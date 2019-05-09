'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorHandling = exports.create_calendar_fa = exports.create_calendar = exports.changeFuncToDateString = exports.changeDateStringToFunc = exports.getValueFromDate = undefined;

var _momentJalaali = require('moment-jalaali');

var _momentJalaali2 = _interopRequireDefault(_momentJalaali);

var _typeCheck = require('./typeCheck.js');

var _dateFns = require('date-fns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zeroPad = function zeroPad(value, length) {
    return ('' + value).padStart(length, '0');
};

var create_days = function create_days(date, type) {
    var max = (0, _dateFns.getDaysInMonth)(date);
    var YEAR = (0, _dateFns.getYear)(date);
    var MONTH = (0, _dateFns.getMonth)(date);
    var days = [];
    for (var i = 1; i <= max; i++) {
        days.push({
            type: type,
            day: zeroPad(i, 2),
            isToday: (0, _dateFns.isToday)(new Date(YEAR, MONTH, i)),
            date: YEAR + '/' + zeroPad(MONTH + 1, 2) + '/' + zeroPad(i, 2),
            value: YEAR.toString() + zeroPad(MONTH + 1, 2) + zeroPad(i, 2),
            dayOfWeek: (0, _dateFns.getDay)(new Date(YEAR, MONTH, i))
        });
    }
    return days;
};

var create_days_fa = function create_days_fa(momentDate, type) {
    var YEAR = momentDate.jYear();
    var MONTH = momentDate.jMonth() + 1; // jalali count the month from 0 => 11 is esfand
    var max = _momentJalaali2.default.jDaysInMonth(YEAR, MONTH - 1);
    var days = [];
    for (var i = 1; i <= max; i++) {
        days.push({
            type: type,
            day: zeroPad(i, 2),
            isToday: TODAY === YEAR.toString() + zeroPad(MONTH, 2) + zeroPad(i, 2),
            date: YEAR + '/' + zeroPad(MONTH, 2) + '/' + zeroPad(i, 2),
            value: YEAR.toString() + zeroPad(MONTH, 2) + zeroPad(i, 2),
            dayOfWeek: (0, _momentJalaali2.default)(YEAR + '/' + MONTH + '/' + i, 'jYYYY/jM/jD').day() + 1
        });
    }
    return days;
};

var getValueFromDate = exports.getValueFromDate = function getValueFromDate(date, lang) {
    if ((0, _typeCheck.isDate)(date)) {
        if (lang === 'en') {
            return (0, _dateFns.getYear)(date) + zeroPad((0, _dateFns.getMonth)(date) + 1, 2) + zeroPad((0, _dateFns.getDate)(date), 2);
        } else {
            var imoment = (0, _momentJalaali2.default)(date);
            return imoment.jYear() + zeroPad(imoment.jMonth() + 1, 2) + zeroPad(imoment.jDate(), 2);
        }
    } else {
        var DateArray = date.split("/");
        return DateArray[0] + zeroPad(DateArray[1], 2) + zeroPad(DateArray[2], 2);
    }
};

var changeDateStringToFunc = exports.changeDateStringToFunc = function changeDateStringToFunc(string, lang) {
    // accept string of date and change it to 
    try {
        if (!(0, _typeCheck.isString)(string)) throw ErrorHandling[lang].WarningType;
        if (string.split('/').length !== 3) throw ErrorHandling[lang].WarningValid;
    } catch (err) {
        console.log(err);
        return;
    }

    if (lang) {
        if (lang.toLowerCase() !== 'en') {
            var persianDateArray = string.split('/');
            var persianMomentDate = (0, _momentJalaali2.default)(parseInt(persianDateArray[0]) + "/" + parseInt(persianDateArray[1]) + "/" + parseInt(persianDateArray[2]), 'jYYYY/jM/jD').format('YYYY/MM/DD');
            return new Date(persianMomentDate);
        } else {
            return new Date(string);
        }
    }
};

var changeFuncToDateString = exports.changeFuncToDateString = function changeFuncToDateString(func, lang) {
    var year = (0, _dateFns.getYear)(func);
    var month = (0, _dateFns.getMonth)(func);
    var day = (0, _dateFns.getDate)(func);
    if (lang.toLowerCase() === 'fa') {
        return (0, _momentJalaali2.default)(year + "/" + (month + 1) + "/" + day, 'YYYY/M/D').format('jYYYY/jMM/jDD');
    }
    return year + "/" + (month + 1) + "/" + day;
};

var create_calendar = exports.create_calendar = function create_calendar(currentFn) {
    try {
        if (!(0, _typeCheck.isDate)(currentFn)) throw ErrorHandling['en'].WarningDateFormat;
    } catch (err) {
        console.log(err);
        return;
    }

    var prevMonth = create_days((0, _dateFns.subMonths)(currentFn, 1), 'prev');
    var currentMonth = create_days((0, _dateFns.startOfMonth)(currentFn), 'this');
    var nextMonth = create_days((0, _dateFns.addMonths)(currentFn, 1), 'next');

    var all_en_month = prevMonth.concat(currentMonth.concat(nextMonth));
    // i want to know howmany days will fill between these 42 days
    var beforeMiss_en = currentMonth[0].dayOfWeek;
    var en_calendar = all_en_month.splice(prevMonth.length - beforeMiss_en, 42);
    return {
        lang: 'en',
        today: new Date(),
        day: (0, _dateFns.getDate)(currentFn),
        year: (0, _dateFns.getYear)(currentFn),
        month: (0, _dateFns.getMonth)(currentFn) + 1,
        dayOfTheWeek: (0, _dateFns.getDay)(new Date()),
        info: en_calendar,
        MONTHS_SHORT: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'Decemeber'],
        WEEK_DAYS_SHORT: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        WEEK_DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
};

// we need this TODAY only for moment cuse in en isToday is available
var TODAY = (0, _momentJalaali2.default)().jYear().toString() + zeroPad((0, _momentJalaali2.default)().jMonth() + 1, 2) + zeroPad((0, _momentJalaali2.default)().jDate(), 2);
var create_calendar_fa = exports.create_calendar_fa = function create_calendar_fa(currentFn) {

    try {
        if (!(0, _typeCheck.isDate)(currentFn)) throw ErrorHandling['fa'].WarningDateFormat;
    } catch (err) {
        console.log(err);
        return;
    }

    var current_FaMonth = create_days_fa((0, _momentJalaali2.default)(currentFn).startOf('jMonth'), 'this');
    var next_FaMonth = create_days_fa((0, _momentJalaali2.default)(currentFn).startOf('jMonth').add(1, 'jMonth'), 'next');
    var prev_FaMonth = create_days_fa((0, _momentJalaali2.default)(currentFn).startOf('jMonth').subtract(1, 'jMonth'), 'prev');
    var all_fa_month = prev_FaMonth.concat(current_FaMonth.concat(next_FaMonth));
    // i want to know howmany days will fill between these 42 days
    var missDays = current_FaMonth[0].dayOfWeek;
    var fa_calendar = all_fa_month.splice(prev_FaMonth.length - missDays, 42);
    return {
        lang: 'fa',
        today: new Date(),
        info: fa_calendar,
        day: (0, _momentJalaali2.default)(currentFn).jDate(),
        year: (0, _momentJalaali2.default)(currentFn).jYear(),
        month: (0, _momentJalaali2.default)(currentFn).jMonth() + 1,
        dayOfTheWeek: (0, _momentJalaali2.default)(new Date()).day() + 1,
        WEEK_DAYS_SHORT: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
        WEEK_DAYS: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'],
        MONTHS_SHORT: ['فرو', 'خرد', 'ارد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        MONTHS: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
    };
};

var ErrorHandling = exports.ErrorHandling = {
    'en': {
        WarningDateFormat: "Warning: date formate to the given function must be function type.",
        WarningType: "Warning: not a string",
        WarningValid: "Warning: date string is not valid"
    },
    'fa': {
        WarningDateFormat: "نوع داده‌ی قرار داده شده برای تابع باید از نوع تابع باشد",
        WarningType: "ورودی از نوع متن نیست.",
        WarningValid: "تاریخ متنی داده شده معتبر نیست."
    }
};
