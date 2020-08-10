const storage = {
    customers: require('./customers.json'),
    products: require('./products.json')
};
const http = require('http');

const sendError = (type, status) => {
    const messages = {
        products: "product does not exist",
        customers: "customer does not exist"
    }
    return {"error": {status, response: {"message": messages[type] || "unknown error"}} };
}

module.exports = {
    customers: (req, res) => {
        if(storage.customers[req.params.id]){
            res.send(storage.customers[req.params.id]);
        } else res.status(404).send(sendError('customers', 404));
    }, 
    products: (req, res) => {
        if(storage.products[req.params.id]){
            res.send(storage.products[req.params.id]);
        } else res.status(404).send(sendError('products', 404));
    },
    multiple: async (req, res) => {
        res.status(200);
        res.setHeader('content-type', 'application/json');
        res.write('{');
        for (const item of Object.keys(req.query)) {
            await new Promise ((resolve, reject) => {
                http.get('http://localhost:3000'+req.query[item], (data) => {    
                data.pipe(res, { end: false});
                    data.on('end', () => {
                        resolve('done');
                    });
                    data.on('error', reject);
                });
            });
        };
    
        // res.send(result);
        res.write('}');
        res.end();
    }
}