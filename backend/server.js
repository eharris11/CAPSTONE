const express = require('express');
const cors = require('cors');
const analyzeText = require('./analyzer');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is working');
});

app.post('/analyze', (req, res) => {
    const result = analyzeText(req.body.text);
    res.json(result);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});