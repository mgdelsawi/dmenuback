const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const menu = require('./routes/menu');
const table = require('./routes/table');
const order = require('./routes/order');
const restusers = require('./routes/restUsers');
const rest = require('./routes/rest');
const passport = require('passport');
const app = express();
const cors = require('cors')
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);


// // DB Config
const db = require('./config/key').mongoURI;

// Connect to MongoDB
mongoose
.connect(db,{ useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', (req,res) => res.json({msg:"hello my name is"}));
app.get('/about', (req,res) => res.send("Our company was founded in 2015"));
app.use('/users', users);
app.use('/menu', menu);
app.use('/table', table);
app.use('/order', order);
app.use('/restUsers', restusers);
app.use('/restaurant', rest);
app.get('/dashboard', passport.authenticate('jwt', {session:false}),(req,res) => res.json({msg:"This is the private dashboard"}));



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
