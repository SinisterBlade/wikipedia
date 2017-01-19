function getSearchData(query) {
    return new Promise(function (resolve, reject) {
        console.log('Searching');
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=Main+Page&srsearch=" + query,
            type: "GET",
            dataType: "jsonp",
            success: function (data) {
                console.log('Success');
                resolve(data.query.search);
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}

function LinkPanel(props) {
    return React.createElement(
        "a",
        { href: "https://en.wikipedia.org/wiki/" + props.title, target: "_blank" },
        React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement(
                    "h3",
                    { className: "panel-title" },
                    props.title
                )
            ),
            React.createElement("div", { className: "panel-body", dangerouslySetInnerHTML: { __html: props.body } })
        )
    );
}

function RandomWiki(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "label",
            null,
            "Otherwise..."
        ),
        React.createElement(
            "button",
            { className: "form-control btn", onClick: () => window.open('https://en.wikipedia.org/wiki/Special:Random') },
            props.text
        )
    );
}

class WikiForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    handleSubmit(event) {
        getSearchData(this.state.query).then(function (data) {
            console.log('Success 2');
            let linkPanels = data.map(function (element, index) {
                return React.createElement(LinkPanel, { key: index, title: element.title, body: element.snippet + "..." });
            });
            let element = React.createElement(
                "div",
                null,
                React.createElement(Header, { title: "Wikipedia Viewer" }),
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(WikiForm, null),
                    React.createElement("hr", null),
                    React.createElement(RandomWiki, { text: "Find me a random page" }),
                    React.createElement("hr", null),
                    React.createElement(
                        "div",
                        { className: "link-panels" },
                        linkPanels
                    )
                )
            );
            ReactDOM.render(element, document.getElementById('root'));
        }).catch(function (error) {
            console.log(error);
        });
        //window.open('http://www.google.com/search?q=' + this.state.query)
        event.preventDefault();
    }
    handleInput(event) {
        this.setState({ query: event.target.value });
    }
    render() {
        return React.createElement(
            "form",
            { onSubmit: this.handleSubmit, className: "form" },
            React.createElement(
                "div",
                { className: "input-group" },
                React.createElement("input", { className: "form-control", placeholder: "Search", type: "text", onChange: this.handleInput }),
                React.createElement(
                    "span",
                    { className: "input-group-btn" },
                    React.createElement(
                        "button",
                        { className: "btn", type: "submit", onClick: this.handleSubmit },
                        "Search"
                    )
                )
            )
        );
    }
}

function Header(props) {
    return React.createElement(
        "div",
        { className: "jumbotron text-center" },
        React.createElement(
            "h1",
            null,
            props.title
        )
    );
}

const element = React.createElement(
    "div",
    null,
    React.createElement(Header, { title: "Wikipedia Viewer" }),
    React.createElement(
        "div",
        { className: "container" },
        React.createElement(WikiForm, null),
        React.createElement("hr", null),
        React.createElement(RandomWiki, { text: "Find me a random page" })
    )
);

ReactDOM.render(element, document.getElementById('root'));
