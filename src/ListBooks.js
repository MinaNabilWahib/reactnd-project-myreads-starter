import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'
class ListBooks extends Component {
  state = {
    selectedOption: '',
    shelfs: [],
    book: {},
    currentlyReading : [],
    wantToRead : [],
    read : []
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

  updateShelfData = (currentlyReading , wantToRead , read) => {
    this.setState(() => ({
      currentlyReading : currentlyReading , 
      wantToRead : wantToRead , 
      read : read
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
    console.log(currentlyReading,wantToRead,read)

  //  this.updateShelfData(currentlyReading , wantToRead , read )

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
                      <Book key = {book.id}
                        book = {book}
                        updateShelf = {this.updateshelf}
                        currentShelf = {'currentlyReading'}
                      />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {wantToRead.map((book) => (
                      <Book key = {book.id}
                        book = {book}
                        updateShelf = {this.updateshelf}
                        currentShelf = {'wantToRead'}
                      />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {read.map((book) => (
                      <Book key = {book.id}
                        book = {book}
                        updateShelf = {this.updateshelf}
                        currentShelf = {'read'}
                      />
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