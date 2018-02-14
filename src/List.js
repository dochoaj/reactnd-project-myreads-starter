import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import Loading from './Loading'

class List extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <div className="listbooks">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        {this.props.loading ? <Loading /> : this.renderBookshelfs()}
        </div>
        <div className="open-search">
          <a href="search">Add a book</a>
        </div>
      </div>
    );
  }

  renderBookshelfs() {
    return this.props.bookshelfDetails.map(detail => {
      return (
        <Bookshelf key={detail.shelf}
                   books={this.props.books.filter(x => { return detail.ids.includes(x.id) })} 
                   title={this.props.bookshelfs[detail.shelf]}
                   changeBookshelf={this.props.changeBookshelf} />
      );
    }, this);
  }
}

List.propTypes = {
  loading: PropTypes.bool.isRequired,
  bookshelfs: PropTypes.object.isRequired,
  bookshelfDetails: PropTypes.arrayOf(
    PropTypes.shape({
      shelf: PropTypes.oneOf(['none', 'currentlyReading', 'wantToRead', 'read']).isRequired,
      ids: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
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
  fetch: PropTypes.func.isRequired,
};

export default List;
