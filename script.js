const buttonStyle = {
    border: "1px solid black"
}

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
        <div className="panel panel-info" style={{cursor:"pointer"}} onClick={() => window.open('https://en.wikipedia.org/wiki/' + props.title)}>
            <div className="panel-heading">{props.title}</div>
            <div className="panel-body" dangerouslySetInnerHTML={{__html:props.body}}></div>
        </div>
    )
}

function RandomWiki(props) {
    return (
        <button style={buttonStyle} onClick={() => window.open('https://en.wikipedia.org/wiki/Special:Random')} >{props.text}</button>
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
                    <LinkPanel key={index} title={element.title} body={element.snippet} />
                )
            })
            ReactDOM.render(<div>{linkPanels}</div>, document.getElementById('root'))
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
                <input className="form-control" type="text" onChange={this.handleInput}></input>
                <button style={buttonStyle} type="submit" onClick={this.handleSubmit}>Search</button>
            </form>
        )
    }
}

const element = (
    <div className="container">
        <WikiForm />
        <RandomWiki text="Click here for a random Wikipedia article" />
    </div>
)

ReactDOM.render(
    element,
    document.getElementById('root')
)