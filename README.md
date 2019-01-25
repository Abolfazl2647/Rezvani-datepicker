# rezvani-datepicker
#### Persian And Gregorian Date Picker - ReactJs

Finaly - Persian Date Picker For React Js Developers 

![RN-datepicker-jalali](https://raw.githubusercontent.com/Abolfazl2647/rn-datepicker/master/public/jalali.png)

![RN-datepicker-garegorian](https://raw.githubusercontent.com/Abolfazl2647/rn-datepicker/master/public/garegorian.png)


### Installing:

```
npm install rezvani-datepicker
yarn add rezvani-datepicker

```

Now add these files to you html:

```React Component at the top
require('rezvani-datepicker') // ES5 from npm
import React, { Component } from 'react' // ES6;
import Datepicker from 'rezvani-datepicker';

// styles

import 'rezvani-datepicker/public/index.css';
// OR SASS
import 'rezvani-datepicker/public/index.scss';

```

### How to use:
```React Component in render method:

import React, { Component } from 'react';
import Datepicker from 'rezvani-datepicker';
import 'rezvani-datepicker/public/index.css';

class App extends Component {

  exmapleHandle (selectedDate){
    console.log(selectedDate);
  }

  render() {
    return (
      <div className="App">  

        <Datepicker
              lang={"fa"}
              disable={false}
              handleChange={this.exmapleHandle.bind(this)}
              inputVisible={true}
              shortNameOfTheWeek={false}
              shortNameOfTheMonth={false}
              disableBeforeToday={false}
              disableAfterToday={false}
              disableAfterDate={null}
              disableBeforeDate={null}
              rangePicker={false}
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
**exteraClassForDays** | [''] , 'STRING' | just extrea css Class that will added to each days for desigin reasons
**handleChange** | function (date) | a function which trigger after date and range date are selected - (date) is result of selected date
**inputVisible** | [true], false | result of datepicker allways stored in an input under datepicker which can be hidden or visible
**shortNameOfTheMonth** | true, [false] | use short names for month's names
**shortNameOfTheWeek** | true, [false] | use short names for days's names of week

<hr>