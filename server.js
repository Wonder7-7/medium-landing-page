const express = require('express');
const app = express();

app.use(express.json());

// Your data (acts as a simple database)
let articles = [
  { id: 1, title: "Human stories & ideas", author: "John Doe", content: "A place to read and write." },
  { id: 2, title: "The future of AI", author: "Jane Smith", content: "AI is changing everything." }
];

// READ - Get all articles
app.get('/articles', (req, res) => {
  res.json(articles);
});

// READ - Get one article
app.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ message: "Article not found" });
  res.json(article);
});

// CREATE - Add new article
app.post('/articles', (req, res) => {
  const newArticle = {
    id: articles.length + 1,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// UPDATE - Edit an article
app.put('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ message: "Article not found" });
  
  article.title = req.body.title || article.title;
  article.author = req.body.author || article.author;
  article.content = req.body.content || article.content;
  
  res.json(article);
});

// DELETE - Remove an article
app.delete('/articles/:id', (req, res) => {
  articles = articles.filter(a => a.id !== parseInt(req.params.id));
  res.json({ message: "Article deleted" });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});