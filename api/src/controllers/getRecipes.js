const axios = require('axios')
const { Recipe, Diet } = require('../db')
apiKey = "245f0478192c43dcaab4e42e612d602d"


const getRecipes = async () => {
    const URL = "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
    const apiUrl = await axios.get(URL);

    const apiInfo = await apiUrl.data.results.map(r => {
        return {
            id:r.id,
            image:r.image,
            name: r.title,
            diets: r.diets.map(d => d),
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.analyzedInstructions[0]?.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step
                }
            })
        }
    })
    return apiInfo;
}

const getDbInfo = async () => {
    const dbRecipes = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes:[]
            }
        }
    })

    return dbRecipes;
}


const getDetail = async (id) => {

       if(!isNaN(id)){
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=245f0478192c43dcaab4e42e612d602d`)
            const detailInfo = {
                    id : data.id,
                    image : data.image,
                    name : data.title,
                    diets : data.diets,
                    summary : data.summary,
                    healthScore : data.healthScore,
                    steps : data.analyzedInstructions[0]?.steps.map(s => {
                        return {
                            number: s.number,
                            step: s.step
                        }
                })
            }
            return detailInfo;
       } 

       if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
            const detailDb = await Recipe.findByPk(id, {
                include:{
                    model: Diet,
                    attributes: ["name"],
                    through:{
                        attributes:[]
                    }
                }
            })

            return detailDb;
       }
}


const getAllRecipes = async () => {
    const api = await getRecipes()
    const db = await getDbInfo()
    const all = api.concat(db)
    
    return all;
}


const postRecipe = async (name, summary, healthScore, steps, image, diets) => {
    if(!name || !summary || !diets || !steps){
        throw('Missing data for create a recipe')
    } else {
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image, 
            diets
        })


        const dietDb = await Diet.findAll({
            where:{
                name: diets
            }
        })

        newRecipe.addDiet(dietDb)
        return newRecipe;

    }
    
}

module.exports = {
    getRecipes,
    getAllRecipes,
    getDetail,
    postRecipe
}