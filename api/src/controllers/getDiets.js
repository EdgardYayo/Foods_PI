const { Recipe, Diet } = require('../db')




const getDiets = async () => {
    const diets = ["gluten free", "ketogenic", "lacto ovo vegetarian", "vegan", "pescatarian", "primal", "paleolithic", "whole 30", "dairy free", "fodmap friendly"]
    const allPro = await Promise.all(diets.map( async (dt) => {
        const diet = await Diet.findOrCreate({
            where:{
                name:dt
            }
        })
        return diet.name;
    }))

    const allDiets = await Diet.findAll();
    return allDiets;
}


module.exports = {
    getDiets
}