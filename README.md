
# Game Library API with Authentication

## Setup

To set up and use the Game Library API with Authentication, ensure you have the following installed:

-   Node.js (v14 or higher)
    
-   npm (or another package manager like Yarn)
    
-   MongoDB (local or cloud-based)
    
-   Postman (or any API testing tool)
    

## Third Party Packages used:
- bcrypt
- jsonwebtoken
- express-validator
- express
- nodemon
- dotenv

## Installing Dependencies

Run the following command in your terminal to install all required dependencies:

```bash
npm install

```

## Creating Your `.env` File

Create a `.env` file in the root directory of your project and include the following environment variables:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=<your-secret-key>

```

Replace `<your-secret-key>` with a secure key. You can generate one using [JwtSecret.com](https://jwtsecret.com/).

## Starting the Server

Run the following command to start the server in development mode:

```bash
npm run dev

```

-   The server will start on the port specified in your `.env` file (default: 3000).
    
-   Connect to MongoDB: Ensure your MongoDB instance is running locally or remotely. If using MongoDB Compass, connect to `localhost:27017`.
    

## Test the API

Use Postman or any API testing tool to interact with the API. The base URL is:

```
http://localhost:3000/api

```

## API Endpoints

### Authentication

#### `POST /api/auth/register`

**Description:** Register a new user.

**Request Body:**

```json
{
  "username": "yourUsername",
  "email": "yourEmail@example.com",
  "password": "yourPassword"
}

```

**Response:**

-   `201 Created`
    
-   `400 Bad Request` (e.g., email already exists)
    

#### `POST /api/auth/login`

**Description:** Log in an existing user.

**Request Body:**

```json
{
  "email": "yourEmail@example.com",
  "password": "yourPassword"
}

```

**Response:**

-   `200 OK`
    
-   `400 Bad Request` (e.g., invalid credentials)
    

### Games API

> All routes (except `GET /api/games` and `GET /api/games/search`) are protected and require a valid JWT token in the `Authorization` header. Manually add your JWT token in your API testing tools`

#### `POST /api/games`

**Description:** Create a new game.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Game Title",
  "genre": "Genre",
  "platform": "Platform",
  "releaseYear": 2024,
  "description": "Game description"
}

```

**Response:**

-   `201 Created`
    

#### `PUT /api/games/:id`

**Description:** Update an existing game by ID.

**Headers:**

```
Authorization: Bearer <token>

```

**Request Body:** Same as POST.

**Response:**

-   `200 OK`
    

#### `DELETE /api/games/:id`

**Description:** Delete a game by ID.

**Headers:**

```
Authorization: Bearer <token>

```

**Response:**

-   `200 OK`
    

#### `GET /api/games`

**Description:** Retrieve all games.

**Response:**

-   `200 OK`
    

#### `GET /api/games/search`

**Description:** Search for games by title, genre, platform, or release year.

**Query Parameters:**

-   `title` (optional)
    
-   `genre` (optional)
    
-   `platform` (optional)
    
-   `releaseYear` (optional)
    

**Example:**

```
GET /api/games/search?genre=RPG&platform=PC

```

**Response:**

-   `200 OK`
    

## Notes

-   **Authorization:** For protected routes, include the `Authorization` header with the token received during login.
    
-   **Validation:** All inputs are validated using `express-validator`. Ensure your requests meet the required criteria to avoid validation errors.
    
-   **Error Handling:** The API returns appropriate error messages and status codes for invalid requests or server errors.