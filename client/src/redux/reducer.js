import { ADD_COMMENT, ADD_FAVORITE, CLEAN_DETAIL, DELETE, FILTER_BY_CREATED, FILTER_BY_DIET, FILTER_BY_NAME, GET_DETAIL, GET_DIETS, GET_NAME, GET_RECIPES, ORDER_ALPHA, ORDER_SCORE, POST_RECIPE, REMOVE_FAVORITE} from "./actions";


const initialState = {
    recipes: [],
    allRecipes: [],
    detail: {},
    diets: [],
    favorites: [],
    comments: []
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case GET_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        case FILTER_BY_DIET:
            let filter = [];
            if (action.payload) {
                filter = state.allRecipes.filter(elem => {

                    if (elem.diets.some(e => e.name === action.payload)) {
                        return elem.diets.map(el => el.name === action.payload)
                    } else {
                        return elem.diets.includes(action.payload)
                    }
                })
            }
            return {
                ...state,
                recipes: action.payload === 'All' ? state.allRecipes : filter
            }
        case FILTER_BY_CREATED:
            let all = state.allRecipes
            let filtered;
            if (action.payload === 'created') {
                filtered = all.filter(r => r.createdInDb)
            } else if (action.payload === 'api') {
                filtered = all.filter(r => !r.createdInDb)         
            } else if (action.payload === 'fav'){
                filtered = state.favorites
            }

            return {
                ...state,
                recipes: action.payload === 'all' ? all : filtered
            }
        case FILTER_BY_NAME:
            const filtSearch = state.allRecipes
            const filtOnState = filtSearch.filter((recipe) =>  {
                    let name = recipe.name.toLowerCase();
                    if (name.includes(action.payload)) return recipe;
            })
            return {
                ...state,
                recipes: filtOnState
            }
        case ORDER_SCORE:
            let order;
            if (action.payload === 'high') {
                order = state.recipes.sort((a, b) => b.healthScore - a.healthScore)
            } else if (action.payload === 'low') {
                order = state.recipes.sort((a, b) => a.healthScore - b.healthScore)
            }
            return {
                ...state,
                recipes: action.payload === 'all' ? state.recipes : order
            }
        case ORDER_ALPHA:
            let ordered;
            if (action.payload === 'A-Z') {
                ordered = state.recipes.sort((a, b) => a.name.localeCompare(b.name))
            } else if (action.payload === 'Z-A') {
                ordered = state.recipes.sort((a, b) => b.name.localeCompare(a.name))
            }

            return {
                ...state,
                recipes: action.payload === 'all' ? state.recipes : ordered
            }

        case POST_RECIPE:
            return {
                ...state
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(r => r.id !== action.payload)
            }
        case DELETE:
            return {
                ...state
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        default:
            return {
                ...state
            }
    }
}




export default rootReducer