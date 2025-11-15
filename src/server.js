import express from "express";
import cors from "cors";
import { ApiResponse } from "./api-response.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MIDDLEWARE TO SIMULATE NETWORK DELAY
// Based on "X-Mock-Delay" header value in milliseconds
// Default is 1000 ms
app.use((req, res, next) => {
  const delay = parseInt(req.headers["x-mock-delay"]) || 1000;
  res.setHeader("X-Mock-Delay", delay);

  if (delay > 0) {
    setTimeout(next, delay);
  } else {
    next();
  }
});

const profile = {
  id: 1,
  name: "John Doe",
  email: "johndoe@email.com",
};

const articles = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Article ${i + 1}`,
  image: `https://picsum.photos/seed/article${i + 1}/400/250`,
  content: `This is the content of Article ${i + 1}.`,
}));

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return ApiResponse.error(res, "Email and password required", 400);
  }

  if (email === "johndoe@email.com" && password === "123456") {
    return ApiResponse.success(
      res,
      {
        token: "ABC123",
        user: profile,
      },
      "Login Successful"
    );
  } else {
    return ApiResponse.error(res, "Unauthorized", 401);
  }
});

app.get("/articles", (req, res) => {
  // Parse query params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate start and end indexes
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Slice the data for this page
  const paginatedArticles = articles.slice(startIndex, endIndex);

  // Determine if there's another page
  const hasMore = endIndex < articles.length;

  return ApiResponse.success(
    res,
    {
      articles: paginatedArticles.map((a) => ({
        id: a.id,
        title: a.title,
        image: a.image,
      })),
      page,
      limit,
      hasMore,
    },
    "Fetched successfully"
  );
});

app.get("/articles/:id", (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) return ApiResponse.error(res, "Article not found", 404);
  return ApiResponse.success(res, article, "Fetched Successfully");
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});
