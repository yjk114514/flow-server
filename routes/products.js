const express = require('express');
const productsRouter = express.Router();
const { generateDataFlow } = require('../flow/index');



productsRouter.get('/flow', (req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked'
    });
        console.log(`Connect to ${req.query.toString()}`)
    const dataGenerator = generateDataFlow(req);
    const sendChunk = async () => {
        for await (let chunk of dataGenerator) {
            res.write(`${chunk}\n`);
        }
        res.end();
    };
    sendChunk().catch((err) => {
        console.error(err);
        res.end();
    });
});

module.exports = productsRouter;