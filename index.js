// dependencies
const express = require('express');

const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

// server setup
const server = express();

// middleware
server.use(express.json());

// test endpoint
server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server for Node API Sprint Challenge is live.'
    })
})

// routing
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

// port assignment
const port = 5000;

server.listen(port, () => {
    console.log(`\n ~~~ Server running on port ${port} ~~~`)
});