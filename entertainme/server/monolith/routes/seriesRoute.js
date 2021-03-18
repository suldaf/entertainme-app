const router = require('express').Router()
const SerieController = require('../controllers/SerieController')

router.get('/', SerieController.find )
router.get('/:id', SerieController.findById)

router.post('/', SerieController.create)

router.put('/:id', SerieController.update)
router.delete('/:id', SerieController.remove)





module.exports = router