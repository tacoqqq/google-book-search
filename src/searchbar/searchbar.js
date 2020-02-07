import React, {Component} from 'react';
import './searchbar.css'

const url = "https://www.googleapis.com/books/v1/volumes";


class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: "",
            printtype: "none",
            booktype: "none",
            error: ""
        }
    }

    queryChanged(value){
        this.setState({
            query: value
        })
    }

    printTypeChanged(value){
        this.setState({
            printtype: value
        })
    }

    bookTypeChanged(value){
        this.setState({
            booktype: value
        })
    }   

    formatQuery(paramObj){
        const queryStrings = Object.keys(paramObj).map(str => `${encodeURIComponent(str)}=${encodeURIComponent(paramObj[str])}`) // [key printtype booktype q]
        return queryStrings.join("&");
    }

    handleSubmit(e){

        e.preventDefault();

        const params = {
            key: "AIzaSyDvm_H1Snv3dZIIwLZKrMDzbHlShmBT0yg",
            q: this.state.query
        }

        if (this.state.printtype !== "none"){
            params.printType = this.state.printtype
        }

        if (this.state.booktype !== "none"){
            params.filter = this.state.booktype
        }

        const queryStrings = this.formatQuery(params);
        const finalUrl = `${url}?${queryStrings}`
        console.log(finalUrl)

        fetch(finalUrl)
            .then(response => {
                if (!response.ok){
                    throw new Error('Something went wrong. Please try again.')
                }
                return response.json();
            })
            .then(responseJson => {
                console.log(responseJson)
                this.setState({
                    error: ""
                })
                this.props.handleSearch(responseJson,this.state.error)
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
                this.props.handleError(this.state.error)
            })
    }

    render(){
        const error = this.state.error
                      ? <div>{this.state.error}</div>
                      : ""
        return (
            <section className="search-bar">
                <form className="search-bar-form" onSubmit={e => this.handleSubmit(e)}>
                    <div className="search-bar-first-row">
                        <div>
                            <label htmlFor="search-query">Search:</label>
                            <input 
                                required
                                type="text" 
                                id="search-query" 
                                name="search-query"
                                value={this.state.query}
                                onChange={e => this.queryChanged(e.target.value)}
                                placeholder="book name" />
                        </div>
                        <div>
                            <button type="submit">Search</button>
                        </div>
                    </div>
                    <div className="search-bar-second-row">
                        <div className="print-type-filter">
                            <label htmlFor="print-type">Print Type:</label>
                            <select 
                                name="print-type" 
                                id="print-type" 
                                value={this.state.printtype}
                                onChange={e => this.printTypeChanged(e.target.value)}>
                                <optgroup>
                                    <option value="none">all</option>
                                    <option value="partial">partial</option>
                                    <option value="full">full</option>
                                    <option value="free-ebooks">free-ebooks</option>
                                    <option value="paid-ebooks">paid-ebooks</option>
                                    <option value="ebooks">ebooks</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="book-type-filter">
                            <label htmlFor="book-type">Book Type:</label>
                            <select 
                                name="book-type" 
                                id="book-type"
                                value={this.state.booktype}
                                onChange={e => this.bookTypeChanged(e.target.value)}>
                                <optgroup>
                                    <option value="none">all</option>
                                    <option value="books">books</option>
                                    <option value="magazines">magazines</option>
                                </optgroup>
                            </select>                            
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}

export default SearchBar;