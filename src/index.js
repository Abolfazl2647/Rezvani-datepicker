import React, { Component } from 'react';
import Core , 
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
        FA_WEEK_DAYS } from "./helper.js";

// Datepicker
class Calendar extends Component {

    constructor(props){
        super(props);

        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePrevMonth = this.handlePrevMonth.bind(this);
        this.handleSelectedDay = this.handleSelectedDay.bind(this);

        this.state = {
            lang: this.props.lang,
            startDate: "",
            endDate: "",
            inputValue:"",
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
            this.setState({ startDate: start, endDate: end , inputValue: (start+ " " + end) } , () => {
                let val = this.state.startDate + " " + this.state.endDate;
                if ( this.props.handleChange ) {
                    this.props.handleChange(val);
                }
            });

        } else {
            
            if ( dayItem.isDisable ) return;
            this.setState({startDate:dayItem.date , inputValue: dayItem.date} , () => {
                if (this.props.handleChange) {
                    this.props.handleChange(this.state.startDate);
                }
            });
        }

    }

    render() {
        
        let calander_days = Core( this.state.currentDate.year , this.state.currentDate.month , this.props );
        // let value = "";
        let BODY_TYPE = null;

        // is not ragePicker
        if ( !this.props.rangePicker ) {
            // value = this.state.startDate;
            BODY_TYPE = <Body {...this.props} parentState={this.state} 
                                calender={calander_days}  onSelect={this.handleSelectedDay}/>
        } else {
            // rage picker here
            // value = this.state.startDate + " " + this.state.endDate;
            BODY_TYPE = <RangeBody {...this.props} parentState={this.state} 
                                calender={calander_days}  updateRange={this.handleSelectedDay}/>
        }

        return (
            <div className="rn-calendar-wrapper">
                <div className="rn-calendar">
                    <Header {...this.props} parentState={this.state} lang={this.state.lang} nextMonth={this.handleNextMonth} prevMonth={this.handlePrevMonth} />
                    {BODY_TYPE}
                    <div className="rn-datepicker-footer">
                        <input className={ ((this.props.inputVisible) ? ' show ' : ' hide ') +  " rn-datepicker-input"} defaultValue={this.state.inputValue} />
                    </div>
                </div>
            </div>
        );
    }
}


class Datepicker extends Component {

    constructor(props){
        super(props);

        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePrevMonth = this.handlePrevMonth.bind(this);
        this.handleSelectedDay = this.handleSelectedDay.bind(this);
        this.timeForDatepicker = this.timeForDatepicker.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.refrence = React.createRef();

        this.state = {
            visibility:false,
            lang: this.props.lang,
            startDate: "",
            endDate: "",
            inputValue:"",
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

    componentDidMount ()    { document.addEventListener('mousedown', this.handleClickOutside,false); }

    componentWillUnmount()  { document.removeEventListener('mousedown', this.handleClickOutside,false); }

    handleClickOutside (e)  {
        if ( this.refrence && !this.refrence.current.contains(e.target) )
            this.setState({visibility:false});
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
            this.setState({ startDate: start, endDate: end , inputValue: (start+ " " + end) } , () => {
                let val = this.state.startDate + " " + this.state.endDate;
                if ( this.props.handleChange ) {
                    this.props.handleChange(val);
                }
            });

        } else {
            
            if ( dayItem.isDisable ) return;
            this.setState({startDate:dayItem.date , inputValue: dayItem.date} , () => {
                if (this.props.handleChange) {
                    this.props.handleChange(this.state.startDate);
                }
            });
        }

    }

    timeForDatepicker (){
        this.setState({visibility: true});
    }

    render() { 
        let calander_days = (this.state.visibility) ? Core( this.state.currentDate.year , this.state.currentDate.month , this.props ) : [];
            console.log(calander_days);
        // let value = "";
        let BODY_TYPE = null;

        if (this.state.visibility ) {

            // is not ragePicker
            if ( !this.props.rangePicker ) {
                // value = this.state.startDate;
                BODY_TYPE = <Body {...this.props} parentState={this.state} 
                                    calender={calander_days}  onSelect={this.handleSelectedDay}/>
            } else {
                // rage picker here
                // value = this.state.startDate + " " + this.state.endDate;
                BODY_TYPE = <RangeBody {...this.props} parentState={this.state} 
                                    calender={calander_days}  updateRange={this.handleSelectedDay}/>
            }
        }

        return (
            <React.Fragment>
                <div className="rn-datepicker-wrapper">
                    <input className={ (this.props.exteraClassForInput !== "") ? this.props.exteraClassForInput : "rn-datepicker-input"} type="text" onClick={this.timeForDatepicker} defaultValue={this.state.inputValue}/>
                    <div className={( (this.state.visibility) ? ' show ' : ' hide ') + ' rn-datepicker-popover '} ref={this.refrence}>
                        <div className="rn-datepicker">
                            <Header {...this.props} parentState={this.state} lang={this.state.lang} nextMonth={this.handleNextMonth} prevMonth={this.handlePrevMonth} />
                            {BODY_TYPE}
                        </div>
                    </div>
                </div>
            </React.Fragment>
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
                    
                    <button className={ ( (this.props.customClassIconRightBtn) ? this.props.customClassIconRightBtn :"") + " next-month rn-btn " } onClick={this.props.nextMonth}>{(this.props.customClassIconRightBtn) ? '' : '>'}</button>
                    <div className="month-name">{this.month_name[this_month]}</div>
                    <button className={ ( (this.props.customClassIconLeftBtn) ? this.props.customClassIconLeftBtn :"") + " prev-month rn-btn "} onClick={this.props.prevMonth}>{(this.props.customClassIconLeftBtn) ? '' : '<'}</button>
                    
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

    constructor(props){
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect (item , disableProps) {
        if (disableProps) return;
        this.props.onSelect(item);
    }

    render() { 
        
        let i = 1;
        let weekend = false;
        let selected = false;
        let disableProps = false;

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

                    return (<div key={index + 'days'}
                                onClick={ () => this.onSelect(item , disableProps) }
                                className={ 
                                    ((selected)    ? ' selectedDay ' : '') +  
                                    ((item.isToday)  ? ' today ' : '' ) + 
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
        this.checkEndDate = this.checkEndDate.bind(this);
        this.checkStartDate = this.checkStartDate.bind(this);

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

    onSelect(dayItem , disableProps) {
        if (dayItem.isDisable) return;
        if (disableProps) return;

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
        
        if ( dayItem.isDisable && this.state.rangeActive) return;
        if (this.state.endDate === null) {
            this.setState({
                hoverDate: dayItem.date
            });
        }
       
    }

    handleRangehover (item) {
        if ( this.state.rangeActive ) {
            if ( this.state.startDate < item.date ) {
                // forward
                return (item.date < this.state.hoverDate);
            } else {
                // backward
                return (item.date > this.state.hoverDate);
            }
        } else {
            return ( this.state.startDate < item.date && item.date < this.state.endDate );
        }
    }

    checkStartDate(item) {
        return ( item.date === this.state.startDate );
    }

    checkEndDate(item) {
        return ( item.date === this.state.endDate );
    }

    render() { 
        let i = 1;
        let weekend = null;
        let startDate = null;
        let endDate = null;
        let hover =  null;
        let disableProps = false;

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
                    startDate = this.checkStartDate(item)
                    endDate = this.checkEndDate(item);
                    hover = this.handleRangehover(item);

                    return (<div key={index + 'days'}
                                onClick={ () => this.onSelect(item, disableProps) }
                                onMouseEnter={ () => this.hoverDays(item) }
                                className={ 
                                    this.props.exteraClassForDays + " " + 
                                    ((hover)        ? ' range-select ' : '' ) +  
                                    ((endDate)      ? ' endDate ' : '' ) + 
                                    ((startDate)    ? ' startDate ' : '' ) +  
                                    ((item.isToday)  ? ' today ' : '' ) + 
                                    ((weekend)      ? ' weekend ': '' ) + item.info + " rn-days "}
                                data-date={item.date}>
                                {item.day}
                            </div>)
                })}
            </div>
        );
    }
}

export {
    Calendar , Datepicker
};