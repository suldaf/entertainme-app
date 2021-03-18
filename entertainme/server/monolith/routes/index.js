const router = require('express').Router()
const moviesRoute = require('./moviesRoute')
const seriesRoute = require('./seriesRoute')

router.get('/', (req,res)=> res.send('Masuk Gan'))

router.use('/movies', moviesRoute)
router.use('/series', seriesRoute)

module.exports = router