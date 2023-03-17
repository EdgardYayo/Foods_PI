const express = require('express');
const { getRecipes, getDetail, postRecipe, getAllRecipes} = require('../controllers/getRecipes')
const { deleteRecipe } = require('../controllers/deleteRecipe')

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const { name } = req.query
        const recipes = await getAllRecipes();
        if(name){
            const filterRecipe = recipes.filter(r => r.name === name);
            filterRecipe.length ? 
            res.status(200).send(filterRecipe)
            : res.status(400).send("The recipe is not found")
        } else {
            res.status(200).send(recipes);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const detail = await getDetail(id)
        res.status(200).send(detail)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/', async ( req, res ) => {
    const { name, summary, healthScore, steps, image, diets } = req.body
    try {
        const newFood = await postRecipe(name, summary, healthScore, steps, image, diets)
        res.status(200).send(newFood)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const del = await deleteRecipe(id)
        res.status(200).send('Recipe deleted')
    } catch (error) {
        res.status(404).send(error.message)
    }
})






module.exports = router;