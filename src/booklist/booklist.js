import React,{Component} from 'react';
import Book from '../book/book';
import './booklist.css';

class BookList extends Component {
    render(){
        const books = this.props.booklist.map((book,id) => 
            <Book 
                name={book.volumeInfo.title} 
                author={book.volumeInfo.authors.join(", ")}
                description={book.searchInfo? book.searchInfo.textSnippet : "No description available"}
                link={book.selfLink}
                price={book.saleInfo.retailPrice? book.saleInfo.retailPrice.amount : book.saleInfo.saleability} 
                image={book.volumeInfo.imageLinks? book.volumeInfo.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"}
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