import React, {Component} from 'react';
import './book.css';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

class Book extends Component {
    render(){
        return(
            <div className="book">
                <h3>{this.props.name}</h3>
                <div className="book-description">
                    <div className="book-image">
                        <img src={this.props.image} alt={this.props.name}></img>
                    </div>
                    <div className="book-details">
                        <p>Author: {this.props.author}</p>
                        <p>Price: {isNaN(this.props.price) ? this.props.price : formatter.format(this.props.price)}</p>
                        <p className="book-details-description">{this.props.description}</p>
                    </div>

                </div>
            </div>
        )
    }
}


export default Book;