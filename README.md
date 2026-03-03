# Back-end Application Development with Node.js and Express

A RESTful book review API built with **Node.js** and **Express.js**, featuring JWT-based authentication, session management, and async/await patterns with Axios.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YahyaEajass05/Edx_Back-end-Application-Development-with-Node.js-and-Express.git
cd Edx_Back-end-Application-Development-with-Node.js-and-Express

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Edit .env with your own values
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here
```

### Running the Server

```bash
# Start the server
node index.js

# Or with auto-reload (development)
npm run dev
```

Server runs on `http://localhost:5000` by default.

---

## 📁 Project Structure

```
expressBookReviews/
├── index.js                 # Express server entry point
├── async_operations.js      # Tasks 10–13 (Async/Await & Promises with Axios)
├── package.json
├── .env                     # Environment variables (not committed)
├── .env.example             # Example env file
├── .gitignore
└── router/
    ├── booksdb.js           # In-memory book database (10 books)
    ├── general.js           # Public routes (Tasks 1–6)
    └── auth_users.js        # Authenticated routes (Tasks 7–9)
```

---

## 📚 API Endpoints

### General / Public Routes

#### Task 1 — Get all books
```
GET /
```
Returns the full list of books available in the shop.

**Response:**
```json
{
  "1": { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
  "2": { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
  ...
}
```

---

#### Task 2 — Get book by ISBN
```
GET /isbn/:isbn
```
Returns a single book matching the given ISBN.

**Example:** `GET /isbn/1`

**Response:**
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

---

#### Task 3 — Get books by Author
```
GET /author/:author
```
Returns all books written by the specified author.

**Example:** `GET /author/Jane%20Austen`

**Response:**
```json
[
  {
    "isbn": "8",
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "reviews": {}
  }
]
```

---

#### Task 4 — Get books by Title
```
GET /title/:title
```
Returns all books whose title contains the given string (case-insensitive).

**Example:** `GET /title/Things%20Fall%20Apart`

**Response:**
```json
[
  {
    "isbn": "1",
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]
```

---

#### Task 5 — Get book reviews
```
GET /review/:isbn
```
Returns all reviews for the book with the given ISBN.

**Example:** `GET /review/1`

**Response:**
```json
{
  "testuser": "This is an amazing book!"
}
```

---

#### Task 6 — Register a new user
```
POST /register
```
Registers a new user account.

**Request Body:**
```json
{
  "username": "testuser",
  "password": "testpass123"
}
```

**Response:**
```json
{
  "message": "User testuser successfully registered. You can now login."
}
```

---

### Authenticated Routes (Login Required)

#### Task 7 — Login as a registered user
```
POST /customer/login
```
Authenticates the user and creates a session with a JWT token.

**Request Body:**
```json
{
  "username": "testuser",
  "password": "testpass123"
}
```

**Response:**
```json
{
  "message": "User successfully logged in",
  "token": "<JWT_TOKEN>"
}
```

---

#### Task 8 — Add or modify a book review
```
PUT /customer/auth/review/:isbn?review=<your review text>
```
Adds a new review or updates an existing review for the logged-in user. Each user can only have one review per book.

**Example:** `PUT /customer/auth/review/1?review=Amazing+book!`

**Response:**
```json
{
  "message": "Review for book with ISBN 1 has been added/updated",
  "reviews": {
    "testuser": "Amazing book!"
  }
}
```

> 🔒 Requires an active login session.

---

#### Task 9 — Delete a book review
```
DELETE /customer/auth/review/:isbn
```
Deletes the review posted by the currently logged-in user for the specified book.

**Example:** `DELETE /customer/auth/review/1`

**Response:**
```json
{
  "message": "Review for ISBN 1 posted by testuser has been deleted",
  "reviews": {}
}
```

> 🔒 Requires an active login session.

---

## ⚡ Async/Await & Promises (Tasks 10–13)

The file `async_operations.js` demonstrates four methods of making HTTP requests using **Axios** with Node.js.

```bash
# Make sure the server is running first, then:
node async_operations.js
```

| Task | Method | Axios Pattern |
|------|--------|---------------|
| 10 | Get all books | `async/await` |
| 11 | Search by ISBN | **Promises** (`.then/.catch`) |
| 12 | Search by Author | `async/await` |
| 13 | Search by Title | `async/await` |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| JSON Web Token (JWT) | Authentication |
| express-session | Session management |
| Axios | HTTP client for async operations |
| dotenv | Environment variable management |
| bcryptjs | Password hashing (available) |
| nodemon | Development auto-reload |

---

## 📖 Book Database

The application includes 10 classic books pre-loaded:

| ISBN | Title | Author |
|------|-------|--------|
| 1 | Things Fall Apart | Chinua Achebe |
| 2 | Fairy tales | Hans Christian Andersen |
| 3 | The Divine Comedy | Dante Alighieri |
| 4 | The Epic Of Gilgamesh | Unknown |
| 5 | The Book Of Job | Unknown |
| 6 | One Thousand and One Nights | Unknown |
| 7 | Njaals Saga | Unknown |
| 8 | Pride and Prejudice | Jane Austen |
| 9 | Le Pere Goriot | Honore de Balzac |
| 10 | Molloy, Malone Dies, The Unnamable, the trilogy | Samuel Beckett |

---

## 📝 License

This project is part of the IBM Full Stack Software Developer Professional Certificate on edX.
