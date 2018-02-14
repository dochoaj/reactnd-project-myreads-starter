import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class ListedBook extends Component {
  render() {
    return (
      <li>
        <Book id={this.props.book.id}
              bookshelf={this.props.book.shelf}
              title={this.props.book.title}
              authors={this.props.book.authors && this.props.book.authors.join(' ')}
              image={this.props.book.imageLinks.thumbnail}
              changeBookshelf={this.props.changeBookshelf} />
      </li>
    );
  }
}

ListedBook.propTypes = {
  book: PropTypes.object.isRequired
};

export default ListedBook;
