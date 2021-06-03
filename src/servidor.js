const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
require('./db');
// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', require('./routes/index.notes'));

// Starting The Server
app.listen(app.get('port'), () => {
    console.log("Server Listening on Port", app.get('port'));
});


