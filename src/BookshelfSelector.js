import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookshelfSelector extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.current} onChange={this.onChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }

  onChange = (event) => {
    this.props.changeBookshelf(event.target.value);
  }
}

BookshelfSelector.propTypes = {
  current: PropTypes.oneOf(['none', 'currentlyReading', 'wantToRead', 'read']).isRequired,
  changeBookshelf: PropTypes.func.isRequired
};

export default BookshelfSelector;
