const express = require('express');
const app = express();
const path = require('path');
const { db } = require('./server/db')


app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
app.use('/api/candidate', require('./server/api/candidate'))

app.listen(process.env.PORT || 3000);
