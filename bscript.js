"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttonStyle = {
    border: "1px solid black",
    height: "35px"
};

var inputStyle = {
    height: "35px",
    fontSize: "20px",
};

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
    return React.createElement(
        "div",
        { className: "panel panel-info", style: { cursor: "pointer" }, onClick: function onClick() {
                return window.open('https://en.wikipedia.org/wiki/' + props.title);
            } },
        React.createElement(
            "div",
            { className: "panel-heading" },
            props.title
        ),
        React.createElement("div", { className: "panel-body", dangerouslySetInnerHTML: { __html: props.body } })
    );
}

function RandomWiki(props) {
    return React.createElement(
        "button",
        { style: buttonStyle, onClick: function onClick() {
                return window.open('https://en.wikipedia.org/wiki/Special:Random');
            } },
        props.text
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
        key: "handleSubmit",
        value: function handleSubmit(event) {
            getSearchData(this.state.query).then(function (data) {
                console.log('Success 2');
                var linkPanels = data.map(function (element, index) {
                    return React.createElement(LinkPanel, { key: index, title: element.title, body: element.snippet });
                });
                ReactDOM.render(React.createElement(
                    "div",
                    null,
                    linkPanels
                ), document.getElementById('root'));
            }).catch(function (error) {
                console.log(error);
            });
            //window.open('http://www.google.com/search?q=' + this.state.query)
            event.preventDefault();
        }
    }, {
        key: "handleInput",
        value: function handleInput(event) {
            this.setState({ query: event.target.value });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.handleSubmit},
                React.createElement("input", { style: inputStyle, type: "text", onChange: this.handleInput }),
                React.createElement(
                    "button",
                    { style: buttonStyle, type: "submit", onClick: this.handleSubmit },
                    "Search"
                )
            );
        }
    }]);

    return WikiForm;
}(React.Component);

var element = React.createElement(
    "div",
    { className: "container" },
    React.createElement(WikiForm, null),
    React.createElement(RandomWiki, { text: "Click here for a random Wikipedia article" })
);

ReactDOM.render(element, document.getElementById('root'));