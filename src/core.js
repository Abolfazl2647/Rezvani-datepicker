import moment from 'moment-jalaali';
import { isDate , isString } from './typeCheck.js';
import {
    getDate,
    getDay, 
    getYear,  
    isToday,
    getMonth,
    subMonths, 
    addMonths,  
    startOfMonth,
    getDaysInMonth } from 'date-fns';

const zeroPad = (value, length) => {
    return `${value}`.padStart(length, '0');
}

const create_days = function (date,type) {
    
    let max = getDaysInMonth(date);
    let YEAR =  getYear(date);
    let MONTH = getMonth(date);

    let days = [];
    for ( let i=1 ; i <= max ; i++ ) {
        days.push({
            type,
            day: zeroPad(i,2),
            isToday: isToday(new Date(YEAR, MONTH , i)),
            date: YEAR +'/'+ zeroPad(MONTH+1 ,2) +'/'+ zeroPad(i,2),
            value: YEAR.toString() + zeroPad(MONTH+1 ,2) + zeroPad(i,2),
            dayOfWeek: getDay(new Date(YEAR, MONTH , i)),
        });
    }
    return days;
}

const create_days_fa = function (momentDate,type) {

    let YEAR =  momentDate.jYear();
    let MONTH = momentDate.jMonth()+1; // jalali count the month from 0 => 11 is esfand
    let max = moment.jDaysInMonth(YEAR, MONTH-1);

    let days = [];
    for ( let i=1 ; i <= max ; i++ ) {
        days.push({
            type,
            day: zeroPad(i,2),
            isToday: ( TODAY === YEAR.toString() + zeroPad(MONTH,2) + zeroPad(i,2)),
            date: YEAR +'/'+ zeroPad(MONTH,2) +'/'+ zeroPad(i,2),
            value: YEAR.toString() + zeroPad(MONTH,2) + zeroPad(i,2),
            dayOfWeek: moment( YEAR +'/'+ MONTH +'/'+ i, 'jYYYY/jM/jD').day() + 1,
        });
    }
    return days;
}

export const getValueFromDate = function (date, lang) {
    if ( isDate(date) ) {
        if ( lang === 'en') {
            return getYear(date) + zeroPad(getMonth(date)+1,2) + zeroPad(getDate(date),2);
        } else {
            let imoment = moment(date);
            return imoment.jYear() + zeroPad(imoment.jMonth()+1,2) + zeroPad(imoment.jDate(),2);
        }
    } else {
        let DateArray = date.split("/");
        return DateArray[0] + zeroPad(DateArray[1],2) + zeroPad(DateArray[2],2);
    }
}

export const changeDateStringToFunc = function (string , lang) {
    // accept string of date and change it to 
    try {
        if ( !isString(string) ) throw ErrorHandling[lang].WarningType;
        if ( string.split('/').length !== 3 ) throw ErrorHandling[lang].WarningValid;
    }
    catch(err) {
        console.log(err);
        return;
    }

    if ( lang ) {
        if ( lang.toLowerCase() !== 'en' ) {
            let persianDateArray = string.split('/');
            let persianMomentDate = moment(parseInt(persianDateArray[0]) +"/"+ parseInt(persianDateArray[1]) +"/"+parseInt(persianDateArray[2]), 'jYYYY/jM/jD').format('YYYY/MM/DD');
            return new Date(persianMomentDate);
        } else {
            return new Date(string);
        }
    }
}

export const changeFuncToDateString = function (func , lang) {
    let year = getYear(func);
    let month  = getMonth(func);
    let day  = getDate(func);

    if ( lang.toLowerCase() === 'fa' ) {
        return moment(year+"/"+month+"/"+day, 'YYYY/M/D').format('jYYYY/jMM/jDD');
    }

    return year+"/"+(month)+"/"+day;
}

export const create_calendar = function (currentFn) {
    try {
        if ( !isDate(currentFn) ) throw ErrorHandling['en'].WarningDateFormat;
    }
    catch(err) {
        console.log(err);
        return;
    }
    
    
    let prevMonth = create_days(subMonths(currentFn, 1),'prev');
    let currentMonth = create_days(startOfMonth(currentFn),'this');
    let nextMonth = create_days(addMonths(currentFn, 1),'next');

    let all_en_month = prevMonth.concat(currentMonth.concat(nextMonth));
    // i want to know howmany days will fill between these 42 days
    let beforeMiss_en = currentMonth[0].dayOfWeek;
    let en_calendar = all_en_month.splice( (prevMonth.length - beforeMiss_en) , 42 );
    return {
        lang:'en',
        today: new Date(),
        day: getDate(currentFn),
        year: getYear(currentFn),
        month: getMonth(currentFn)+1,
        dayOfTheWeek: getDay(new Date()),
        info: en_calendar,
        MONTHS_SHORT:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        MONTHS:['January','February','March','April','May','June','July','August','September','October','Novemeber','Decemeber'],
        WEEK_DAYS_SHORT:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
        WEEK_DAYS:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    };
}

// we need this TODAY only for moment cuse in en isToday is available
const TODAY = moment().jYear().toString() + zeroPad(moment().jMonth() + 1,2) + zeroPad(moment().jDate(),2);
export const create_calendar_fa = function (currentFn) {

    try {
        if ( !isDate(currentFn) ) throw ErrorHandling['fa'].WarningDateFormat;
    }
    catch(err) {
        console.log(err);
        return;
    }

    let current_FaMonth = create_days_fa(moment(currentFn).startOf('jMonth'),'this');
    let next_FaMonth = create_days_fa(moment(currentFn).startOf('jMonth').add(1, 'jMonth'),'next');
    let prev_FaMonth = create_days_fa(moment(currentFn).startOf('jMonth').subtract(1, 'jMonth'),'prev');
    let all_fa_month = prev_FaMonth.concat(current_FaMonth.concat(next_FaMonth));
    // i want to know howmany days will fill between these 42 days
    let missDays = current_FaMonth[0].dayOfWeek;
    let fa_calendar = all_fa_month.splice( (prev_FaMonth.length - missDays) , 42 );
    return {
        lang:'fa',
        today: new Date(),
        day: moment(currentFn).jDate(),
        year: moment(currentFn).jYear(),
        month: moment(currentFn).jMonth() + 1,
        dayOfTheWeek: moment(new Date()).day() + 1,
        info: fa_calendar,
        WEEK_DAYS_SHORT: ["ش","ی","د","س","چ","پ","ج"],
        WEEK_DAYS: ['شنبه' ,'یکشنبه','دوشنبه','سه شنبه','چهارشنبه','پنج شنبه','جمعه'],
        MONTHS_SHORT: ['فرو','خرد','ارد','تیر','مرد','شهر','مهر','آبان','آذر','دی','بهمن','اسفند'],
        MONTHS: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
    };
}

export let ErrorHandling = {
    'en': {
        WarningDateFormat: "Warning: date formate to the given function must be function type.",
        WarningType: "Warning: not a string",
        WarningValid: "Warning: date string is not valid",
    },
    'fa': {
        WarningDateFormat: "نوع داده‌ی قرار داده شده برای تابع باید از نوع تابع باشد",
        WarningType: "ورودی از نوع متن نیست.",
        WarningValid: "تاریخ متنی داده شده معتبر نیست.",
    }
}