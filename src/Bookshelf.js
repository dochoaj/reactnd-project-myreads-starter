import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListedBook from './ListedBook'

class Bookshelf extends Component {
  render() {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.books.length === 0 ? this.renderEmpty() : this.renderBooks()}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderBooks() {
    return this.props.books.map(book => {
      return <ListedBook key={book.id} 
                         book={book}
                         changeBookshelf={this.props.changeBookshelf} />;
    }, this);
  }

  renderEmpty() {
    return <h2>There is not any book on this shelf</h2>
  }
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      shelf: PropTypes.oneOf(['none', 'currentlyReading', 'wantToRead', 'read']).isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  changeBookshelf: PropTypes.func.isRequired,
};

export default Bookshelf;
