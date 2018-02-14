import React, { Component } from 'react'
import { DebounceInput } from 'react-debounce-input'
import PropTypes from 'prop-types'
import Loading from './Loading'
import ListedBook from './ListedBook'

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
          <a href="/" className="close-search">Close</a>
          <div className="search-books-input-wrapper">
            <DebounceInput minLength={2}
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
      book.shelf = this.findShelf(book.id);
      return <ListedBook key={book.id} 
                         book={book}
                         changeBookshelf={this.props.changeBookshelf} />;
    });
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
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  cleanSearch: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
};

export default Search;
