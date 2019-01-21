import React, { Component } from 'react';
import './index.scss';
import Calender , 
    { CURRENT_DATE,
        zeroPad,
        isEmptyObj,
        convertObjectDateToString,
        EN_WEEK_DAYS_SHORT,
        FA_WEEK_DAYS_SHORT,
        EN_MONTHS_SHORT,
        FA_MONTHS_SHORT,
        EN_MONTHS,
        FA_MONTHS,
        EN_WEEK_DAYS,
        FA_WEEK_DAYS } from "./helper";

// Datepicker
class Datepicker extends Component {

    constructor(props){
        super(props);

        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePrevMonth = this.handlePrevMonth.bind(this);
        this.handleSelectedDay = this.handleSelectedDay.bind(this);

        this.state = {
            lang: this.props.lang,
            startDate: "",
            endDate: "",
            currentDate: CURRENT_DATE(this.props.lang)
        }

        // set values for START date
        if ( !isEmptyObj(this.props.startDate) ) {
            this.state.startDate = convertObjectDateToString(this.props.startDate);
        }

        // set values for END date
        if ( !isEmptyObj(this.props.endDate) ) {
            this.state.endDate = convertObjectDateToString(this.props.endDate);
        }

    }

    handleNextMonth () {
        if ( this.props.disable ) return;
        let date = Object.assign({}, this.state.currentDate); 
        let mons = date.month;
        let yer = date.year;
            mons++;
            if(mons > 12) {
                mons = 1;
                yer++;
            }
        date.month = mons;
        date.year = yer;
        this.setState({currentDate:date});
    }

    handlePrevMonth () {
        if ( this.props.disable ) return;
        let date = Object.assign({}, this.state.currentDate); 
        let mons = date.month;
        let yer = date.year;
            mons--;
            if ( mons < 1 ) {
                mons = 12;
                yer--;
            }
        date.month = mons;
        date.year = yer;
        this.setState({currentDate:date});
    }    

    handleSelectedDay (dayItem){
        if ( this.props.disable ) return;

        // if rangePicker Enabled
        if ( this.props.rangePicker ) {
            // range picker heres
            let date = dayItem.split(',');
            let start = date[0];
            let end = date[1];
            this.setState({ startDate: start, endDate:end } , () => {
                let val = this.state.startDate + " " + this.state.endDate;
                this.props.handleChange(val);
            });

        } else {
            if ( dayItem.info !== "current-days" ) return;
            this.setState({startDate:dayItem.date} , () => {
                this.props.handleChange(this.state.startDate);
            });
        }

    }

    render() {
        
        let calander_days = Calender( this.state.currentDate.year , this.state.currentDate.month , this.state.lang , this.props.disable );
        let value = "";
        let BODY_TYPE = null;

        // is not ragePicker
        if ( !this.props.rangePicker ) {
            value = this.state.startDate;
            BODY_TYPE = <Body {...this.props} parentState={this.state} 
                                calender={calander_days}  onSelect={this.handleSelectedDay}/>
        } else {
            // rage picker here
            value = this.state.startDate + " " + this.state.endDate;
            BODY_TYPE = <RangeBody {...this.props} parentState={this.state} 
                                calender={calander_days}  updateRange={this.handleSelectedDay}/>
        }

        return (
            <div className="wrapper-rn-datepicker">
                <div className="rn-datepicker">
                    <Header {...this.props} parentState={this.state} lang={this.state.lang} nextMonth={this.handleNextMonth} prevMonth={this.handlePrevMonth} />
                    {BODY_TYPE}
                    <div className="rn-datepicker-footer">
                        <input className={ ((this.props.inputVisible) ? ' show ' : ' hide ') +  " rn-input"} defaultValue={value} />
                    </div>
                </div>
            </div>
        );
    }
}

// Header
class Header extends Component {
    
    constructor(props) {
        super(props);

        // check names and shortcuts of the names
        if ( this.props.shortNameOfTheWeek ) {
            this.week_days = ( this.props.lang === 'en' ) ? EN_WEEK_DAYS_SHORT : FA_WEEK_DAYS_SHORT;
        } else {
            this.week_days = ( this.props.lang === 'en' ) ? EN_WEEK_DAYS : FA_WEEK_DAYS;
        }

        if ( this.props.shortNameOfTheMonth ) {
            this.month_name = ( this.props.lang === 'en' ) ? EN_MONTHS_SHORT : FA_MONTHS_SHORT;
        } else {
            this.month_name = ( this.props.lang === 'en' ) ? EN_MONTHS : FA_MONTHS;
        }
        
    }

    render() { 
        let this_month = this.props.parentState.currentDate.month;
        return (
            <div className="rn-datepicker-header">
               <div className="actions">
                    
                    <button className="next-month rn-btn" onClick={this.props.nextMonth}>{">"}</button>
                    <div className="month-name">{this.month_name[this_month]}</div>
                    <button className="prev-month rn-btn" onClick={this.props.prevMonth}>{"<"}</button>
                    
                    <div className="year-name">{this.props.parentState.currentDate.year}</div>

               </div>
               <div className="day-names">
                    {this.week_days.map(( item , index ) => {
                        return <div key={index+ 'week'} className="week_cell">{item}</div>
                    })}
                </div>
            </div>
        );
    }
}

// not range picker
class Body extends Component {

    constructor(){
        super();

        this.handleDisableBeforeToday = this.handleDisableBeforeToday.bind(this);
        this.handleDisableAfterToday = this.handleDisableAfterToday.bind(this);
        this.handleDisableAfterDate = this.handleDisableAfterDate.bind(this);
        this.handleDisableBeforeDate = this.handleDisableBeforeDate.bind(this);
    }

    handleDisableBeforeToday (item) {
        return (item.date < this.props.calender.todayString);
    }

    handleDisableAfterToday(item) {
        return (item.date > this.props.calender.todayString);
    }

    handleDisableAfterDate (item) {
        return ( item.date > convertObjectDateToString(this.props.disableAfterDate) );
    }

    handleDisableBeforeDate (item) {
        return ( item.date < convertObjectDateToString(this.props.disableBeforeDate) );
    }

    render() { 
        
        let i = 1;
        let weekend = null;
        let selected = null;
        let beforeToday = null;
        let afterToday = null;
        let beforeDate = null;
        let afterDate = null;
        return (
            <div className={"rn-datepicker-body"}>
                { this.props.calender.all_days.map( (item , index) => {
                    
                    if ( i === 7) {
                        weekend = true;
                        i = 0;
                    } else {
                        weekend = false;
                    }
                    i++;

                    selected = ( item.date === this.props.parentState.startDate );

                    if ( this.props.disableBeforeToday ) {
                        beforeToday = this.handleDisableBeforeToday(item);
                    }

                    if ( this.props.disableAfterToday ) {
                        afterToday = this.handleDisableAfterToday(item);
                    }

                    if ( this.props.disableAfterDate ) {
                        afterDate = this.handleDisableAfterDate(item);
                    }

                    if ( this.props.disableBeforeDate ) {
                        beforeDate = this.handleDisableBeforeDate(item);
                    }

                    return (<div key={index + 'days'}
                                onClick={ () => this.props.onSelect(item) }
                                className={ 
                                    ((beforeDate)  ? ' disabled ' : '') + 
                                    ((afterDate)   ? ' disabled ' : '' ) +
                                    ((afterToday)  ? ' disabled ' : '' ) +
                                    ((beforeToday) ? ' disabled ' : '' ) +
                                    ((selected)    ? ' selectedDay ' : '') +  
                                    ((item.today)  ? ' today ' : '' ) + 
                                    ((weekend)     ? ' weekend ': '' ) + item.info + " rn-days "}
                                data-date={item.date}>
                                {item.day}
                            </div>)
                })}
            </div>
        );
    }
}

// this component executed when range picker is available
class RangeBody extends Component {
    
    constructor(props){
        super(props);

        this.hoverDays = this.hoverDays.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleRangehover = this.handleRangehover.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleDisableBeforeToday = this.handleDisableBeforeToday.bind(this);
        this.handleDisableAfterDate = this.handleDisableAfterDate.bind(this);
        this.handleDisableBeforeDate = this.handleDisableBeforeDate.bind(this);

        this.state = {
            firstclick: true,
            startDate: null ,
            rangeActive: false,
            endDate: null,
            hoverDate: null ,
            rangeDate:null
        }

        if ( !isEmptyObj(this.props.startDate) ) {
            this.state.startDate = this.props.startDate.year +'-'+ zeroPad(this.props.startDate.month , 2) +'-'+ zeroPad(this.props.startDate.day , 2);
        }

        if ( !isEmptyObj(this.props.endDate) ) {
            this.state.endDate = this.props.endDate.year +'-'+ zeroPad(this.props.endDate.month , 2) +'-'+ zeroPad(this.props.endDate.day, 2);
        }

        if ( !isEmptyObj(this.props.endDate) ) {
            this.state.hoverDate = this.props.endDate.year +'-'+ zeroPad(this.props.endDate.month , 2) +'-'+ zeroPad(this.props.endDate.day, 2);
        }
    }

    onSelect(dayItem) {
        if ( dayItem.info !== "current-days" ) return;

        // first time click on date
        if ( this.state.firstclick ) {

            this.setState({
                firstclick: false,
                endDate:null,
                hoverDate:null,
                rangeActive: true,
                startDate: dayItem.date
            });

        // seconed time click on date
        } else {

            if ( this.state.hoverDate > this.state.startDate ) {
                // forward
                this.setState({
                    firstclick: true,
                    rangeActive: false,
                    endDate: this.state.hoverDate
                },() => {
                    let range = null;
                    range =  this.state.startDate + "," + this.state.endDate;
                    if ( !this.state.rangeActive && this.state.endDate ) {
                        this.props.updateRange( range );
                    }
                });

            } else {
                // backward
                let endDate = this.state.startDate
                let hover = this.state.hoverDate;
                this.setState({
                    firstclick: true,
                    rangeActive: false,
                    startDate: hover,
                    endDate: endDate
                } ,() => {
                    let range = null;
                    range =  this.state.startDate + "," + this.state.endDate;
                    if ( !this.state.rangeActive && this.state.endDate ) {
                        this.props.updateRange( range );
                    }
                });
            }
        }        
    }

    hoverDays(dayItem) {
        
        if ( dayItem.info !== "current-days" && this.state.rangeActive) return;
        if (this.state.endDate === null) {
            this.setState({
                hoverDate: dayItem.date
            });
        }
       
    }

    handleRangehover (item) {
        if ( this.state.rangeActive ) {
            if ( this.state.startDate < item.date ) {
                return (item.date < this.state.hoverDate);
            } else {
                return (item.date > this.state.hoverDate);
            }
        } else {
            return ( this.state.startDate < item.date && item.date < this.state.endDate );
        }
    }

    handleStartDate(item) {
        return ( item.date === this.state.startDate );
    }

    handleEndDate(item) {
        return ( item.date === this.state.endDate );
    }

    handleDisableBeforeToday (item) {
        return (item.date < this.props.calender.todayString)
    }

    handleDisableAfterToday(item) {
        return (item.date > this.props.calender.todayString)
    }
    
    handleDisableAfterDate (item) {
        return ( item.date > convertObjectDateToString(this.props.disableAfterDate) );
    }

    handleDisableBeforeDate (item) {
        return ( item.date < convertObjectDateToString(this.props.disableBeforeDate) );
    }

    render() { 
        let i = 1;
        let weekend = null;
        let startDate = null;
        let endDate = null;
        let hover =  null;
        let afterToday = null;
        let beforeToday = null;
        let afterDate = null;
        let beforeDate = null;

        return (
            <div className={"rn-datepicker-body"}>
                { this.props.calender.all_days.map( (item , index) => {
                    
                    if ( i === 7) {
                        weekend = true;
                        i = 0;
                    } else {
                        weekend = false;
                    }
                    i++;

                    if ( this.props.disableBeforeToday ) {
                        beforeToday = this.handleDisableBeforeToday(item);
                    }

                    if ( this.props.disableAfterToday ) {
                        afterToday = this.handleDisableAfterToday(item);
                    }


                    if ( this.props.disableAfterDate ) {
                        afterDate = this.handleDisableAfterDate(item);
                    }

                    if ( this.props.disableBeforeDate ) {
                        beforeDate = this.handleDisableBeforeDate(item);
                    }

                    startDate = this.handleStartDate(item)
                    endDate = this.handleEndDate(item);
                    hover = this.handleRangehover(item);

                    return (<div key={index + 'days'}
                                onClick={ () => this.onSelect(item) }
                                onMouseEnter={ () => this.hoverDays(item) }
                                className={ 
                                    this.props.exteraClassForDays + " " + 
                                    ((beforeDate)   ? ' disabled ' : '') + 
                                    ((afterDate)    ? ' disabled ' : '' ) +
                                    ((afterToday)   ? ' disabled ' : '' ) +
                                    ((beforeToday)  ? ' disabled ' : '' ) + 
                                    ((hover)        ? ' range-select ' : '' ) +  
                                    ((endDate)      ? ' endDate ' : '' ) + 
                                    ((startDate)    ? ' startDate ' : '' ) +  
                                    ((item.today)   ? ' today ' : '' ) + 
                                    ((weekend)      ? ' weekend ': '' ) + item.info + " rn-days "}
                                data-date={item.date}>
                                {item.day}
                            </div>)
                })}
            </div>
        );
    }
}

export default Datepicker;