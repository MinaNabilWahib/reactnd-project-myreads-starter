import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'


class SearchBook extends Component {

    state = {
        query: '',
        results: []

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.query === '') {
            console.log('empty input')

        } else if (this.state.query !== prevState.query) {
            console.log(prevState.query)
            console.log(this.state.query)
            try {
                BooksAPI.search(this.state.query)
                    .then((results) => {
                        //  console.log(result)
                        this.setState(() => ({
                            results
                        }))
                    })
                console.log(this.state.results)
            } catch (error) {
                console.log(error);
            }


        }
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }
    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query } = this.state.query

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                    >
                        close
                    </Link>

                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            className='search-books'
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    { this.state.results.length === 0 ?
                    (
                        <ol className="books-grid"></ol>
                    ):
                    (
                        <ol className="books-grid">
                        {this.state.results.map((result) => (
                                <li key={result.id} className='result-list-item'>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url(' + result.imageLinks.smallThumbnail + ')' }}></div>
                                            <div className="book-shelf-changer">
                                                <select>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{result.title}</div>
                                        <div className="book-authors">{result.authors}</div>
                                    </div>
                                </li>

                            ))}
                    </ol>
                    )}
                   {/* <ol className="books-grid">
                        {this.state.results.map((result) => (
                                <li key={result.id} className='result-list-item'>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url(' + result.imageLinks.smallThumbnail + ')' }}></div>
                                            <div className="book-shelf-changer">
                                                <select>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{result.title}</div>
                                        <div className="book-authors">{result.authors}</div>
                                    </div>
                                </li>

                            ))}
                        </ol> */}
                </div>
            </div>
        )
    }
}

export default SearchBook