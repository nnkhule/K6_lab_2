const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Fast response' });
});

app.get('/slow', (req, res) => {
  setTimeout(() => {
    res.json({ message: 'Slow response' });
  }, 100);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});