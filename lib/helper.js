"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isEmptyObj = exports.convertDateStringToFun = exports.daysInOffsetNextMonth = exports.daysInOffsetPrevMonth = exports.getPreviousMonth = exports.getNextMonth = exports.getMonthFirstDay = exports.daysInMonth = exports.zeroPad = exports.convertObjectDateToString = exports.CURRENT_DATE = exports.TODAY = exports.THIS_MONTH = exports.THIS_YEAR = exports.CALENDAR_WEEKS = exports.FA_WEEK_DAYS = exports.EN_WEEK_DAYS = exports.FA_WEEK_DAYS_SHORT = exports.EN_WEEK_DAYS_SHORT = exports.FA_MONTHS = exports.FA_MONTHS_SHORT = exports.EN_MONTHS = exports.EN_MONTHS_SHORT = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Calender;

var _jalaliMoment = require("jalali-moment");

var _jalaliMoment2 = _interopRequireDefault(_jalaliMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Calendar months names and shortnames
var EN_MONTHS_SHORT = exports.EN_MONTHS_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var EN_MONTHS = exports.EN_MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'Decemeber'];
var FA_MONTHS_SHORT = exports.FA_MONTHS_SHORT = ['', 'فرو', 'خرد', 'ارد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
var FA_MONTHS = exports.FA_MONTHS = ['', 'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

// Week days names and shortnames
var EN_WEEK_DAYS_SHORT = exports.EN_WEEK_DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var FA_WEEK_DAYS_SHORT = exports.FA_WEEK_DAYS_SHORT = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
var EN_WEEK_DAYS = exports.EN_WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var FA_WEEK_DAYS = exports.FA_WEEK_DAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پینج شنبه', 'جمعه'];

// Weeks displayed on calendar
var CALENDAR_WEEKS = exports.CALENDAR_WEEKS = 6;

var THIS_YEAR = exports.THIS_YEAR = function THIS_YEAR(lang) {
    var format = lang.toLowerCase() === 'fa' ? 'jYYYY' : 'YYYY';
    return parseInt((0, _jalaliMoment2.default)().locale(lang.toLowerCase()).format(format));
};
// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
var THIS_MONTH = exports.THIS_MONTH = function THIS_MONTH(lang) {
    var format = lang.toLowerCase() === 'fa' ? 'jMM' : 'MM';
    return parseInt((0, _jalaliMoment2.default)().locale(lang.toLowerCase()).format(format));
};

// today
var TODAY = exports.TODAY = function TODAY(lang) {
    var format = lang.toLowerCase() === 'fa' ? 'jDD' : 'DD';
    return parseInt((0, _jalaliMoment2.default)().locale(lang.toLowerCase()).format(format));
};

var CURRENT_DATE = exports.CURRENT_DATE = function CURRENT_DATE(LANG) {

    var year = THIS_YEAR(LANG);
    var month = THIS_MONTH(LANG);
    var day = TODAY(LANG);

    return {
        dateString: year + "-" + month + '-' + day,
        year: year,
        month: month,
        day: day
    };
};

var convertObjectDateToString = exports.convertObjectDateToString = function convertObjectDateToString(dateString) {
    return dateString.year + '-' + zeroPad(dateString.month, 2) + '-' + zeroPad(dateString.day, 2);
};
// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
var zeroPad = exports.zeroPad = function zeroPad(value, length) {
    return ("" + value).padStart(length, '0');
};

// (int) Number days in a month for a given year from 28 - 31
var daysInMonth = exports.daysInMonth = function daysInMonth() {
    var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : THIS_YEAR;
    var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : THIS_MONTH;
    var lang = arguments[2];

    var date = year.toString() + "-" + month.toString();
    var format = lang.toLowerCase() === 'fa' ? 'jYYYY-jMM' : 'YYYY-MM';
    var daysInMonth = (0, _jalaliMoment2.default)(date, format).locale(lang.toLowerCase()).daysInMonth();
    return daysInMonth;
};

// (int) First day of the month for a given year from 0 - 6
// 0 => Sunday, جمعه
// 6 => Saturday شنبه, 
var getMonthFirstDay = exports.getMonthFirstDay = function getMonthFirstDay() {
    var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : THIS_YEAR;
    var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : THIS_MONTH;
    var lang = arguments[2];

    var format = lang.toLowerCase() === 'fa' ? 'jYYYY-jMM-jDD' : 'YYYY-MM-DD';
    var firstDay = (0, _jalaliMoment2.default)(year + "-" + zeroPad(month, 2) + "-01", format).locale(lang.toLowerCase()).day();
    // calculate day of the week persian
    if (lang.toLowerCase() === 'fa') {
        firstDay++;
        if (firstDay > 6) {
            firstDay = 0;
        }
    }

    return lang.toLowerCase() === 'fa' ? firstDay : firstDay;
};

// ({month, year}) Gets the month and year after the given month and year
// For example: getNextMonth(1, 2000) => {month: 2, year: 2000}
// while: getNextMonth(12, 2000) => {month: 1, year: 2001}
var getNextMonth = exports.getNextMonth = function getNextMonth(year, month, lang) {
    var nextMonth = month < 12 ? month + 1 : 1;
    var nextMonthYear = month < 12 ? year : year + 1;
    return { month: nextMonth, year: nextMonthYear };
};

// ({month, year}) Gets the month and year before the given month and year
// For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// while: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
var getPreviousMonth = exports.getPreviousMonth = function getPreviousMonth(year, month) {
    var prevMonth = month > 1 ? month - 1 : 12;
    var prevMonthYear = month > 1 ? year : year - 1;
    return { month: prevMonth, year: prevMonthYear };
};

// this function return [31,30,29] if offset = 3 to show last days of prev month
var daysInOffsetPrevMonth = exports.daysInOffsetPrevMonth = function daysInOffsetPrevMonth(offset, year, month, lang, props) {
    var listOfDays = [];
    var days = daysInMonth(year, month, lang);
    for (var i = 0; i < offset; i++) {
        listOfDays.push(zeroPad(days, 2));
        days--;
    }

    return changeArryaToArrayObj(listOfDays.reverse(), year, month, props, 'PREV');
};

// this function return [1,2,3] if offset = 3 to show last days of next month
var daysInOffsetNextMonth = exports.daysInOffsetNextMonth = function daysInOffsetNextMonth(offset, total, year, month, props) {

    var maxLenght = 42;
    var moved = offset + total; // 31 for example
    var remainCount = maxLenght - moved; // 11 for expample
    var list = [];

    for (var i = 0; i <= maxLenght; i++) {
        if (i > moved) {
            list.push(zeroPad(remainCount, 2));
            remainCount--;
        }
    }

    return changeArryaToArrayObj(list.reverse(), year, month, props, 'NEXT');
};

var convertDateStringToFun = exports.convertDateStringToFun = function convertDateStringToFun(dateObj, lang) {
    var format = lang.toLowerCase() === 'fa' ? 'jYYYY-jMM-jDD' : 'YYYY-MM-DD';
    var date = dateObj.year.toString() + "-" + dateObj.month.toString() + "-" + 0;
    return (0, _jalaliMoment2.default)(date, format).locale(lang.toLowerCase())._d;
};

var isEmptyObj = exports.isEmptyObj = function isEmptyObj(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
};

function Calender(year, month, PROPS) {

    var LANG = PROPS.lang;
    var DAY = TODAY(LANG);
    var TODAY_DATE = zeroPad(THIS_YEAR(LANG), 2) + "-" + zeroPad(THIS_MONTH(LANG), 2) + '-' + zeroPad(DAY, 2);

    var YEAR = null;
    var MONTH = null;

    var PREV_YEAR = null;
    var NEXT_YEAR = null;

    var PREV_MONTH = null;
    var NEXT_MONTH = null;

    if ((year === undefined || null || '') && (month === undefined || null || '')) {
        YEAR = THIS_YEAR(LANG);
        MONTH = THIS_MONTH(LANG);
    } else {
        YEAR = parseInt(year);
        MONTH = parseInt(month);
    }

    var Prev_data = getPreviousMonth(YEAR, MONTH, LANG);
    PREV_MONTH = Prev_data.month;
    PREV_YEAR = Prev_data.year;

    var Next_data = getNextMonth(YEAR, MONTH, LANG);
    NEXT_MONTH = Next_data.month;
    NEXT_YEAR = Next_data.year;

    var FIRST_DAY_WEEK = getMonthFirstDay(YEAR, MONTH, LANG);
    var TOTAL_DAYS_IN_MONTH = daysInMonth(YEAR, MONTH, LANG);

    var CURRENT_MONTH_DAYS = [];
    for (var z = 1; z <= TOTAL_DAYS_IN_MONTH; z++) {
        CURRENT_MONTH_DAYS.push(zeroPad(z, 2));
    }

    // create entire daypicker
    var PREV_OFFSET = daysInOffsetPrevMonth(FIRST_DAY_WEEK, PREV_YEAR, PREV_MONTH, LANG, PROPS);

    var THIS_MONTH_DAYS = changeArryaToArrayObj(CURRENT_MONTH_DAYS, YEAR, MONTH, PROPS, 'CURRENT');

    var NEXT_OFFSET = daysInOffsetNextMonth(FIRST_DAY_WEEK, TOTAL_DAYS_IN_MONTH, NEXT_YEAR, NEXT_MONTH, PROPS);

    return {
        all_days: PREV_OFFSET.concat(THIS_MONTH_DAYS.concat(NEXT_OFFSET)),
        todayString: TODAY_DATE,
        currentYear: YEAR,
        currentMonth: MONTH,
        currentDay: DAY
    };
}

var changeArryaToArrayObj = function changeArryaToArrayObj(array, year, month, props, FLAG) {

    // console.log(FLAG , array, year, month, props )
    var obj = {};
    var finalArray = [];
    var dateString = null;

    var TODAY_DATE = zeroPad(THIS_YEAR(props.lang), 2) + "-" + zeroPad(THIS_MONTH(props.lang), 2) + '-' + zeroPad(TODAY(props.lang), 2);

    var beforeToday = false;
    var afterToday = false;
    var beforeDate = false;
    var afterDate = false;
    var istoday = false;

    for (var a = 0; a < array.length; a++) {

        var isDisable = false;
        var classInfo = FLAG;

        dateString = year + "-" + month + "-" + array[a];

        istoday = handleToday(dateString, TODAY_DATE);

        if (!props.disable) {
            if (props.disableBeforeToday) {
                beforeToday = handleDisableBeforeToday(dateString, TODAY_DATE);
            }

            if (props.disableAfterToday) {
                afterToday = handleDisableAfterToday(dateString, TODAY_DATE);
            }

            if (props.disableAfterDate) {
                afterDate = handleDisableAfterDate(dateString, props.disableAfterDate);
            }

            if (props.disableBeforeDate) {
                beforeDate = handleDisableBeforeDate(dateString, props.disableBeforeDate);
            }

            isDisable = beforeToday || afterToday || afterDate || beforeDate;
        } else {
            isDisable = props.disable;
        }

        if (isDisable) {
            classInfo = FLAG + ' DISABLE ';
        }

        obj = {};
        obj.info = classInfo;
        obj.year = year;
        obj.month = month;
        obj.isDisable = isDisable;
        obj.isToday = istoday;
        obj.day = array[a];
        obj.date = year + "-" + month + "-" + zeroPad(array[a], 2);
        finalArray.push(obj);
    }

    return finalArray;
};

var handleDisableBeforeToday = function handleDisableBeforeToday(DATESTRING, TODAY, a, b) {
    return DATESTRING < TODAY;
};

var handleDisableAfterToday = function handleDisableAfterToday(DATESTRING, TODAY) {
    return DATESTRING > TODAY;
};

var handleDisableAfterDate = function handleDisableAfterDate(DATESTRING, date) {
    return DATESTRING > convertObjectDateToString(date);
};

var handleDisableBeforeDate = function handleDisableBeforeDate(DATESTRING, date) {
    return DATESTRING < convertObjectDateToString(date);
};

var handleToday = function handleToday(DATESTRING, TODAY) {
    return DATESTRING === TODAY;
};
