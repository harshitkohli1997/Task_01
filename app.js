const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();


const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);
const keys = require('./config/keys')

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(keys.MongoUrl,{
     useNewUrlParser: true 
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  const {
    formatDate,
    ifcond
  } = require('./helpers/hbs')
// Handlebars Middleware
app.engine('handlebars', exphbs({

    helpers: { // to help the handlebars in formating
       
        formatDate: formatDate,
        ifcond:ifcond
        
      },

  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Index Route
app.get('/', (req, res) => {
  res.render('users/login');
});







app.use('/users', users);

const port = 3000 || process.env.PORT;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});