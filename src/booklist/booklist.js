import React,{Component} from 'react';
import Book from '../book/book';
import './booklist.css';

class BookList extends Component {
    render(){
        const books = this.props.booklist.map((book,id) =>
            <Book 
                name={book.volumeInfo.title} 
                author={book.volumeInfo.hasOwnProperty("authors")? book.volumeInfo.authors.join(", "): "No Author Specified"}
                description={book.hasOwnProperty("searchInfo")? book.searchInfo.textSnippet : "No description available"}
                link={book.selfLink}
                price={book.saleInfo.hasOwnProperty("retailPrice")? book.saleInfo.retailPrice.amount : book.saleInfo.saleability} 
                image={book.volumeInfo.hasOwnProperty("imageLinks")? book.volumeInfo.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"}
                key={id}/>
        )

        return(
            <section>
                {books}
            </section>
        )
    }

}

BookList.defaultProps = {
    booklist: []
  };
  

export default BookList;