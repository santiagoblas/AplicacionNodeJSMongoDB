const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//#region INITIALIZATIONS -------

const app = express();
require('./database');

//#endregion

//#region SETTINGS --------------

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
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
}))

//#endregion

//#region GLOBAL VARIABLES ------

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