const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require("connect-flash");
const passport = require("passport");

//#region INITIALIZATIONS -------

const app = express();
require('./database');
require('./config/passport');

//#endregion

//#region SETTINGS --------------

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs')

//#endregion

//#region MIDDLEWARES -----------

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//#endregion

//#region GLOBAL VARIABLES ------

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");

    next();
});

//#endregion

//#region ROUTES ----------------

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//#endregion

//#region STATIC FILES ----------

app.use(express.static(path.join(__dirname, 'public')));

//#endregion

//#region SERVER IS LISTENING ---

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

//#endregion