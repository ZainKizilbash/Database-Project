const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
const indexRoutes = require('./routes/index.js');
const signupRoutes = require('./routes/signup.js');

app.use('/', indexRoutes);
app.use('/signup', signupRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
