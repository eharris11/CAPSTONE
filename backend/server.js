const express = require('express');
const cors = require('cors');
const analyzeText = require('./analyzer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/analyze', (req, res) => {
    const result = analyzeText(req.body.text);
    res.json(result);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});