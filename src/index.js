import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { subMonths , addMonths} from 'date-fns';
import {create_calendar, create_calendar_fa ,getValueFromDate, changeDateStringToFunc, changeFuncToDateString} from './core.js';
import { isDate , isBoolean } from './typeCheck.js';

class DateWrapper extends Component {
    
    constructor(props) {
        super(props);

        this.refrence = React.createRef();

        this.goToday = this.goToday.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showDatepicker = this.showDatepicker.bind(this);
        this.handlePrevMonth = this.handlePrevMonth.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.hanleReceiveValue = this.hanleReceiveValue.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        // TODO : maximum error handling

        let START_DATE = null;
        let lang = ( this.props.lang ) ? this.props.lang : 'fa';
        if ( this.props.startDate ) {
            if ( isDate(this.props.startDate) ) {
                START_DATE = this.props.startDate;
            } else {
                START_DATE = changeDateStringToFunc(this.props.startDate, lang);
            }
        } else {
            START_DATE = new Date();
        }

        this.state = {
            visibility: false,
            date: START_DATE,
            inputValue: ""
        }
    }

    componentDidUpdate() {
        // TODO : check errors handleing
        // console.log('updated')
    }

    componentDidMount ()    { document.addEventListener('mousedown', this.handleClickOutside,false); }
    componentWillUnmount()  { document.removeEventListener('mousedown', this.handleClickOutside,false); }
    handleClickOutside (e)  {
        if ( this.state.visibility ) {
            if ( this.refrence && !this.refrence.current.contains(e.target) )
            this.setState({visibility:false});
        }
    }

    showDatepicker() { this.setState({visibility:true}) }

    hanleReceiveValue(value) {
        let valueList = Object.values(value);
        let lang = (this.props.lang)? this.props.lang :  'fa';

        // range picker ture
        if ( valueList.length === 2 ) {
            if ( !(valueList[0] && valueList[1]) ) return;
            let start = changeFuncToDateString(valueList[0], lang);
            let end = changeFuncToDateString(valueList[1], lang);
            this.setState({
                inputValue: start + "-" + end }, ()=>{
                if ( this.props.handleChange ) {
                    this.props.handleChange({
                        startDate: { string: start, func: valueList[0] },
                        endDate: { string: end, func: valueList[1] }
                    });
                }
            });
        } else {
            this.setState({inputValue:changeFuncToDateString(valueList[0],lang)},()=>{
                if ( this.props.handleChange ) {
                    this.props.handleChange({
                        startDate: { string: changeFuncToDateString(valueList[0],lang), func: valueList[0] },
                    });
                }
            });
        }
    }

    goToday() { this.setState({date:new Date()}) }

    handleNextMonth() {
        this.setState({date:addMonths(this.state.date, 1)})
    }

    handlePrevMonth () {
        this.setState({date:subMonths(this.state.date, 1)})
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({inputValue: value});
        // TODO: check if value is like 1231/12/23 then apply it to the datepicker
        let REGEX = RegExp('^(13[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$', 'g');
        if ( REGEX.test(value) ) {
            this.setState({firstDate: changeDateStringToFunc(REGEX)});
        }
    }   

    render() { 

        // set option type or default type
        let TYPE = null;
        if ( this.props.type ) {
            let typeString = this.props.type.toLowerCase();
            TYPE = ( typeString === 'datepicker' || typeString === 'calendar' ) ? typeString : 'datepicker';
        } else {
            TYPE = 'datepicker';
        }

        // set option lang or default lang
        let CALENDAR = null;
        if ( this.props.lang ) {
            CALENDAR = (this.props.lang.toLowerCase() === 'fa') ? create_calendar_fa(this.state.date) : create_calendar(this.state.date);
        } else {
            CALENDAR = create_calendar_fa(this.state.date);
        }

        if ( isBoolean(this.props.name) ) {
            console.log('Warning: input name can not be boolian');
        }

        let INPUT = (TYPE === 'datepicker') ? 
        (<div className="rn-input-wrapper">
            <input type="text" 
                autoComplete="off"
                value={this.state.inputValue}
                onChange={this.handleChange} 
                onFocus={this.showDatepicker}
                name={(this.props.name) ? this.props.name : "rn-datepciker-name"} 
                className={((this.props.inputClass) ? this.props.inputClass : "" ) + ' rn-input '}/>
        </div>)  : null;

        let HeaderInfo = ( TYPE === 'calendar' && this.props.info ) ? 
        (<div className="rn-info" onClick={this.goToday}>
            <p className="dayName">{CALENDAR.WEEK_DAYS[CALENDAR.dayOfTheWeek]}</p>
            <div className="center-info">             
                <p className="day text">{CALENDAR.day}</p>
                <p className="month text">{CALENDAR[(this.props.monthNames)?this.props.monthNames: 'MONTHS'][CALENDAR.month-1]}</p>
                <p className="year text">{CALENDAR.year}</p>
            </div>
        </div>) : null;
        
        let rightBtnClass = (this.props.rightBtnClass) ? this.props.rightBtnClass : " icon ";
        let leftBtnClass = (this.props.leftBtnClass) ? this.props.leftBtnClass : " icon ";

        let visibility = 'show';
        if ( TYPE !== 'calendar' ) {
            visibility = (this.state.visibility ? ' show ' : ' hide ');
        }
        
        return (
            <div className={"rn-date-wrapper " + CALENDAR.lang +" "+ TYPE }>
                {INPUT}
                {HeaderInfo}
                <div className={visibility + " rn-datepicker"} ref={this.refrence}>
                    <div className="rn-header">
                        <div className="rn-action-header">
                            <button className={leftBtnClass + " rn-prev-month rn-cell "} onClick={this.handlePrevMonth}></button>
                            <div className="rn-middle-info">
                                <span>{CALENDAR.year}</span>
                                <span>{CALENDAR[(this.props.monthNames)?this.props.monthNames: 'MONTHS'][CALENDAR.month - 1]}</span>
                            </div>
                            <button className={rightBtnClass + " rn-next-month rn-cell "} onClick={this.handleNextMonth}></button>
                        </div>
                    </div>
                    <Body calendar={CALENDAR} {...this.props}  receiveValue={this.hanleReceiveValue}/>
                    <div className="rn-footer"> {/* time picker maybe */} </div>
                </div>
            </div>
        );
    }
}


class Body extends Component {
    constructor(props) {

        super(props);
        this.dayCheck = this.dayCheck.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleSelectDate = this.handleSelectDate.bind(this);
        let lang = ( this.props.lang ) ? this.props.lang : 'fa';

        // check if firstDate filled
        let firstDate = null;
        if ( this.props.startDate ) {
            if ( isDate(this.props.startDate) ) {
                firstDate = this.props.startDate;
            } else {
                firstDate = changeDateStringToFunc(this.props.startDate, lang);
            }
        }
        
        // check if seconedDate filled
        let seconedDate = null;
        if ( this.props.endDate ) {
            if ( isDate(this.props.endDate) ) {
                seconedDate = this.props.endDate;
            } else {
                seconedDate = changeDateStringToFunc(this.props.endDate, lang);
            }
        }
        // firstDate and seconedDate allways is a function in en
        this.state = {
            direction: 'forward',
            rangeActive: false,
            clickTimes: 0,
            firstDate, // func type
            seconedDate, // func type
            hoverDate: '' // string value
        }

    }

    handleSelectDate (e) {
        if ( e.target.disabled ) return;
        let lang = ( this.props.lang ) ?  this.props.lang : 'fa';
        let DATE = changeDateStringToFunc(e.target.dataset.date,lang);
        // if range picker
        if ( this.props.rangePicker ) {

            if ( this.state.clickTimes === 0 ) {
                this.setState({ seconedDate:null, firstDate: DATE, clickTimes: 1, rangeActive:true});
            } else if ( this.state.clickTimes === 1 ) {
                this.setState({ seconedDate: DATE, clickTimes: 2, rangeActive: false
                }, () => {
                    // maybe pass it up
                    // it must be translate the result to en and fa
                    let rangeDateResult = {
                        firstDate: this.state.firstDate,
                        seconedDate: this.state.seconedDate,    
                    }
                    this.props.receiveValue(rangeDateResult);
                });
            } else if (this.state.clickTimes === 2 ) {
                this.setState({ seconedDate:null, firstDate: null, clickTimes: 0, rangeActive:false},() => {
                    let rangeDateResult = {
                        firstDate: '',
                        seconedDate: '',    
                    }
                    this.props.receiveValue(rangeDateResult);
                });
            }

        } else {
            this.setState({ firstDate: DATE, seconedDate:null, clickTimes: 0, rangeActive:false}, ()=>{
                let firstDate = {
                    firstDate: this.state.firstDate,   
                }
                this.props.receiveValue(firstDate);
            });
        }
    }

    handleHover(e) {
        if ( !this.props.rangePicker ) return;
        if ( e.target.disabled ) return;

        if ( this.state.rangeActive ) {
            let first = null;
            if ( this.state.firstDate ) {
                first = getValueFromDate(this.state.firstDate , this.props.lang);
            }
            let dir = ( this.state.hoverDate > first) ? 'forward' : 'backward';
            this.setState({hoverDate: e.target.dataset.value, direction:dir});
        } else {
            this.setState({hoverDate: e.target.dataset.value});
        }
    }

    dayCheck(day) {

        let classname = '';
        
        let first = null;
        if ( this.state.firstDate ) {
            first = getValueFromDate(this.state.firstDate , this.props.lang);
        }

        let seconed = null;
        if ( this.state.seconedDate ) {
            seconed = getValueFromDate(this.state.seconedDate , this.props.lang);
        }
        
        if ( this.props.rangePicker ) {
            if ( this.state.rangeActive ) {
                if ( day.value === first ) classname = 'startDate';
                if ( day.value === seconed ) classname = 'endDate';
                if ( this.state.hoverDate > first ) {
                    // forward
                    if ( this.state.hoverDate > day.value && day.value > first) {
                        classname = 'rangeSelect';
                    }
                } else {
                    // backward
                    if ( this.state.hoverDate < day.value && day.value < first) {
                        classname = 'rangeSelect';
                    }
                }
            } else  {
                if ( day.value === first ) classname = 'startDate';
                if ( day.value === seconed ) classname = 'endDate';
                if ( (first < day.value && day.value < seconed) || (first > day.value && day.value > seconed)) {
                    classname = 'rangeSelect';
                }
            }
        } else {
            if ( day.value === first ) classname = 'selected-date';
        }

        return classname;
    }

    render() {
        const {calendar} = this.props;

        let disableBeforeDate = null;
        if ( this.props.disableBeforeDate ) {
            disableBeforeDate = getValueFromDate(this.props.disableBeforeDate, this.props.lang);
        }

        let disableAfterDate = null;
        if ( this.props.disableAfterDate ) {
            disableAfterDate = getValueFromDate(this.props.disableAfterDate, this.props.lang)
        }

        let disableAfterToday = null;
        if ( this.props.disableAfterToday ) {
            disableAfterToday = getValueFromDate(calendar.today, this.props.lang)
        }

        let disableBeforeToday = null;
        if ( this.props.disableBeforeToday ) {
            disableBeforeToday = getValueFromDate(calendar.today, this.props.lang)
        }

        return (
            <div className="rn-main">
                <div className="rn-week-names">
                    {calendar[(this.props.weekNames ? this.props.weekNames : 'WEEK_DAYS_SHORT')].map((item,index) => {
                        return <div className="rn-cell rn-week-name" key={index}>{item}</div>
                    })}
                </div>
                <div className={"rn-days-wrapper " + this.state.direction +' '+ this.props.lang}>

                    {calendar.info.map((item,index) => {
                        let disablility = this.props.disabled;
                        if ( disableBeforeDate !== null ) {
                            if (item.value <= disableBeforeDate) disablility = true;
                        }

                        if (disableAfterDate !== null ) {
                            if (item.value >= disableAfterDate) disablility = true;
                        }

                        if ( disableBeforeToday !== null ) {
                            if ( item.value < disableBeforeToday ) disablility = true;
                        }

                        if ( disableAfterToday !== null ) {
                            if ( item.value > disableAfterToday ) disablility = true;
                        }

                        return (<button
                                    key={index} 
                                    data-type={item.type} 
                                    data-date={item.date} 
                                    data-value={item.value}
                                    data-today={item.isToday} 
                                    onMouseEnter={this.handleHover}
                                    onClick={this.handleSelectDate}
                                    disabled={ (disablility) ? "disabled" : ""}
                                    className={this.dayCheck(item) + " rn-cell " + ((this.props.daysExtraClass) ? this.props.daysExtraClass : "") }>{item.day}</button>)
                    })}
                </div>
            </div>
        );
    }
}
export default DateWrapper;
DateWrapper.propTypes = {
    name: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    disableBeforeDate: PropTypes.string,
    disableAfterDate: PropTypes.string,
    inputClass:PropTypes.string,
    weekNames:PropTypes.string,
    monthNames:PropTypes.string,
    rightBtnClass:PropTypes.string,
    leftBtnClass:PropTypes.string,
    rangePicker:PropTypes.bool,
    type: PropTypes.string,
    info:PropTypes.string,
    disabled:PropTypes.bool,
    disableBeforeToday:PropTypes.bool,
    disableAfterToday: PropTypes.bool,
    daysExtraClass:PropTypes.string,
    handleChange: PropTypes.func,
    lang:PropTypes.string
};