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
        <a href={"https://en.wikipedia.org/wiki/" + props.title} target="_blank">
            <div className="panel panel-default">
                <div className="panel-heading"><h3 className="panel-title">{props.title}</h3></div>
                <div className="panel-body" dangerouslySetInnerHTML={{__html:props.body}}></div>
            </div>
        </a>
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
        getSearchData(this.state.query)
        .then(function(data) {
            console.log('Success 2')
            let linkPanels = data.map(function(element, index) {
                return (
                    <LinkPanel key={index} title={element.title} body={element.snippet + "..."} />
                )
            })
            let element = (
                <div>
                    <Header title="Wikipedia Viewer" />
                    <div className="container"> 
                        <WikiForm />
                        <hr />
                        <RandomWiki text="Find me a random page" />
                        <hr />
                        <div className="link-panels">
                            {linkPanels}
                        </div>
                    </div>
                </div>
            )
            ReactDOM.render(element, document.getElementById('root'))
        }).catch(function(error) {
            console.log(error)
        }) 
        //window.open('http://www.google.com/search?q=' + this.state.query)
        event.preventDefault()
    }
    handleInput(event) {
        this.setState({ query: event.target.value })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <div className="input-group">
                    <input className="form-control" placeholder="Search" type="text" onChange={this.handleInput}></input>
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

const element = (
    <div>
        <Header title="Wikipedia Viewer" />
        <div className="container"> 
            <WikiForm />
            <hr />
            <RandomWiki text="Find me a random page" />
        </div>
    </div>
)

ReactDOM.render(
    element,
    document.getElementById('root')
)