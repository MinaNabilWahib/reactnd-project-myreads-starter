import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
//import serializeForm from 'form-serialize'


class SearchBook extends Component {

    state = {
        query: '',
        results: [],
        infotobeloaded: '',
        selectedOption:'',
        book:{}
    }
    // function for updating 
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.query !== prevState.query) {
            //console.log(prevState.query)
            //console.log(this.state.query)
            if (this.state.query === '') {
                //  console.log('empty input')
                //this.setState({results:[ ],infotobeloaded:'    '})
                // console.log(this.state.results)
                this.setState(() => ({
                    results: [],
                    infotobeloaded: '  '
                }))
            } else {
                try {
                    BooksAPI.search(this.state.query)
                        .then((results) => {
                            // console.log(results)
                            if (!(results.error === "empty query")) {
                                console.log("hola")
                                this.setState(() => ({
                                    results
                                }))
                            } else {
                                this.setState(() => ({
                                    results: [],
                                    infotobeloaded: 'no book matchs your search'
                                }))
                            }


                        })
                } catch (error) {
                    console.log(error);
                }
            }
        }
        if (this.state.selectedOption !== prevState.selectedOption) {
            console.log(this.state.selectedOption)
            console.log(this.state.book)
            BooksAPI.update(this.state.book, this.state.selectedOption)
              .then(() => {
                //console.log(shel)
                console.log('updated')
              })
          }
    }
    updateshelf = (selectedOption, book) => {
        console.log(selectedOption)
        this.setState(() => ({
            selectedOption: selectedOption,
            book: book
        }))
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
    }
    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query, results, infotobeloaded } = this.state
        console.log(results)
        // console.log(query)
        //  console.log(infotobeloaded)

        const filteredResults = results.filter((book) => {
            return book.imageLinks != null && book.authors != null;
        })
        // console.log(filteredResults)

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
                    {filteredResults.length === 0 ?
                        (
                            <ol className="books-grid">
                                {infotobeloaded}
                            </ol>
                        ) :
                        (
                            <ol className="books-grid">
                                {filteredResults.map((result) => (
                                    <li key={result.id} className='result-list-item'>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url(' + result.imageLinks.smallThumbnail + ')' }}></div>
                                                <div className="book-shelf-changer">
                                                    <select
                                                        onChange={(event) => this.updateshelf(event.target.value, result)}>
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
                </div>
            </div>
        )
    }
}

export default SearchBook