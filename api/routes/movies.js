const express = require('express');
// const passport = require('passport');
// const passportService = require('../services/passport');

// const protectedRoute = passport.authenticate('jwt', {session: false})
const router = express.Router();

const Movie = require('../models/movie')

// RESTFUL Endpoints
// GET, POST, PATCH, DELETE

// Middleware for ID
const getMovie = async (req, res, next) => {
    let movie  
    try {
        movie = await Movie.findById(req.params.id)
        if(movie === null){
            return res.status(404).json({ message: "Movie Not Found" })
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
    res.movie = movie;
    next();
}

// GET ALL
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

// GET ONE
router.get('/:id', getMovie, async (req, res) => {
    res.json(res.movie)
})

// POST CREATE
router.post('/', async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        genre: req.body.genre,
        rating: req.body.rating,
        img: req.body.img
    })
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

// PATCH UPDATE
router.patch('/:id', getMovie, async (req, res) => {
    if(req.body.name != null){
        res.movie.name = req.body.name
    }
    if(req.body.genre != null){
        res.movie.genre = req.body.genre
    }
    if(req.body.rating != null){
        res.movie.rating = req.body.rating
    }
    if(req.body.img != null){
        res.movie.img = req.body.img
    }
    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.remove();
        res.json({ message: "Removed Movie" })
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;