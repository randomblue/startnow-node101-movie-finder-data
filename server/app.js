const express = require('express');
const axios = require('axios');
const app = express();
var movieCache = {}

app.get('/', function (req, res) {
    const movieId = req.query.i;
    const movieTitle = req.query.t;

    if (movieId) {
        if (movieCache[movieId]) {
            res.send(movieCache[movieId])
        }
        else {
            axios.get('http://www.omdbapi.com/?i=' + encodeURI(movieId) + '&apikey=8730e0e')
                .then(response => {
                    res.send(response.data);
                    movieCache[movieId] = response.data;
                })
        }
    }
    else if(movieTitle){
        if (movieCache[movieTitle]){
            res.send(movieCache[movieTitle])
        }
        else {
            axios.get('http://www.omdbapi.com/?t=' + encodeURI(movieTitle) + '&apikey=8730e0e')
            .then(response => {
                res.send(response.data);
                movieCache[movieTitle] = response.data
            })
        }
    }
});




//     else if (movieCache[movieTitle]) {
//         res.send(movieCache[movieTitle])

//     else {
//         axios.get('http://www.omdbapi.com/?i=' + encodeURI(movieTitle) + '&apikey=8730e0e')
//             .then(response => {
//                 res.send(respnose.data);
//                 movieCache[movieTitle] = response.data
//             })
//     }
// }
// });
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;