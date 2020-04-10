const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server for Node API Sprint Challenge is live.'
    })
})

const port = 5000;

server.listen(port, () => {
    console.log(`\n ~~~ Server running on port ${port} ~~~`)
});