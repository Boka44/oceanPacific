const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const app = express();
require('dotenv').config();


//set routes
require('./config/passport')(passport);
require('./config/database');
require('./config/aws');
const index = require('./routes/index');
const about = require('./routes/about');
const gallery = require('./routes/gallery');
const contact = require('./routes/contact');
const explore = require('./routes/explore');
const account = require('./routes/account');
const logout = require('./routes/logout');
const login = require('./routes/login');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({ 
	secret: "itsASecretToEveryone",
	resave: false,
	saveUninitialized: false
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables
app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	next();
})

app.use('/', index);
app.use('/about', about);
app.use('/gallery', gallery);
app.use('/contact', contact);
app.use('/explore', explore);
app.use('/account', account);
app.use('/logout', logout);
app.use('/login', login);

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
})
