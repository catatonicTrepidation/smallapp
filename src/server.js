import express from 'express';
const server = express();
const port = 3000

console.log('server.js!');
server.get('/', (req, res) => res.send('Hello World!'))

Promise.resolve().then(async function() {
    console.log('In server.js promise resolve!');
    // serve static files
    server.use(express.static('static'));
    server.use(express.static('static/images'));
    server.use('/static', express.static('static'));
    server.use('/hahaha/test', express.static('static'));
    server.use(express.static('./dist'));
    server.use('/dist', express.static('./dist'));

    server.listen(port, () => console.log(`Example app listening on port ${port}!`));
});