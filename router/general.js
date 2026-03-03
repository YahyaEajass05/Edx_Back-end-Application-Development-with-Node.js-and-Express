const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

// Task 6: Register New user
public_users.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: 'Username already exists. Please choose a different username.' });
  }

  users.push({ username, password });

  return res.status(201).json({
    message: `User ${username} successfully registered. You can now login.`
  });
});

// Task 1: Get the book list available in the shop
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

// Task 2: Get the books based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }

  return res.status(200).json(books[isbn]);
});

// Task 3: Get all books by Author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;

  const booksByAuthor = Object.entries(books)
    .filter(([isbn, book]) => book.author.toLowerCase() === author.toLowerCase())
    .map(([isbn, book]) => ({ isbn, ...book }));

  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: `No books found for author: ${author}` });
  }

  return res.status(200).json(booksByAuthor);
});

// Task 4: Get all books based on Title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;

  const booksByTitle = Object.entries(books)
    .filter(([isbn, book]) => book.title.toLowerCase().includes(title.toLowerCase()))
    .map(([isbn, book]) => ({ isbn, ...book }));

  if (booksByTitle.length === 0) {
    return res.status(404).json({ message: `No books found with title: ${title}` });
  }

  return res.status(200).json(booksByTitle);
});

// Task 5: Get book Review
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }

  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
