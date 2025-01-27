const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const logger = require('./utils/logger'); 

const server = http.createServer(app);

server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});