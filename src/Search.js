import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Book from './Book'

class Search extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  
  componentWillUnmount() {
    this.props.cleanSearch();
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput minLength={1}
                           placeholder="Search by title or author"
                           debounceTimeout={300}
                           onChange={this.onSearchTermChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.loading ? <Loading /> : this.renderResult()}
          </ol>
        </div>
      </div>
    );
  }

  onSearchTermChange = (event) => {
    const query = event.target.value.toLowerCase().trim();
    this.props.search(query);
  }

  renderResult() {
    if (this.props.books.length === 0) {
      return <h3>There are no books that matches your search term</h3>;
    }

    return this.renderBooks();
  }

  renderBooks() {
    return this.props.books.map(book => {
      const shelf = this.findShelf(book.id);
      const authors = book.authors || ['Unknown']
      const image = (book.imageLinks && book.imageLinks.thumbnail) || ''

      return <Book key={book.id}
                   id={book.id}
                   bookshelf={shelf}
                   title={book.title}
                   authors={authors.join(' ')}
                   image={image}
                   changeBookshelf={this.props.changeBookshelf} />
    }, this);
  }

  findShelf(id) {
    let shelf = 'none';

    this.props.bookshelfDetails.forEach(shelfDetail => {
      if (shelfDetail.ids.includes(id)) {
        shelf = shelfDetail.shelf;
        return false;
      }
    });

    return shelf;
  }
}

Search.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  cleanSearch: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
};

export default Search;
