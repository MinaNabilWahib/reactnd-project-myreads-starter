import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  state = {
    selectedOption: '',
    shelfs: [],
    book: {}
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((booksInShelfs) => {
        // console.log(booksInShelfs)
        this.setState(() => ({
          shelfs: booksInShelfs
        }))
      })
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.state.selectedOption !== prevState.selectedOption) {
      //console.log(this.state.selectedOption)
      //console.log(this.state.book)
      BooksAPI.update(this.state.book, this.state.selectedOption)
        .then(() => {
          //console.log(shel)
          console.log('updated')
          BooksAPI.getAll()
            .then((booksInShelfs) => {
              console.log(booksInShelfs)
              this.setState(() => ({
                shelfs: booksInShelfs
              }))
            })
        })
    }
  }


  updateshelf = (selectedOption, book) => {
    //console.log(selectedOption)
    this.setState(() => ({
      selectedOption: selectedOption,
      book: book
    }))
  }

  render() {
    const { shelfs } = this.state
    //  console.log(shelfs)
    // console.log(this.state.currentlyReading)

    const currentlyReading = shelfs.filter((book) => {
      return book.shelf === "currentlyReading"
    })
    const wantToRead = shelfs.filter((book) => {
      return book.shelf === "wantToRead"
    })
    const read = shelfs.filter((book) => {
      return book.shelf === "read"
    })
    //console.log(currentlyReading,wantToRead,read)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map((book) => (
                    <li key={book.id} className='book-list-item'>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                          <div className="book-shelf-changer">
                            <select
                              onChange={(event) => this.updateshelf(event.target.value, book)} value={'currentlyReading'}>
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

                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map((book) => (
                    <li key={book.id} className='book-list-item'>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                          <div className="book-shelf-changer">
                            <select
                              onChange={(event) => this.updateshelf(event.target.value, book)} value={'wantToRead'}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead" >Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map((book) => (
                    <li key={book.id} className='book-list-item'>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                          <div className="book-shelf-changer">
                            <select
                              onChange={(event) => this.updateshelf(event.target.value, book)} value={'read'}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
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
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            className='search-book'>
            Add
                    </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks