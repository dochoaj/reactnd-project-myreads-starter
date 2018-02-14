# Daniel Ochoa's MyReads Project

This is my implementation of the MyReads React Fundamentals Nanodegree project. It has fully functional List and Search modules. 

## Installation

* Install all project dependencies with `yarn`.

## Usage

* Start the development server with `yarn start`, a browser window will be open pointing the correct localhost address.

## The React Component Hierarchy
```bash
└── BooksApp
    └── Router
        ├── Route
        │      └── List
        │            ├── Bookshelfs
        │            │        └── Bookshelf    
        │            │              └── Books
        │            │                    └── Book
        │            │                         └── BookshelfSelector
        │            └── Link
        └── Route
               └── Search
                     ├── Link
                     └── ol
                          └── li
                               └── Book
                                     └── BookshelfSelector
```

- The List component represents the project's main view. It's main objective is to render Bookshelfs, who are collections of books. A helper on the state has been designed following the guidelines of the update bookshelf API response. That's the main source of truth to know on which shelf is a book really is.

- The Search component represents the project's search view. It re-uses the Book component to render all the search results. When the user changes the shelf of a book, a callback is fired to interact with the backend. This updates the Bookshelf helper on the state and, when you route back to the List component, the books are in the correct shelf. As the search response does not contains the book current shelf is mandatory to primarly fetch the list data in order to correctly render the book shelf on the search result.
