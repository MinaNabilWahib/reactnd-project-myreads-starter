import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import * as BooksAPI from './BooksAPI'
//import { Link } from 'react-router-dom'
//import serializeForm from 'form-serialize'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        updateShelf: PropTypes.func.isRequired,
        currentShelf : PropTypes.string.isRequired,
    }

    render() {
        const {book , updateShelf , currentShelf} = this.props

        return (
            <li key={book.id} className='book-list-item'>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                <div className="book-shelf-changer">
                  <select
                    onChange={(event) => updateShelf(event.target.value, book)} value={currentShelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        )
    }
}
export default Book