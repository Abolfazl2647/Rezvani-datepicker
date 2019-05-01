'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateFns = require('date-fns');

var _core = require('./core.js');

var _typeCheck = require('./typeCheck.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateWrapper = function (_Component) {
    _inherits(DateWrapper, _Component);

    function DateWrapper(props) {
        _classCallCheck(this, DateWrapper);

        var _this = _possibleConstructorReturn(this, (DateWrapper.__proto__ || Object.getPrototypeOf(DateWrapper)).call(this, props));

        _this.refrence = _react2.default.createRef();

        _this.goToday = _this.goToday.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.showDatepicker = _this.showDatepicker.bind(_this);
        _this.handlePrevMonth = _this.handlePrevMonth.bind(_this);
        _this.handleNextMonth = _this.handleNextMonth.bind(_this);
        _this.hanleReceiveValue = _this.hanleReceiveValue.bind(_this);
        _this.handleClickOutside = _this.handleClickOutside.bind(_this);

        // TODO : maximum error handling

        var START_DATE = null;
        var lang = _this.props.lang ? _this.props.lang : 'fa';
        if (_this.props.startDate) {
            if ((0, _typeCheck.isDate)(_this.props.startDate)) {
                START_DATE = _this.props.startDate;
            } else {
                START_DATE = (0, _core.changeDateStringToFunc)(_this.props.startDate, lang);
            }
        } else {
            START_DATE = new Date();
        }

        _this.state = {
            visibility: false,
            date: START_DATE,
            inputValue: ""
        };
        return _this;
    }

    _createClass(DateWrapper, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // TODO : check errors handleing
            // console.log('updated')
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside, false);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside, false);
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside(e) {
            if (this.state.visibility) {
                if (this.refrence && !this.refrence.current.contains(e.target)) this.setState({ visibility: false });
            }
        }
    }, {
        key: 'showDatepicker',
        value: function showDatepicker() {
            this.setState({ visibility: true });
        }
    }, {
        key: 'hanleReceiveValue',
        value: function hanleReceiveValue(value) {
            var _this2 = this;

            var valueList = Object.values(value);
            var lang = this.props.lang ? this.props.lang : 'fa';

            // range picker ture
            if (valueList.length === 2) {
                if (!(valueList[0] && valueList[1])) return;
                var start = (0, _core.changeFuncToDateString)(valueList[0], lang);
                var end = (0, _core.changeFuncToDateString)(valueList[1], lang);
                this.setState({
                    inputValue: start + "-" + end }, function () {
                    if (_this2.props.handleChange) {
                        _this2.props.handleChange({
                            startDate: { string: start, func: valueList[0] },
                            endDate: { string: end, func: valueList[1] }
                        });
                    }
                });
            } else {
                this.setState({ inputValue: (0, _core.changeFuncToDateString)(valueList[0], lang) }, function () {
                    if (_this2.props.handleChange) {
                        _this2.props.handleChange({
                            startDate: { string: (0, _core.changeFuncToDateString)(valueList[0], lang), func: valueList[0] }
                        });
                    }
                });
            }
        }
    }, {
        key: 'goToday',
        value: function goToday() {
            this.setState({ date: new Date() });
        }
    }, {
        key: 'handleNextMonth',
        value: function handleNextMonth() {
            this.setState({ date: (0, _dateFns.addMonths)(this.state.date, 1) });
        }
    }, {
        key: 'handlePrevMonth',
        value: function handlePrevMonth() {
            this.setState({ date: (0, _dateFns.subMonths)(this.state.date, 1) });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var value = e.target.value;
            this.setState({ inputValue: value });
            // TODO: check if value is like 1231/12/23 then apply it to the datepicker
            var REGEX = RegExp('^(13[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$', 'g');
            if (REGEX.test(value)) {
                this.setState({ firstDate: (0, _core.changeDateStringToFunc)(REGEX) });
            }
        }
    }, {
        key: 'render',
        value: function render() {

            // set option type or default type
            var TYPE = null;
            if (this.props.type) {
                var typeString = this.props.type.toLowerCase();
                TYPE = typeString === 'datepicker' || typeString === 'calendar' ? typeString : 'datepicker';
            } else {
                TYPE = 'datepicker';
            }

            // set option lang or default lang
            var CALENDAR = null;
            if (this.props.lang) {
                CALENDAR = this.props.lang.toLowerCase() === 'fa' ? (0, _core.create_calendar_fa)(this.state.date) : (0, _core.create_calendar)(this.state.date);
            } else {
                CALENDAR = (0, _core.create_calendar_fa)(this.state.date);
            }

            if ((0, _typeCheck.isBoolean)(this.props.name)) {
                console.log('Warning: input name can not be boolian');
            }

            var INPUT = TYPE === 'datepicker' ? _react2.default.createElement(
                'div',
                { className: 'rn-input-wrapper' },
                _react2.default.createElement('input', { type: 'text',
                    autoComplete: 'off',
                    value: this.state.inputValue,
                    onChange: this.handleChange,
                    onFocus: this.showDatepicker,
                    name: this.props.name ? this.props.name : "rn-datepciker-name",
                    className: (this.props.inputClass ? this.props.inputClass : "") + ' rn-input ' })
            ) : null;

            var HeaderInfo = TYPE === 'calendar' && this.props.info ? _react2.default.createElement(
                'div',
                { className: 'rn-info', onClick: this.goToday },
                _react2.default.createElement(
                    'p',
                    { className: 'dayName' },
                    CALENDAR.WEEK_DAYS[CALENDAR.dayOfTheWeek]
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'center-info' },
                    _react2.default.createElement(
                        'p',
                        { className: 'day text' },
                        CALENDAR.day
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'month text' },
                        CALENDAR[this.props.monthNames ? this.props.monthNames : 'MONTHS'][CALENDAR.month - 1]
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'year text' },
                        CALENDAR.year
                    )
                )
            ) : null;

            var rightBtnClass = this.props.rightBtnClass ? this.props.rightBtnClass : " icon ";
            var leftBtnClass = this.props.leftBtnClass ? this.props.leftBtnClass : " icon ";

            var visibility = 'show';
            if (TYPE !== 'calendar') {
                visibility = this.state.visibility ? ' show ' : ' hide ';
            }

            return _react2.default.createElement(
                'div',
                { className: "rn-date-wrapper " + CALENDAR.lang + " " + TYPE },
                INPUT,
                HeaderInfo,
                _react2.default.createElement(
                    'div',
                    { className: visibility + " rn-datepicker", ref: this.refrence },
                    _react2.default.createElement(
                        'div',
                        { className: 'rn-header' },
                        _react2.default.createElement(
                            'div',
                            { className: 'rn-action-header' },
                            _react2.default.createElement('button', { className: leftBtnClass + " rn-prev-month rn-cell ", onClick: this.handlePrevMonth }),
                            _react2.default.createElement(
                                'div',
                                { className: 'rn-middle-info' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    CALENDAR.year
                                ),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    CALENDAR[this.props.monthNames ? this.props.monthNames : 'MONTHS'][CALENDAR.month - 1]
                                )
                            ),
                            _react2.default.createElement('button', { className: rightBtnClass + " rn-next-month rn-cell ", onClick: this.handleNextMonth })
                        )
                    ),
                    _react2.default.createElement(Body, _extends({ calendar: CALENDAR }, this.props, { receiveValue: this.hanleReceiveValue })),
                    _react2.default.createElement(
                        'div',
                        { className: 'rn-footer' },
                        ' ',
                        ' '
                    )
                )
            );
        }
    }]);

    return DateWrapper;
}(_react.Component);

var Body = function (_Component2) {
    _inherits(Body, _Component2);

    function Body(props) {
        _classCallCheck(this, Body);

        var _this3 = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

        _this3.dayCheck = _this3.dayCheck.bind(_this3);
        _this3.handleHover = _this3.handleHover.bind(_this3);
        _this3.handleSelectDate = _this3.handleSelectDate.bind(_this3);
        var lang = _this3.props.lang ? _this3.props.lang : 'fa';

        // check if firstDate filled
        var firstDate = null;
        if (_this3.props.startDate) {
            if ((0, _typeCheck.isDate)(_this3.props.startDate)) {
                firstDate = _this3.props.startDate;
            } else {
                firstDate = (0, _core.changeDateStringToFunc)(_this3.props.startDate, lang);
            }
        }

        // check if seconedDate filled
        var seconedDate = null;
        if (_this3.props.endDate) {
            if ((0, _typeCheck.isDate)(_this3.props.endDate)) {
                seconedDate = _this3.props.endDate;
            } else {
                seconedDate = (0, _core.changeDateStringToFunc)(_this3.props.endDate, lang);
            }
        }
        // firstDate and seconedDate allways is a function in en
        _this3.state = {
            direction: 'forward',
            rangeActive: false,
            clickTimes: 0,
            firstDate: firstDate, // func type
            seconedDate: seconedDate, // func type
            hoverDate: '' // string value
        };

        return _this3;
    }

    _createClass(Body, [{
        key: 'handleSelectDate',
        value: function handleSelectDate(e) {
            var _this4 = this;

            if (e.target.disabled) return;
            var lang = this.props.lang ? this.props.lang : 'fa';
            var DATE = (0, _core.changeDateStringToFunc)(e.target.dataset.date, lang);
            // if range picker
            if (this.props.rangePicker) {

                if (this.state.clickTimes === 0) {
                    this.setState({ seconedDate: null, firstDate: DATE, clickTimes: 1, rangeActive: true });
                } else if (this.state.clickTimes === 1) {
                    this.setState({ seconedDate: DATE, clickTimes: 2, rangeActive: false
                    }, function () {
                        // maybe pass it up
                        // it must be translate the result to en and fa
                        var rangeDateResult = {
                            firstDate: _this4.state.firstDate,
                            seconedDate: _this4.state.seconedDate
                        };
                        _this4.props.receiveValue(rangeDateResult);
                    });
                } else if (this.state.clickTimes === 2) {
                    this.setState({ seconedDate: null, firstDate: null, clickTimes: 0, rangeActive: false }, function () {
                        var rangeDateResult = {
                            firstDate: '',
                            seconedDate: ''
                        };
                        _this4.props.receiveValue(rangeDateResult);
                    });
                }
            } else {
                this.setState({ firstDate: DATE, seconedDate: null, clickTimes: 0, rangeActive: false }, function () {
                    var firstDate = {
                        firstDate: _this4.state.firstDate
                    };
                    _this4.props.receiveValue(firstDate);
                });
            }
        }
    }, {
        key: 'handleHover',
        value: function handleHover(e) {
            if (!this.props.rangePicker) return;
            if (e.target.disabled) return;

            if (this.state.rangeActive) {
                var first = null;
                if (this.state.firstDate) {
                    first = (0, _core.getValueFromDate)(this.state.firstDate, this.props.lang);
                }
                var dir = this.state.hoverDate > first ? 'forward' : 'backward';
                this.setState({ hoverDate: e.target.dataset.value, direction: dir });
            } else {
                this.setState({ hoverDate: e.target.dataset.value });
            }
        }
    }, {
        key: 'dayCheck',
        value: function dayCheck(day) {

            var classname = '';

            var first = null;
            if (this.state.firstDate) {
                first = (0, _core.getValueFromDate)(this.state.firstDate, this.props.lang);
            }

            var seconed = null;
            if (this.state.seconedDate) {
                seconed = (0, _core.getValueFromDate)(this.state.seconedDate, this.props.lang);
            }

            if (this.props.rangePicker) {
                if (this.state.rangeActive) {
                    if (day.value === first) classname = 'startDate';
                    if (day.value === seconed) classname = 'endDate';
                    if (this.state.hoverDate > first) {
                        // forward
                        if (this.state.hoverDate > day.value && day.value > first) {
                            classname = 'rangeSelect';
                        }
                    } else {
                        // backward
                        if (this.state.hoverDate < day.value && day.value < first) {
                            classname = 'rangeSelect';
                        }
                    }
                } else {
                    if (day.value === first) classname = 'startDate';
                    if (day.value === seconed) classname = 'endDate';
                    if (first < day.value && day.value < seconed || first > day.value && day.value > seconed) {
                        classname = 'rangeSelect';
                    }
                }
            } else {
                if (day.value === first) classname = 'selected-date';
            }

            return classname;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var calendar = this.props.calendar;


            var disableBeforeDate = null;
            if (this.props.disableBeforeDate) {
                disableBeforeDate = (0, _core.getValueFromDate)(this.props.disableBeforeDate, this.props.lang);
            }

            var disableAfterDate = null;
            if (this.props.disableAfterDate) {
                disableAfterDate = (0, _core.getValueFromDate)(this.props.disableAfterDate, this.props.lang);
            }

            var disableAfterToday = null;
            if (this.props.disableAfterToday) {
                disableAfterToday = (0, _core.getValueFromDate)(calendar.today, this.props.lang);
            }

            var disableBeforeToday = null;
            if (this.props.disableBeforeToday) {
                disableBeforeToday = (0, _core.getValueFromDate)(calendar.today, this.props.lang);
            }

            return _react2.default.createElement(
                'div',
                { className: 'rn-main' },
                _react2.default.createElement(
                    'div',
                    { className: 'rn-week-names' },
                    calendar[this.props.weekNames ? this.props.weekNames : 'WEEK_DAYS_SHORT'].map(function (item, index) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'rn-cell rn-week-name', key: index },
                            item
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: "rn-days-wrapper " + this.state.direction + ' ' + this.props.lang },
                    calendar.info.map(function (item, index) {
                        var disablility = _this5.props.disabled;
                        if (disableBeforeDate !== null) {
                            if (item.value <= disableBeforeDate) disablility = true;
                        }

                        if (disableAfterDate !== null) {
                            if (item.value >= disableAfterDate) disablility = true;
                        }

                        if (disableBeforeToday !== null) {
                            if (item.value < disableBeforeToday) disablility = true;
                        }

                        if (disableAfterToday !== null) {
                            if (item.value > disableAfterToday) disablility = true;
                        }

                        return _react2.default.createElement(
                            'button',
                            {
                                key: index,
                                'data-type': item.type,
                                'data-date': item.date,
                                'data-value': item.value,
                                'data-today': item.isToday,
                                onMouseEnter: _this5.handleHover,
                                onClick: _this5.handleSelectDate,
                                disabled: disablility ? "disabled" : "",
                                className: _this5.dayCheck(item) + " rn-cell " + (_this5.props.daysExtraClass ? _this5.props.daysExtraClass : "") },
                            item.day
                        );
                    })
                )
            );
        }
    }]);

    return Body;
}(_react.Component);

exports.default = DateWrapper;

DateWrapper.propTypes = {
    name: _propTypes2.default.string,
    startDate: _propTypes2.default.string,
    endDate: _propTypes2.default.string,
    disableBeforeDate: _propTypes2.default.string,
    disableAfterDate: _propTypes2.default.string,
    inputClass: _propTypes2.default.string,
    weekNames: _propTypes2.default.string,
    monthNames: _propTypes2.default.string,
    rightBtnClass: _propTypes2.default.string,
    leftBtnClass: _propTypes2.default.string,
    rangePicker: _propTypes2.default.bool,
    type: _propTypes2.default.string,
    info: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    disableBeforeToday: _propTypes2.default.bool,
    disableAfterToday: _propTypes2.default.bool,
    daysExtraClass: _propTypes2.default.string,
    handleChange: _propTypes2.default.func,
    lang: _propTypes2.default.string
};
