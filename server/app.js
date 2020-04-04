const restify = require('restify');
const path = require('path');
const logger = require('bunyan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
const corsMiddleware = require('restify-cors-middleware');
dotenv.config();

/* Initialize Logger */
const log = new logger.createLogger({
    name: process.env.APP_NAME,
    serializers: {
        req: logger.stdSerializers.req
    },
    streams:[{
        path: path.basename('.') + '/logs/server.log'
    }]
});

/* initialize cors */
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
});

console.log("--init server--");
/* Initialize server */
const server = restify.createServer({
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION
});

/* Middleware */
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/* Start server */
server.listen(process.env.APP_PORT, () => {

    if(process.env.APP_MODE === 'dev')
    {
        console.log('Server listened at %s', process.env.APP_PORT);
        log.info('Server listened at %s: ', process.env.APP_PORT);
    }

    const MONGODB_URL = process.env.MONGODB_BASE;
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
        console.log('Mongo running on dev');
        console.log('Connected to %s', MONGODB_URL);
        if(process.env.APP_MODE === 'dev')
        {
            log.info('Mongo connected to %s: ', MONGODB_URL);
        }

        // Call all routes
        require('./routes/index')(server);

    }).catch(err => {
        console.log('Mongo cant started');
        if(process.env.APP_MODE === 'dev')
        {
            log.info('Mongo error %s: ', err.message);
        }
        process.exit(1)
    });
});

