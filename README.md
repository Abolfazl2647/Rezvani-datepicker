# rezvani-datepicker
#### Persian And Gregorian Date Picker - ReactJs
[![npm](https://img.shields.io/npm/dt/rezvani-datepicker.svg)](https://www.npmjs.com/package/rezvani-datepicker)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Notice: 
there is a bug: if you change the options of datepicker o calendar out of the box nothing change.
it means once datepicker or calendar mounted with your options , changing these options won't take effect.
but i will fixed this issue as soon as possible.



### Datepicker:
![RN-datepicker-datepicker-range](https://raw.githubusercontent.com/Abolfazl2647/rn-datepicker/master/public/rn-datepicker.png)

<hr>

### Online DEMO:

[Click Here !](https://4qv87wjnqw.codesandbox.io/)

### Installing:

```
npm install rezvani-datepicker

yarn add rezvani-datepicker

```

Now add these files to you html:

```React Component at the top

require('rezvani-datepicker') // ES5 from npm

import React, { Component } from 'react' // ES6;
import { Calendar , Datepicker } from 'rezvani-datepicker';

// CSS (minifyed)
import 'rezvani-datepicker/public/datepicker.css';
import 'rezvani-datepicker/public/calendar.css';

// SASS (scss)
import 'rezvani-datepicker/public/datepicker.scss';
import 'rezvani-datepicker/public/calendar.scss';

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

       <Calendar
                lang={"fa"}
                disable={false}
                // handleChange={this.exmapleHandle.bind(this)}
                inputVisible={true}
                shortNameOfTheWeek={false}
                shortNameOfTheMonth={false}
                disableBeforeToday={false}
                disableAfterToday={false}
                disableAfterDate={null}
                disableBeforeDate={null}
                rangePicker={true}
                customClassIconRightBtn={"mdi mdi-chevron-right"}
                customClassIconLeftBtn={"mdi mdi-chevron-left"}
                exteraClassForDays={""}
                startDate={""}
                endDate={""}
            />

        <Datepicker
              lang={"fa"}
              disable={false}
              // handleChange={this.exmapleHandle.bind(this)}
              inputVisible={true}
              shortNameOfTheWeek={true}
              shortNameOfTheMonth={false}
              disableBeforeToday={true}
              disableAfterToday={false}
              disableAfterDate={null}
              disableBeforeDate={null}
              rangePicker={false}
              customClassIconRightBtn={"mdi mdi-chevron-right"}
              customClassIconLeftBtn={"mdi mdi-chevron-left"}
              exteraClassForInput={""}
              exteraClassForDays={""}
              startDate={""}
              endDate={""}
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
**lang** | en, [fa] | en --> geregorian and fa --> jalali
**disable** | [false], true | Make Date Picker Disable
**disableBeforeDate** | [null], {year:1397,month:10,day:02} | default option is null - set all days before selected date going to be disable
**disableAfterDate** | [null], {year:1397,month:10,day:02} | default option is null - set all days after selected date going to be disable
**disableAfterToday** | true, [false] | default option is [false] - set all days after Today date going to be disable
**disableBeforeToday** | true, [false] | default option is [false] - set all days before Today date going to be disable
**rangePicker** | [false], true | Change Datepicker Environment to Range Picker
**endDate** | [null], {year:1397,month:10,day:02} | pre selected start date - for single date and range date
**startDate** | [null], {year:1397,month:10,day:02} | pre selected end date - only for range date
**exteraClassForDays** | [''] , 'STRING' | just extrea css Class that will `added` to each days
**exteraClassForInput** | [''] , 'STRING' | just extrea css Class that will `replace` with input class
**handleChange** | function (date) | a function which trigger after date and range date are selected - (date) is result of selected date
**inputVisible** | [true], false | result of datepicker allways stored in an input under datepicker which can be hidden or visible
**shortNameOfTheMonth** | true, [false] | use short names for month's names
**customClassIconRightBtn** | "mdi mdi-chevron-right", [STRING] | if its false or empty ">" will be replaced
**customClassIconLeftBtn** | "mdi mdi-chevron-left", [STRING] | if its false or empty "<" will be replaced

