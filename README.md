# rn-react-datepicker
#### Persian And Gregorian Date Picker - ReactJs

![RN-datepicker-singleDate](https://raw.githubusercontent.com/Abolfazl2647/rn-datepicker/master/public/singleDate.png)

![RN-datepicker-rangeDate](https://raw.githubusercontent.com/Abolfazl2647/rn-datepicker/master/public/rangeDate.png)


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
**inputVisible** | true, [false] | result of datepicker allways stored in an input under datepicker which can be hidden or visible
**shortNameOfTheMonth** | true, [false] | use short names for month's names
**shortNameOfTheWeek** | true, [false] | use short names for days's names of week

<hr>