const express = require('express');
const app = express();
const port = 3000;
const { customers, products, multiple } = require('./controllers');

app.get('/customers/:id', customers);

app.get('/products/:id', products);

app.get('/multiple', multiple);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;