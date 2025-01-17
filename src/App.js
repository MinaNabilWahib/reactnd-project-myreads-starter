import React from 'react'
//import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks/>
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBook
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
