const express = require('express')

const {createReview, getReviews, getReviewById, deleteReview} = require('../controllers/reviewController')
const protect = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/',protect,createReview)
router.get('/',protect,getReviews)
router.get('/:id',protect,getReviewById)
router.delete('/:id',protect,deleteReview)

module.exports = router