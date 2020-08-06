const express = require('express');
const app = express();
const port = 3000;
const storage = {
    customers: require('./customers.json'),
    products: require('./products.json')
};


app.get('/customers/:id',(req, res) => {
    if(storage.customers[req.params.id]){
        res.send(storage.customers[req.params.id]);
    } else res.status(404).end();
});

app.get('/products/:id', (req, res) => {
    if(storage.products[req.params.id]){
        res.send(storage.products[req.params.id]);
    } else res.status(404).end();
});

app.get('/multiple', async (req, res) => {
    let result = {};
    Object.keys(req.query).forEach(item => {
        let type = req.query[item].split('/')[1];
        let id = req.query[item].split('/')[2];
        let res = getEntity(type, id);

        if(res.data) {
            result[item] = res.data;
        } else {
            result[item] = sendError(type, '404');
        }
    });

    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const getEntity = (entityType, id) => {
    const ALLOWED_TYPES = ['customers', 'products'];
    if(ALLOWED_TYPES.filter(i => i === entityType).length === 0) {
        return { error: "type is not supported" };
    }
    return { data: storage[entityType][id] };
};

const sendError = (type, status) => {
    const messages = {
        products: "product does not exist",
        customers: "customer does not exist"
    }
    return {"error": {status, response: {"message": messages[type] || "unknown error"}} };
}

module.exports = app;