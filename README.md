# rezvani-datepicker
#### Persian And Gregorian Date Picker - ReactJs
[![npm](https://img.shields.io/npm/dt/rezvani-datepicker.svg)](https://www.npmjs.com/package/rezvani-datepicker)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Please help me to make the best persian datepicker library for React Js. I need your support! 
thanks

### Datepicker:
![RN-datepicker-datepicker-range](https://raw.githubusercontent.com/Abolfazl2647/rn-datepicker/master/public/rn-datepicker.png)

### Installing:

```
npm install rezvani-datepicker --> (there is problem to install rezvani-datepicker with npm but you free to use yarn i'll fixed this problem soon)

yarn add rezvani-datepicker

```

Now add these files:

```React Component at the top

require('rezvani-datepicker') // ES5 from npm

import React, { Component } from 'react' // ES6;
import Datepicker from 'rezvani-datepicker';

// CSS (minifyed)
import 'rezvani-datepicker/public/datepicker.min.css';

// SASS (scss)
import 'rezvani-datepicker/public/datepicker.scss';

```
<hr>

### How to use:
```React Component in render method:

import React, { Component } from 'react';
import { Calendar , Datepicker } from 'rezvani-datepicker';
import 'rezvani-datepicker/public/datepicker.scss';
import 'rezvani-datepicker/public/calendar.scss';

class App extends Component {

  exmapleHandle (selectedDate){
    console.log(selectedDate);
  }

  render() {
    return (
      <div className="App">  

        <Datepicker
            type: PropTypes.string,
            info:PropTypes.bool,
            name: PropTypes.string,
            lang:PropTypes.string
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
            daysExtraClass:PropTypes.string,
            disabled:PropTypes.bool,
            disableBeforeToday:PropTypes.bool,
            disableAfterToday: PropTypes.bool,
            handleChange: PropTypes.func,
          /> 

      </div>
    );
  }
}

export default App;


```
<hr>


### Options:
Default values are into `[ ]`

Name | Values | Description | Sample
------------- | ------------- | ------------- |-------------
**lang** | en, [fa] , 'STRING'  | en --> geregorian and fa --> jalali
**type** | [datepicker], 'STRING'| you need datepicker or calendar | datepicker - calendar
**name** | "" , 'STRING'  | name of the datepicker input | datepickerName
**startDate** | [null], 'STRING' | start date of range date | 1397/02/21 or 2019/04/13
**disableBeforeDate** | [null], 'STRING'| disable all dates before the given date | 1397/02/21 or 2019/04/13
**disableAfterDate** | [null], 'STRING'| disable all dates after the given date | 1397/02/21 or 2019/04/13
**inputClass**| [null], 'STRING'| css class of datepicker input | "myClass"
**weekNames** | [null], 'STRING' | default option is [false] - set all days before Today date going to be disable | WEEK_DAYS - WEEK_DAYS_SHORT
**monthNames** | [null], 'STRING' | default option is [false] - set all days before Today date going to be disable |  MONTHS - MONTHS_SHORT
**rightBtnClass** | [icon], 'STRING'| class name like font awersone or etc | fa fa-chevron-right
**leftBtnClass** | [icon], 'STRING'| class name like font awersone or etc | fa fa-chevron-left
**rangePicker** | [false], 'BOOL'| do you need range select | true,false
**info** | [true], 'BOOL'| today information blue box | true,false
**disabled** | [false], 'BOOL'| if you need to disable datepicker (only for calendar) | true,false
**disableBeforeToday** | [false], 'BOOL'| disable all days before today | true,false
**disableAfterToday** | [fasle], 'BOOL'| disable all days after today | true,false
**daysExtraClass** | [""], 'STRING'| class name which will apply to all days | "myClass"
**handleChange** | [null], 'FUNC'| On Select date | callback returns an object with startDate and endDate - chosen date in New Date format and String format
