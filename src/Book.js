import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookshelfSelector from './BookshelfSelector'

class Book extends Component {
	render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={this.coverStyles()}></div>
          <BookshelfSelector current={this.props.bookshelf} 
                             changeBookshelf={this.onChangeBookshelf} />
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    );
  }

  coverStyles() {
    return {
      width: 128,
      height: 193,
      backgroundImage: `url(${this.props.image})`
    };
  }

  onChangeBookshelf = (newBookshelf) => {
    this.props.changeBookshelf(this.props, newBookshelf);
  }
}

Book.propTypes = {
  bookshelf: PropTypes.oneOf(['none', 'currentlyReading', 'wantToRead', 'read']).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
};

export default Book;
