'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getSearchData(query) {
    return new Promise(function (resolve, reject) {
        console.log('Searching');
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=Main+Page&srsearch=" + query,
            type: "GET",
            dataType: "jsonp",
            success: function success(data) {
                console.log('Success');
                resolve(data.query.search);
            },
            error: function error(err) {
                reject(err);
            }
        });
    });
}

function LinkPanel(props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'a',
            { href: "https://en.wikipedia.org/wiki/" + props.title, target: '_blank' },
            _react2.default.createElement(
                'div',
                { className: 'panel panel-default' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel-heading' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'panel-title' },
                        props.title
                    )
                ),
                _react2.default.createElement('div', { className: 'panel-body', dangerouslySetInnerHTML: { __html: props.body } })
            )
        )
    );
}

function RandomWiki(props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'label',
            null,
            'Otherwise...'
        ),
        _react2.default.createElement(
            'button',
            { className: 'form-control btn', onClick: function onClick() {
                    return window.open('https://en.wikipedia.org/wiki/Special:Random');
                } },
            props.text
        )
    );
}

var WikiForm = function (_React$Component) {
    _inherits(WikiForm, _React$Component);

    function WikiForm(props) {
        _classCallCheck(this, WikiForm);

        var _this = _possibleConstructorReturn(this, (WikiForm.__proto__ || Object.getPrototypeOf(WikiForm)).call(this, props));

        _this.state = { query: '' };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleInput = _this.handleInput.bind(_this);
        return _this;
    }

    _createClass(WikiForm, [{
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            var currentObject = this;
            getSearchData(this.state.query).then(function (data) {
                console.log('Success 2');
                currentObject.props.onClear();
                data.forEach(function (element) {
                    currentObject.props.onNewData(element);
                });
            }).catch(function (error) {
                console.log(error);
            });
            event.preventDefault();
        }
    }, {
        key: 'handleInput',
        value: function handleInput(event) {
            this.setState({ query: event.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { onSubmit: this.handleSubmit, className: 'form' },
                _react2.default.createElement(
                    'div',
                    { className: 'input-group' },
                    _react2.default.createElement('input', { className: 'form-control', placeholder: 'Search for a page on Wikipedia', type: 'text', onChange: this.handleInput }),
                    _react2.default.createElement(
                        'span',
                        { className: 'input-group-btn' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn', type: 'submit', onClick: this.handleSubmit },
                            'Search'
                        )
                    )
                )
            );
        }
    }]);

    return WikiForm;
}(_react2.default.Component);

function Header(props) {
    return _react2.default.createElement(
        'div',
        { className: 'jumbotron text-center' },
        _react2.default.createElement(
            'h1',
            null,
            props.title
        )
    );
}

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App(props) {
        _classCallCheck(this, App);

        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this2.state = { links: [] };
        _this2.addLinks = _this2.addLinks.bind(_this2);
        _this2.clearLinks = _this2.clearLinks.bind(_this2);
        return _this2;
    }

    _createClass(App, [{
        key: 'addLinks',
        value: function addLinks(linkdata) {
            var newLinks = this.state.links.concat(linkdata);
            this.setState({ links: newLinks });
        }
    }, {
        key: 'clearLinks',
        value: function clearLinks() {
            this.setState({ links: [] });
        }
    }, {
        key: 'render',
        value: function render() {
            var linkPanels = this.state.links.map(function (element) {
                return _react2.default.createElement(LinkPanel, { key: element.title, title: element.title, body: element.snippet + "..." });
            });
            var element = _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(WikiForm, { onNewData: this.addLinks, onClear: this.clearLinks }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(RandomWiki, { text: 'Find me a random page' }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(
                    'div',
                    { className: 'link-panels' },
                    _react2.default.createElement(
                        _reactAddonsCssTransitionGroup2.default,
                        {
                            transitionName: 'example',
                            transitionEnterTimeout: 500,
                            transitionLeaveTimeout: 300 },
                        linkPanels
                    )
                )
            );
            return element;
        }
    }]);

    return App;
}(_react2.default.Component);

var element = _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(Header, { title: 'Wikipedia Viewer' }),
    _react2.default.createElement(App, null)
);

_reactDom2.default.render(element, document.getElementById('root'));
