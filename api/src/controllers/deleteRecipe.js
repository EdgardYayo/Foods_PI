const { Recipe, Diet } = require('../db')



const deleteRecipe = async (id) => {
    const deleted = await Recipe.findByPk(id)
    deleted.destroy()
    return deleted
}

module.exports = {
    deleteRecipe
}