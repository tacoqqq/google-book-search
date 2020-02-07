import React,{Component} from 'react';
import './App.css';
import BookList from './booklist/booklist';
import SearchBar from './searchbar/searchbar';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      booklist: [],
      error: "",
    }
  }

  handleSearch(results,err){
    const newBooklist = results.items;
    const errorMessage = err;
    this.setState({
      booklist: newBooklist,
      error: errorMessage
    })
  }

  handleError(err){
    const errorMessage = err;
    this.setState({
      error: errorMessage
    })
  }

  render(){
    const pageDisplay = this.state.error.length
                  ? <div className="error-message">Oh oh! Sorry... no result is found! Try again maybe?</div>
                  : <BookList booklist={this.state.booklist}/>

    return(
      <div className="App">
        <header className="App-header">
          <h1>Google Book Search</h1>
        </header>
        <SearchBar handleSearch={(results,err) => this.handleSearch(results,err)} handleError={err => this.handleError(err)}/>
        {pageDisplay}
      </div>
    );
  } 
}

export default App;
