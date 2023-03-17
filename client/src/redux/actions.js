import axios from 'axios'
import swa from 'sweetalert';


export const GET_RECIPES = 'GET_RECIPES';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_NAME = 'GET_NAME';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIET = 'FILTER_BY_DIET'; 
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const ORDER_SCORE = 'ORDER_SCORE';
export const ORDER_ALPHA = 'ORDER_ALPHA';
export const POST_RECIPE = 'POST_RECIPE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const DELETE = 'DELETE';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const ADD_COMMENT = 'ADD_COMMENT';


export const getRecipes = () => {
    return async function(dispatch){
        const recipes = await axios.get("http://localhost:3001/recipes")
        dispatch({
            type: GET_RECIPES,
            payload: recipes.data
        })
    }
}

export const getDetail = (id) => {
    return async function(dispatch){
        const detail = await axios.get(`http://localhost:3001/recipes/${id}`)
        dispatch({
            type: GET_DETAIL,
            payload: detail.data
        })
    }
}


export const getName = (name) => {
    return async function(dispatch){
        try {
            const searchName = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            dispatch({
                type: GET_NAME,
                payload: searchName.data
            })
        } catch (error) {
            swa("Recipe Not Found", "Please try other name", "error")
        }
    }
}

export const getDiets = () => {
    return async function(dispatch){
        const diets = await axios.get('http://localhost:3001/diets')
        dispatch({
            type: GET_DIETS,
            payload: diets.data
        })
    }
}

export const filterByDiet = (payload) => {
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export const filterByCreated = (payload) => {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

export const filterByName = (payload) => {
    return {
        type: FILTER_BY_NAME,
        payload
    }
}

export const orderScore = (payload) => {
    return {
        type: ORDER_SCORE,
        payload
    }
}

export const orderAlpha = (payload) => {
    return {
        type: ORDER_ALPHA,
        payload
    }
}

export const postRecipe = (payload) => {
    return async function(){
        const newRecipe = await axios.post("http://localhost:3001/recipes", payload)
        return newRecipe;
    }
}

export const addFavorite = (props) => {
    return {
        type: ADD_FAVORITE,
        payload: props
    }
}

export const removeFavorite = (id) => {
    return {
        type: REMOVE_FAVORITE,
        payload: id
    }
}

export const deleteRecipe = (id) => {
    return async function(dispatch){
        await axios.delete(`http://localhost:3001/recipes/${id}`)
        dispatch({
            type:DELETE
        })
    }
}

export const cleanDetail = (dispatch) => {
    return dispatch({
        type: CLEAN_DETAIL,
        payload: []
    })
}

export const addComment = (payload) => {
    return {
        type: ADD_COMMENT,
        payload: payload
    }
}

