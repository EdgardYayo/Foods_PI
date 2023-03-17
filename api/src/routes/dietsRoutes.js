const express = require('express')
const { getDiets } = require('../controllers/getDiets')


const router = express.Router();

router.get('/', async ( req, res ) => {
    try {
        const diets = await getDiets()
        res.status(200).send(diets)
    } catch (error) {
        res.status(400).send(error.message)
    }
})








module.exports = router