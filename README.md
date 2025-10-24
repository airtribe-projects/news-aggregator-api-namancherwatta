# News Aggregator API

A RESTful API for aggregating news articles based on user preferences. Users can register, log in, manage news preferences, mark articles as read or favorite, search for news, and view cached news.  

The API uses **MongoDB**, **Express.js**, **Node.js**, and integrates with the **GNews API** for fetching news.

---

## Table of Contents

- [Features](#features)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [Running the Server](#running-the-server)  
- [API Endpoints](#api-endpoints)  
- [Testing](#testing)

---

## Features

- User registration and login with JWT authentication  
- Manage news preferences (categories)  
- Fetch news based on preferences or general news  
- Mark articles as **read** or **favorite**  
- Search news by keywords  
- News caching mechanism to reduce API calls  
- Periodic cache updates in the background  

---

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
cd news-aggregator-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_KEY=<your_jwt_secret>
NEWS_KEY=<your_gnews_api_key>
```

---

## Running the Server

Start the development server:

```bash
npm start
```

Server runs at: `http://localhost:3000/`

---

## API Endpoints

### User Authentication

- **POST /api/v1/users/register**  
  Register a new user.  
  **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456",
    "preferences": ["technology", "sports"]
  }
  ```
  **Response:**  
  ```json
  {
    "message": "User registered successfully",
    "user": { ... }
  }
  ```

- **POST /api/v1/users/login**  
  Log in a user and receive a JWT token.  
  **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "123456"
  }
  ```
  **Response:**  
  ```json
  {
    "message": "Hi John Doe, you have logged in.",
    "token": "<jwt_token>"
  }
  ```

---

### Preferences

- **GET /api/v1/users/preferences**  
  Get user preferences. Requires `Authorization: Bearer <token>` header.

- **PUT /api/v1/users/preferences**  
  Update user preferences.  
  **Body:**
  ```json
  {
    "preferences": ["technology", "sports", "movies"]
  }
  ```

---

### News

- **GET /api/v1/news**  
  Get news based on user preferences or general news. Requires JWT token.  

- **POST /api/v1/news/:id/read**  
  Mark a news article as read. Requires JWT token.  

- **POST /api/v1/news/:id/favorite**  
  Mark a news article as favorite. Requires JWT token.  

- **GET /api/v1/news/read**  
  Retrieve all read news articles. Requires JWT token.  

- **GET /api/v1/news/favorites**  
  Retrieve all favorite news articles. Requires JWT token.  

- **GET /api/v1/news/search/:keyword**  
  Search news articles by keyword. Requires JWT token.  

---

## Testing

Run all test cases:

```bash
npm run test
```

- Uses `tap` and `supertest` for endpoint testing.  
- Tests cover user registration, login, preferences, and news endpoints.

---

## Notes

- News articles are cached to reduce API calls.  
- Cache updates every 10 minutes and also on server start.  
- Ensure your GNews API key is valid and has enough quota.  

