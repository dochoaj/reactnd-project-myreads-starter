# Daniel Ochoa's MyReads Project

This is my implementation of the MyReads React Fundamentals Nanodegree project. It has fully functional List and Search modules. 

## Installation

* Install all project dependencies with `yarn`

## Usage

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
