# 🧪 Mock API Server (Node.js + Express)

A simple and lightweight **mock API** built with **Node.js** and **Express**, designed for testing or frontend development without a real backend.

---

## 🚀 Features

- 🔑 Login endpoint with mock authentication
- 📰 Article list with pagination
- 📄 Article detail by ID
- 🌐 CORS enabled by default
- 🧱 Standardized API response format (`ApiResponse` helper class)

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mock-api.git
cd mock-api
```

### Install dependencies

```bash
npm install
```

### ▶️ Run the Server

#### Development mode

```bash
npm run dev
```

#### Production mode

```bash
npm start
Server runs at 👉 http://localhost:3000
```

### 📡 API Endpoints

#### 🔐 POST /auth/login

Authenticate user and get a mock token.

##### Request Body

```json
{
  "email": "johndoe@email.com",
  "password": "123456"
}
```

##### Response (200)

```json
{
  "status": "success",
  "message": "Login Successful",
  "data": {
    "token": "ABC123",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@email.com"
    }
  }
}
```

##### Response (401)

```json
{
  "status": "error",
  "message": "Unauthorized",
  "data": null
}
```

#### 📰 GET /articles?page=1&limit=10

Fetch a paginated list of articles.

##### Response

```json
{
  "status": "success",
  "message": "Fetched successfully",
  "data": {
    "articles": [
      {
        "id": 1,
        "title": "Article 1",
        "image": "https://picsum.photos/seed/article1/400/250"
      }
    ],
    "page": 1,
    "limit": 10,
    "hasMore": true
  }
}
```

#### 📄 GET /articles/:id

Fetch details of a specific article by ID.

##### Response

```json
{
  "status": "success",
  "message": "Fetched Successfully",
  "data": {
    "id": 1,
    "title": "Article 1",
    "image": "https://picsum.photos/seed/article1/400/250",
    "content": "This is the content of Article 1."
  }
}
```

##### If not found (404)

```json
{
  "status": "error",
  "message": "Article not found",
  "data": null
}
```

#### 🧩 API Response Format

All responses follow a consistent structure using the ApiResponse helper:

```js
{
  status: "success" | "error",
  message: "string",
  data: any
}
```

## 🧩 Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [CORS](https://www.npmjs.com/package/cors)

---

> 💡 Useful for frontend integration, testing pagination logic, or mocking authentication.
