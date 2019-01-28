"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Datepicker = exports.Calendar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _helper = require("./helper.js");

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Datepicker
var Calendar = function (_Component) {
    _inherits(Calendar, _Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.handleNextMonth = _this.handleNextMonth.bind(_this);
        _this.handlePrevMonth = _this.handlePrevMonth.bind(_this);
        _this.handleSelectedDay = _this.handleSelectedDay.bind(_this);

        _this.state = {
            lang: _this.props.lang,
            startDate: "",
            endDate: "",
            inputValue: "",
            currentDate: (0, _helper.CURRENT_DATE)(_this.props.lang)

            // set values for START date
        };if (!(0, _helper.isEmptyObj)(_this.props.startDate)) {
            _this.state.startDate = (0, _helper.convertObjectDateToString)(_this.props.startDate);
        }

        // set values for END date
        if (!(0, _helper.isEmptyObj)(_this.props.endDate)) {
            _this.state.endDate = (0, _helper.convertObjectDateToString)(_this.props.endDate);
        }

        return _this;
    }

    _createClass(Calendar, [{
        key: "handleNextMonth",
        value: function handleNextMonth() {
            if (this.props.disable) return;
            var date = Object.assign({}, this.state.currentDate);
            var mons = date.month;
            var yer = date.year;
            mons++;
            if (mons > 12) {
                mons = 1;
                yer++;
            }
            date.month = mons;
            date.year = yer;
            this.setState({ currentDate: date });
        }
    }, {
        key: "handlePrevMonth",
        value: function handlePrevMonth() {
            if (this.props.disable) return;
            var date = Object.assign({}, this.state.currentDate);
            var mons = date.month;
            var yer = date.year;
            mons--;
            if (mons < 1) {
                mons = 12;
                yer--;
            }
            date.month = mons;
            date.year = yer;
            this.setState({ currentDate: date });
        }
    }, {
        key: "handleSelectedDay",
        value: function handleSelectedDay(dayItem) {
            var _this2 = this;

            if (this.props.disable) return;

            // if rangePicker Enabled
            if (this.props.rangePicker) {
                // range picker heres
                var date = dayItem.split(',');
                var start = date[0];
                var end = date[1];
                this.setState({ startDate: start, endDate: end, inputValue: start + " " + end }, function () {
                    var val = _this2.state.startDate + " " + _this2.state.endDate;
                    if (_this2.props.handleChange) {
                        _this2.props.handleChange(val);
                    }
                });
            } else {

                if (dayItem.isDisable) return;
                this.setState({ startDate: dayItem.date, inputValue: dayItem.date }, function () {
                    if (_this2.props.handleChange) {
                        _this2.props.handleChange(_this2.state.startDate);
                    }
                });
            }
        }
    }, {
        key: "render",
        value: function render() {

            var calander_days = (0, _helper2.default)(this.state.currentDate.year, this.state.currentDate.month, this.props);
            // let value = "";
            var BODY_TYPE = null;

            // is not ragePicker
            if (!this.props.rangePicker) {
                // value = this.state.startDate;
                BODY_TYPE = _react2.default.createElement(Body, _extends({}, this.props, { parentState: this.state,
                    calender: calander_days, onSelect: this.handleSelectedDay }));
            } else {
                // rage picker here
                // value = this.state.startDate + " " + this.state.endDate;
                BODY_TYPE = _react2.default.createElement(RangeBody, _extends({}, this.props, { parentState: this.state,
                    calender: calander_days, updateRange: this.handleSelectedDay }));
            }

            return _react2.default.createElement(
                "div",
                { className: "rn-calendar-wrapper" },
                _react2.default.createElement(
                    "div",
                    { className: "rn-calendar" },
                    _react2.default.createElement(Header, _extends({}, this.props, { parentState: this.state, lang: this.state.lang, nextMonth: this.handleNextMonth, prevMonth: this.handlePrevMonth })),
                    BODY_TYPE,
                    _react2.default.createElement(
                        "div",
                        { className: "rn-datepicker-footer" },
                        _react2.default.createElement("input", { className: (this.props.inputVisible ? ' show ' : ' hide ') + " rn-datepicker-input", defaultValue: this.state.inputValue })
                    )
                )
            );
        }
    }]);

    return Calendar;
}(_react.Component);

var Datepicker = function (_Component2) {
    _inherits(Datepicker, _Component2);

    function Datepicker(props) {
        _classCallCheck(this, Datepicker);

        var _this3 = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, props));

        _this3.handleNextMonth = _this3.handleNextMonth.bind(_this3);
        _this3.handlePrevMonth = _this3.handlePrevMonth.bind(_this3);
        _this3.handleSelectedDay = _this3.handleSelectedDay.bind(_this3);
        _this3.timeForDatepicker = _this3.timeForDatepicker.bind(_this3);
        _this3.handleClickOutside = _this3.handleClickOutside.bind(_this3);

        _this3.refrence = _react2.default.createRef();

        _this3.state = {
            visibility: false,
            lang: _this3.props.lang,
            startDate: "",
            endDate: "",
            inputValue: "",
            currentDate: (0, _helper.CURRENT_DATE)(_this3.props.lang)

            // set values for START date
        };if (!(0, _helper.isEmptyObj)(_this3.props.startDate)) {
            _this3.state.startDate = (0, _helper.convertObjectDateToString)(_this3.props.startDate);
        }

        // set values for END date
        if (!(0, _helper.isEmptyObj)(_this3.props.endDate)) {
            _this3.state.endDate = (0, _helper.convertObjectDateToString)(_this3.props.endDate);
        }
        return _this3;
    }

    _createClass(Datepicker, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside, false);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside, false);
        }
    }, {
        key: "handleClickOutside",
        value: function handleClickOutside(e) {
            if (this.refrence && !this.refrence.current.contains(e.target)) this.setState({ visibility: false });
        }
    }, {
        key: "handleNextMonth",
        value: function handleNextMonth() {
            if (this.props.disable) return;
            var date = Object.assign({}, this.state.currentDate);
            var mons = date.month;
            var yer = date.year;
            mons++;
            if (mons > 12) {
                mons = 1;
                yer++;
            }
            date.month = mons;
            date.year = yer;
            this.setState({ currentDate: date });
        }
    }, {
        key: "handlePrevMonth",
        value: function handlePrevMonth() {
            if (this.props.disable) return;
            var date = Object.assign({}, this.state.currentDate);
            var mons = date.month;
            var yer = date.year;
            mons--;
            if (mons < 1) {
                mons = 12;
                yer--;
            }
            date.month = mons;
            date.year = yer;
            this.setState({ currentDate: date });
        }
    }, {
        key: "handleSelectedDay",
        value: function handleSelectedDay(dayItem) {
            var _this4 = this;

            if (this.props.disable) return;

            // if rangePicker Enabled
            if (this.props.rangePicker) {
                // range picker heres
                var date = dayItem.split(',');
                var start = date[0];
                var end = date[1];
                this.setState({ startDate: start, endDate: end, inputValue: start + " " + end }, function () {
                    var val = _this4.state.startDate + " " + _this4.state.endDate;
                    if (_this4.props.handleChange) {
                        _this4.props.handleChange(val);
                    }
                });
            } else {

                if (dayItem.isDisable) return;
                this.setState({ startDate: dayItem.date, inputValue: dayItem.date }, function () {
                    if (_this4.props.handleChange) {
                        _this4.props.handleChange(_this4.state.startDate);
                    }
                });
            }
        }
    }, {
        key: "timeForDatepicker",
        value: function timeForDatepicker() {
            this.setState({ visibility: true });
        }
    }, {
        key: "render",
        value: function render() {
            var calander_days = this.state.visibility ? (0, _helper2.default)(this.state.currentDate.year, this.state.currentDate.month, this.props) : [];
            console.log(calander_days);
            // let value = "";
            var BODY_TYPE = null;

            if (this.state.visibility) {

                // is not ragePicker
                if (!this.props.rangePicker) {
                    // value = this.state.startDate;
                    BODY_TYPE = _react2.default.createElement(Body, _extends({}, this.props, { parentState: this.state,
                        calender: calander_days, onSelect: this.handleSelectedDay }));
                } else {
                    // rage picker here
                    // value = this.state.startDate + " " + this.state.endDate;
                    BODY_TYPE = _react2.default.createElement(RangeBody, _extends({}, this.props, { parentState: this.state,
                        calender: calander_days, updateRange: this.handleSelectedDay }));
                }
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    "div",
                    { className: "rn-datepicker-wrapper" },
                    _react2.default.createElement("input", { className: this.props.exteraClassForInput !== "" ? this.props.exteraClassForInput : "rn-datepicker-input", type: "text", onClick: this.timeForDatepicker, defaultValue: this.state.inputValue }),
                    _react2.default.createElement(
                        "div",
                        { className: (this.state.visibility ? ' show ' : ' hide ') + ' rn-datepicker-popover ', ref: this.refrence },
                        _react2.default.createElement(
                            "div",
                            { className: "rn-datepicker" },
                            _react2.default.createElement(Header, _extends({}, this.props, { parentState: this.state, lang: this.state.lang, nextMonth: this.handleNextMonth, prevMonth: this.handlePrevMonth })),
                            BODY_TYPE
                        )
                    )
                )
            );
        }
    }]);

    return Datepicker;
}(_react.Component);

// Header


var Header = function (_Component3) {
    _inherits(Header, _Component3);

    function Header(props) {
        _classCallCheck(this, Header);

        // check names and shortcuts of the names
        var _this5 = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        if (_this5.props.shortNameOfTheWeek) {
            _this5.week_days = _this5.props.lang === 'en' ? _helper.EN_WEEK_DAYS_SHORT : _helper.FA_WEEK_DAYS_SHORT;
        } else {
            _this5.week_days = _this5.props.lang === 'en' ? _helper.EN_WEEK_DAYS : _helper.FA_WEEK_DAYS;
        }

        if (_this5.props.shortNameOfTheMonth) {
            _this5.month_name = _this5.props.lang === 'en' ? _helper.EN_MONTHS_SHORT : _helper.FA_MONTHS_SHORT;
        } else {
            _this5.month_name = _this5.props.lang === 'en' ? _helper.EN_MONTHS : _helper.FA_MONTHS;
        }

        return _this5;
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {
            var this_month = this.props.parentState.currentDate.month;
            return _react2.default.createElement(
                "div",
                { className: "rn-datepicker-header" },
                _react2.default.createElement(
                    "div",
                    { className: "actions" },
                    _react2.default.createElement(
                        "button",
                        { className: (this.props.customClassIconRightBtn ? this.props.customClassIconRightBtn : "") + " next-month rn-btn ", onClick: this.props.nextMonth },
                        this.props.customClassIconRightBtn ? '' : '>'
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "month-name" },
                        this.month_name[this_month]
                    ),
                    _react2.default.createElement(
                        "button",
                        { className: (this.props.customClassIconLeftBtn ? this.props.customClassIconLeftBtn : "") + " prev-month rn-btn ", onClick: this.props.prevMonth },
                        this.props.customClassIconLeftBtn ? '' : '<'
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "year-name" },
                        this.props.parentState.currentDate.year
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "day-names" },
                    this.week_days.map(function (item, index) {
                        return _react2.default.createElement(
                            "div",
                            { key: index + 'week', className: "week_cell" },
                            item
                        );
                    })
                )
            );
        }
    }]);

    return Header;
}(_react.Component);

// not range picker


var Body = function (_Component4) {
    _inherits(Body, _Component4);

    function Body(props) {
        _classCallCheck(this, Body);

        var _this6 = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

        _this6.onSelect = _this6.onSelect.bind(_this6);
        return _this6;
    }

    _createClass(Body, [{
        key: "onSelect",
        value: function onSelect(item, disableProps) {
            if (disableProps) return;
            this.props.onSelect(item);
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            var i = 1;
            var weekend = false;
            var selected = false;
            var disableProps = false;

            return _react2.default.createElement(
                "div",
                { className: "rn-datepicker-body" },
                this.props.calender.all_days.map(function (item, index) {
                    if (i === 7) {
                        weekend = true;
                        i = 0;
                    } else {
                        weekend = false;
                    }
                    i++;
                    selected = item.date === _this7.props.parentState.startDate;

                    return _react2.default.createElement(
                        "div",
                        { key: index + 'days',
                            onClick: function onClick() {
                                return _this7.onSelect(item, disableProps);
                            },
                            className: (selected ? ' selectedDay ' : '') + (item.isToday ? ' today ' : '') + (weekend ? ' weekend ' : '') + item.info + " rn-days ",
                            "data-date": item.date },
                        item.day
                    );
                })
            );
        }
    }]);

    return Body;
}(_react.Component);

// this component executed when range picker is available


var RangeBody = function (_Component5) {
    _inherits(RangeBody, _Component5);

    function RangeBody(props) {
        _classCallCheck(this, RangeBody);

        var _this8 = _possibleConstructorReturn(this, (RangeBody.__proto__ || Object.getPrototypeOf(RangeBody)).call(this, props));

        _this8.hoverDays = _this8.hoverDays.bind(_this8);
        _this8.onSelect = _this8.onSelect.bind(_this8);
        _this8.handleRangehover = _this8.handleRangehover.bind(_this8);
        _this8.checkEndDate = _this8.checkEndDate.bind(_this8);
        _this8.checkStartDate = _this8.checkStartDate.bind(_this8);

        _this8.state = {
            firstclick: true,
            startDate: null,
            rangeActive: false,
            endDate: null,
            hoverDate: null,
            rangeDate: null
        };

        if (!(0, _helper.isEmptyObj)(_this8.props.startDate)) {
            _this8.state.startDate = _this8.props.startDate.year + '-' + (0, _helper.zeroPad)(_this8.props.startDate.month, 2) + '-' + (0, _helper.zeroPad)(_this8.props.startDate.day, 2);
        }

        if (!(0, _helper.isEmptyObj)(_this8.props.endDate)) {
            _this8.state.endDate = _this8.props.endDate.year + '-' + (0, _helper.zeroPad)(_this8.props.endDate.month, 2) + '-' + (0, _helper.zeroPad)(_this8.props.endDate.day, 2);
        }

        if (!(0, _helper.isEmptyObj)(_this8.props.endDate)) {
            _this8.state.hoverDate = _this8.props.endDate.year + '-' + (0, _helper.zeroPad)(_this8.props.endDate.month, 2) + '-' + (0, _helper.zeroPad)(_this8.props.endDate.day, 2);
        }
        return _this8;
    }

    _createClass(RangeBody, [{
        key: "onSelect",
        value: function onSelect(dayItem, disableProps) {
            var _this9 = this;

            if (dayItem.isDisable) return;
            if (disableProps) return;

            // first time click on date
            if (this.state.firstclick) {

                this.setState({
                    firstclick: false,
                    endDate: null,
                    hoverDate: null,
                    rangeActive: true,
                    startDate: dayItem.date
                });

                // seconed time click on date
            } else {

                if (this.state.hoverDate > this.state.startDate) {
                    // forward
                    this.setState({
                        firstclick: true,
                        rangeActive: false,
                        endDate: this.state.hoverDate
                    }, function () {
                        var range = null;
                        range = _this9.state.startDate + "," + _this9.state.endDate;
                        if (!_this9.state.rangeActive && _this9.state.endDate) {
                            _this9.props.updateRange(range);
                        }
                    });
                } else {
                    // backward
                    var endDate = this.state.startDate;
                    var hover = this.state.hoverDate;
                    this.setState({
                        firstclick: true,
                        rangeActive: false,
                        startDate: hover,
                        endDate: endDate
                    }, function () {
                        var range = null;
                        range = _this9.state.startDate + "," + _this9.state.endDate;
                        if (!_this9.state.rangeActive && _this9.state.endDate) {
                            _this9.props.updateRange(range);
                        }
                    });
                }
            }
        }
    }, {
        key: "hoverDays",
        value: function hoverDays(dayItem) {

            if (dayItem.isDisable && this.state.rangeActive) return;
            if (this.state.endDate === null) {
                this.setState({
                    hoverDate: dayItem.date
                });
            }
        }
    }, {
        key: "handleRangehover",
        value: function handleRangehover(item) {
            if (this.state.rangeActive) {
                if (this.state.startDate < item.date) {
                    // forward
                    return item.date < this.state.hoverDate;
                } else {
                    // backward
                    return item.date > this.state.hoverDate;
                }
            } else {
                return this.state.startDate < item.date && item.date < this.state.endDate;
            }
        }
    }, {
        key: "checkStartDate",
        value: function checkStartDate(item) {
            return item.date === this.state.startDate;
        }
    }, {
        key: "checkEndDate",
        value: function checkEndDate(item) {
            return item.date === this.state.endDate;
        }
    }, {
        key: "render",
        value: function render() {
            var _this10 = this;

            var i = 1;
            var weekend = null;
            var startDate = null;
            var endDate = null;
            var hover = null;
            var disableProps = false;

            return _react2.default.createElement(
                "div",
                { className: "rn-datepicker-body" },
                this.props.calender.all_days.map(function (item, index) {

                    if (i === 7) {
                        weekend = true;
                        i = 0;
                    } else {
                        weekend = false;
                    }
                    i++;
                    startDate = _this10.checkStartDate(item);
                    endDate = _this10.checkEndDate(item);
                    hover = _this10.handleRangehover(item);

                    return _react2.default.createElement(
                        "div",
                        { key: index + 'days',
                            onClick: function onClick() {
                                return _this10.onSelect(item, disableProps);
                            },
                            onMouseEnter: function onMouseEnter() {
                                return _this10.hoverDays(item);
                            },
                            className: _this10.props.exteraClassForDays + " " + (hover ? ' range-select ' : '') + (endDate ? ' endDate ' : '') + (startDate ? ' startDate ' : '') + (item.isToday ? ' today ' : '') + (weekend ? ' weekend ' : '') + item.info + " rn-days ",
                            "data-date": item.date },
                        item.day
                    );
                })
            );
        }
    }]);

    return RangeBody;
}(_react.Component);

exports.Calendar = Calendar;
exports.Datepicker = Datepicker;
