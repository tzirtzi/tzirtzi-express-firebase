const path = require('path');
const express = require('express');

const logger = require('morgan');

const cors = require('cors'); // fully fledged package
const corsHeaders = require('./api/middleware/cors'); // custom implementation

const notFound = require('./api/middleware/notFound');
const errorHandling = require('./api/middleware/errorHandling');

const serviceAccountConfig = require('./njection-plan-firebase-adminsdk-serviceaccnt.json');
const fireInit = require('./api/data/firebaseConnect')(serviceAccountConfig);

const routerOutlet = require('./api/routes/routerOutlet');

const app = express();


// Middleware logging
if (['dev', 'test', 'uat', 'development'].includes(process.env.ENVIRONMENT)) {
    app.use(logger('dev'));
// }  else {
//     // create a write stream (in append mode)
//     var accessLogStream = fs.createWriteStream(__dirname + '/access.log',{flags: 'a'});
//     // setup the logger
//     app.use(morgan('combined', {stream: accessLogStream}))
}

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Fix CORS headers, needed to allow access to SPAs / UIs 
app.use(corsHeaders);

// enable pre-flight across-the-board 
app.options('*', cors())

// Routing 
app.use('/', routerOutlet);

// Not Found
app.use(notFound);

// Error handling for all application errors
app.use(errorHandling);

console.log('Server started');

module.exports = app;
