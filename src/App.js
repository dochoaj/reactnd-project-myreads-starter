import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import List from './List'
import Search from './Search'

class BooksApp extends Component {
  state = {
    loading: true,
    books: [],
    bookshelfs: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read'
    },
    bookshelfDetails: [],
    searchResults: [],
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={this.scopedList} />
          <Route exact path='/list' render={this.scopedList} />
          <Route exact path='/search' render={this.scopedSearch} />
        </div>
      </Router>
    )
  }

  scopedList = (props) => {
    return (
      <List loading={this.state.loading}
            books={this.state.books}
            bookshelfs={this.state.bookshelfs}
            bookshelfDetails={this.state.bookshelfDetails}
            fetch={this.fetchAll}
            changeBookshelf={this.changeBookshelf} />
    );
  }

  scopedSearch = (props) => {
    return (
      <Search loading={this.state.loading}
              fetch={this.fetchAll}
              search={this.search}
              cleanSearch={this.cleanSearch}
              books={this.state.searchResults}
              bookshelfDetails={this.state.bookshelfDetails}
              changeBookshelf={this.changeBookshelf} />
    );
  }

  fetchAll = () => {
    this.setState({ loading: true });

    BooksAPI.getAll().then(books => {
      this.setState({ 
        books, 
        loading: false,
        bookshelfDetails: Object.keys(this.state.bookshelfs).map(shelf => {
          return { 
            shelf: shelf, 
            ids: books.filter(x => { return x.shelf === shelf }).map(x => { return x.id })
          }
        }, this),
      });
    });
  }

  changeBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(shelfDetails => {
      this.setState({
        bookshelfDetails: Object.keys(this.state.bookshelfs).map(shelf => {
          return { 
            shelf: shelf, 
            ids: shelfDetails[shelf] || []
          }
        })
      });
    });
  }

  search = (query) => {
    if (!query) return;
    this.setState({ loading: true, searchResults: [] });
    BooksAPI.search(query).then(searchResults => {
      if (searchResults.error) {
        return this.setState({ loading: false, searchResults: [] });  
      }
      this.setState({ loading: false, searchResults });
    });
  }

  cleanSearch = () => {
    this.setState({ searchResults: [] });
  }
}

export default BooksApp;
