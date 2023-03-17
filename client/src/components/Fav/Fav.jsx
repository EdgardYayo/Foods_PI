import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../../redux/actions";
import NotFound from "../NotFound/NotFound";
import Recipe from "../Recipe/Recipe";
import "./Fav.css";





export default function Fav() {

    const dispatch = useDispatch()
    const fav = useSelector(state => state.favorites)
    console.log(fav)

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    const handleRemove = (id) => {
        dispatch(removeFavorite(id))
    }

    return (
        <section style={{ background:"linear-gradient(white, black)"}}>
            <h1 id="h1_fav">Favorites⭐</h1>
            <Link to='/home'>
                <button id="but_fav">🔙</button>
            </Link>
            <div id="cont_fav">
                {fav.length ? fav?.map(f => {
                    return (
                        <div id="rec_fav">
                            <button id="del_fav" onClick={() => handleRemove(f.id)}>✘</button>
                            <Recipe
                                name={f.name}
                                image={f.image}
                                healthScore={f.healthScore}
                                diets={f.diets}
                            />
                        </div>
                    )
                }) : <NotFound />
                }
            </div>
        </section>
    )
}