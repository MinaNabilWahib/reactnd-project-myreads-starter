import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'


class SearchBook extends Component {

    state = {
        query: '',
        results: [],
        infotobeloaded: '',
        selectedOption: '',
        book: {},
        shelfs: []
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
                try {
                    BooksAPI.getAll()
                        .then((booksInShelfs) => {
                            // console.log(booksInShelfs)
                            this.setState(() => ({
                                shelfs: booksInShelfs
                            }))
                            // console.log(this.state.shelfs)
                        })
                } catch (error) {
                    console.log(error)
                }
            }
        }
        if (this.state.selectedOption !== prevState.selectedOption) {
            console.log(this.state.selectedOption)
            console.log(this.state.book)
            BooksAPI.update(this.state.book, this.state.selectedOption)
                .then(() => {
                    //console.log(shel)
                    //console.log(this.state.book)
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

    compare(result) {
        this.state.shelfs.forEach(element => {
            if (result.id === element.id) {
                result.shelf = element.shelf
            } else {
                result.shelf = 'none'
            }

        });
        return result
    }

    render() {
        const { query, results, infotobeloaded, shelfs } = this.state
       // console.log(results)
        //console.log(shelfs)
        // console.log(query)
        //  console.log(infotobeloaded)
        // filtering  book doesn't have thumbnail
        const filteredResults = results.filter((book) => {
            return book.imageLinks != null && book.authors != null;
        })
        // comparing shelfs to know the current shelf for ever book 
        const filteredResults2 = filteredResults.map((result) => {
            for (let index = 0; index < shelfs.length; index++) {
                if (result.id === shelfs[index].id) {
                    result.shelf = shelfs[index].shelf
                    break;
                } else {
                    result.shelf = 'none'
                }
            }
            return result
        }
        )

        //console.log(filteredResults)
        //console.log(filteredResults2)

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
                    {filteredResults2.length === 0 ?
                        (
                            <ol className="books-grid">
                                {infotobeloaded}
                            </ol>
                        ) :
                        (
                            <ol className="books-grid">
                                {filteredResults2.map((result) => (
                                    <Book key={result.id}
                                        book={result}
                                        updateShelf={this.updateshelf}
                                        currentShelf={result.shelf}
                                    />
                                ))}
                            </ol>
                        )}
                </div>
            </div>
        )
    }
}

export default SearchBook