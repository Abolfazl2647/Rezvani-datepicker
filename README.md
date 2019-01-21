# rezvani-datepicker
#### Persian And Gregorian Date Picker - ReactJs

Persian Date Picker For React Js Developers 

![RN-datepicker-jalali](https://raw.githubusercontent.com/Abolfazl2647/rn-datepicker/master/public/jalali.png)

![RN-datepicker-garegorian](https://raw.githubusercontent.com/Abolfazl2647/rn-datepicker/master/public/garegorian.png)


### Installing:

***npm install rezvani-datepicker***

Now add these files to you html:
```React Component at the top
require('rezvani-datepicker') // ES5 from npm
import React, { Component } from 'react' // ES6;
import Datepicker from 'rezvani-datepicker';
```

### How to use:
```React Component in render method:
notice: for now just copy all the props of <Datepicker /> with pre defined values

<Datepicker
    lang={"fa"}
    disable={false}
    handleChange={this.exmapleHandle}
    inputVisible={false}
    shortNameOfTheWeek={false}
    shortNameOfTheMonth={false}
    disableBeforeToday={false}
    disableAfterToday={false}
    disableAfterDate={null}
    disableBeforeDate={null}
    rangePicker={true}
    exteraClassForDays={""}
    startDate={""}
    endDate={""}
/>


```

<hr>


### Options:
Default values are into `[ ]`

Name | Values | Description | Sample
------------- | ------------- | ------------- |-------------
**lang** | en, [fa] | en --> geregorian and fa --> jalali
**disable** | [false], true | Make Date Picker Disable
**disableBeforeDate** | [null], {year:1397,month:10,day:02} | default option is null - set all days before selected date going to be disable
**disableAfterDate** | [null], {year:1397,month:10,day:02} | default option is null - set all days after selected date going to be disable
**disableAfterToday** | true, [false] | default option is [false] - set all days after Today date going to be disable
**disableBeforeToday** | true, [false] | default option is [false] - set all days before Today date going to be disable
**rangePicker** | [false], true | Change Datepicker Environment to Range Picker
**endDate** | [null], {year:1397,month:10,day:02} | pre selected start date - for single date and range date
**startDate** | [null], {year:1397,month:10,day:02} | pre selected end date - only for range date
**exteraClassForDays** | [''] , 'STRING' | just extrea css Class that will added to each days for desigin reasons
**handleChange** | function (date) | a function which trigger after date and range date are selected - (date) is result of selected date
**inputVisible** | [true], false | result of datepicker allways stored in an input under datepicker which can be hidden or visible
**shortNameOfTheMonth** | true, [false] | use short names for month's names
**shortNameOfTheWeek** | true, [false] | use short names for days's names of week

<hr>