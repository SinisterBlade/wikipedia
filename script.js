import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


function getSearchData(query) {
    return new Promise(function (resolve, reject) {
        console.log('Searching')
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=Main+Page&srsearch=" + query,
            type: "GET",
            dataType: "jsonp",
            success: function (data) {
                console.log('Success')
                resolve(data.query.search)
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

function LinkPanel(props) {
    return (
        <div>
            <a href={"https://en.wikipedia.org/wiki/" + props.title} target="_blank">
                <div className="panel panel-default">
                    <div className="panel-heading"><h3 className="panel-title">{props.title}</h3></div>
                    <div className="panel-body" dangerouslySetInnerHTML={{__html:props.body}}></div>
                </div>
            </a>
        </div>
    )
}

function RandomWiki(props) {
    return (
        <div>
            <label>Otherwise...</label>
            <button className="form-control btn" onClick={() => window.open('https://en.wikipedia.org/wiki/Special:Random')} >{props.text}</button>
        </div>
    )
}

class WikiForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { query: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }
    handleSubmit(event) {
        var currentObject = this
        getSearchData(this.state.query)
        .then(function(data) {
            console.log('Success 2')
            currentObject.props.onClear()
            data.forEach(function(element) {
                currentObject.props.onNewData(element)
            })
        }).catch(function(error) {
            console.log(error)
        }) 
        event.preventDefault()
    }
    handleInput(event) {
        this.setState({ query: event.target.value })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <div className="input-group">
                    <input className="form-control" placeholder="Search for a page on Wikipedia" type="text" onChange={this.handleInput}></input>
                    <span className="input-group-btn">
                        <button className="btn" type="submit" onClick={this.handleSubmit}>Search</button>
                    </span>
                </div>
            </form>
        )
    }
}

function Header(props) {
    return (
        <div className="jumbotron text-center">
            <h1>{props.title}</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {links: []}
        this.addLinks = this.addLinks.bind(this)
        this.clearLinks = this.clearLinks.bind(this)
    }
    addLinks(linkdata) {
        let newLinks = this.state.links.concat(linkdata)
        this.setState({links: newLinks})
    }
    clearLinks() {
        this.setState({links: []})
    }
    render() {
        let linkPanels = this.state.links.map(function(element) {
            return (
                <LinkPanel key={element.title} title={element.title} body={element.snippet + "..."} />
            )
        })
        let element = (
            <div className="container">
                <WikiForm onNewData={this.addLinks} onClear={this.clearLinks}/>
                <hr />
                <RandomWiki text="Find me a random page" />
                <hr />
                <div className="link-panels">
                    <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                        {linkPanels}
                    </ ReactCSSTransitionGroup>
                </div>
            </div>
        )
        return element;
    }
}

const element = (
    <div>
        <Header title="Wikipedia Viewer" />
        <App />
    </div>
)

ReactDOM.render(
    element,
    document.getElementById('root')
)