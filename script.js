function getSearchData(query) {
    console.log('Searching')
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=Main+Page&srsearch=" + query,
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log('success')
        },
        error: function (err) {
            console.log('Error')
        }
    })
}

function RandomWiki(props) {
    return (
        <button onClick={() => window.open('https://en.wikipedia.org/wiki/Special:Random')} className="btn">{props.text}</button>
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
        //window.open('http://www.google.com/search?q=' + this.state.query)
        event.preventDefault()
    }
    handleInput(event) {
        this.setState({ query: event.target.value })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-inline">
                <input className="form-control" type="text" onChange={this.handleInput}></input>
                <button className="btn" type="submit" onClick={this.handleSubmit}>Search</button>
            </form>
        )
    }
}

const element = (
    <div>
        <RandomWiki text="Click here for a random Wikipedia article" />
        <WikiForm />
    </div>
)

ReactDOM.render(
    element,
    document.getElementById('root')
)