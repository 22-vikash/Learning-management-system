const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');

const PORT = process.env.PORT || '8080'

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://vikash:vikash2002@cluster0.4xd7r.mongodb.net/project';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(PORT, function(){
    console.log("Server is up and running on port %d in %s mode", this.address().PORT, app.settings.env);
}))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('index'));
app.get('/courses', requireAuth, (req, res) => res.render('courses'));
app.get('/editprofile', (req, res) => res.render('editprofile'));
app.use(authRoutes);

