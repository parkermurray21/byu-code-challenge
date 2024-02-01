var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const apiKey = process.env.API_KEY;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/movies', async function(req, res, next) {
  const title = req.query?.title
  console.log(title)
  if(title){
    //perform lookup
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };
    try{
      const response = await fetch(url, options)
      const movies = await response.json()
      formattedMovies = movies.results.map(movie => {
        return {movie_id: movie.id, title: movie.title, poster_image_url:  `https://image.tmdb.org/t/p/w154${movie.poster_path}`, popularity_summary: `${movie.vote_average} average based on ${movie.vote_count} votes` }
      }).slice(0,10)
      console.log(formattedMovies.length)
    
      res.status(201).send(formattedMovies)
    }catch(err){
      res.status(500).send("Server Error, Please Try Again Later")
    }
  }else{
    res.status(400).send("Bad Request")
  }
});

module.exports = router;

