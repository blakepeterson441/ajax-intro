const express = require('express');

// Setup our app
const app = express();

// Setup static files
app.use( express.static( 'server/public' ) );

// When we do a POST and want to get data from a request we need help
// We need body-parser ( which is installed automatically w/ express )
let bodyParser = require('body-parser');
// Essential
// need it before assigning req.body -- line 26
app.use( bodyParser.urlencoded( {extended: true} ));

// Setup route to return movies
// requiring movie.module.js. location is server/modules/
const movieData = require('./modules/movie.module.js');
// get gets things
app.get( '/movies', (req, res) => {
    res.send(movieData);
})

// post adds things
app.post('/movies', (req, res) => {
    // Get the movie from the request
    let newMovie = req.body;
    console.log('We are adding the movie', newMovie);
    // Add it onto the array of movies
    movieData.push(newMovie);
    // A good server always responds - 201 means Created! (added movie)
    res.sendStatus(201);
})



// Start the server listening
// do this last, after setting up routes, and all the things
const PORT = 5000;
app.listen( PORT, () => {
    console.log(`Sever listening on port ${PORT}`);
})