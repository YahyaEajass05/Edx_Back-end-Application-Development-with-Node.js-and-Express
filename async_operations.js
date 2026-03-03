/**
 * Tasks 10-13: Node.js program using Async/Await and Promises with Axios
 * Demonstrates four methods to interact with the Book Review API
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books – Using async callback function
const getAllBooks = async () => {
  console.log('\n--- Task 10: Get All Books (Async/Await) ---');
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log('All Books:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error fetching all books:', error.message);
    throw error;
  }
};

// Task 11: Search by ISBN – Using Promises
const getBookByISBN = (isbn) => {
  console.log(`\n--- Task 11: Search by ISBN (Promises) - ISBN: ${isbn} ---`);
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/isbn/${isbn}`)
      .then((response) => {
        console.log(`Book with ISBN ${isbn}:`);
        console.log(JSON.stringify(response.data, null, 2));
        resolve(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
        reject(error);
      });
  });
};

// Task 12: Search by Author – Using Async/Await
const getBooksByAuthor = async (author) => {
  console.log(`\n--- Task 12: Search by Author (Async/Await) - Author: ${author} ---`);
  try {
    const response = await axios.get(
      `${BASE_URL}/author/${encodeURIComponent(author)}`
    );
    console.log(`Books by ${author}:`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by author ${author}:`, error.message);
    throw error;
  }
};

// Task 13: Search by Title – Using Async/Await
const getBooksByTitle = async (title) => {
  console.log(`\n--- Task 13: Search by Title (Async/Await) - Title: ${title} ---`);
  try {
    const response = await axios.get(
      `${BASE_URL}/title/${encodeURIComponent(title)}`
    );
    console.log(`Books with title containing "${title}":`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by title ${title}:`, error.message);
    throw error;
  }
};

// Run all four methods sequentially
const runAllTasks = async () => {
  console.log('=== Running Async/Await & Promise Demonstrations ===');
  console.log('Make sure the server is running on port 5000 first!');

  try {
    // Task 10
    await getAllBooks();

    // Task 11
    await getBookByISBN(1);

    // Task 12
    await getBooksByAuthor('Jane Austen');

    // Task 13
    await getBooksByTitle('Things Fall Apart');

    console.log('\n=== All tasks completed successfully! ===');
  } catch (error) {
    console.error('\nFailed to complete all tasks:', error.message);
    console.log('Please make sure the server is running: node index.js');
  }
};

runAllTasks();

module.exports = { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle };
