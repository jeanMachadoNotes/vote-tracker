require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/vote', (req, res) => {
    const choice = req.query.choice;
    if (!choice) return req.status(400).send('No vote received');
    fs.appendFileSync('votes.txt', `${new Date().toISOString()} - ${choice}\n`);
    res.send('Thanks for voting!');
})


app.get('/votes-summary', (req, res) => {
    const raw = fs.readFileSync('votes.txt', 'utf-8');
    const lines = raw.trim().split('\n');
    const counts = {};
    lines.forEach(line => {
        const choice = line.split(' - ')[1];
        counts[choice] = (counts[choice] || 0) + 1;
    });
    res.json(counts);

});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));